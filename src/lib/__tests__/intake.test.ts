/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { describe, it, expect, vi } from "vitest";
import {
  buildIntakeUrl,
  summarizeIntake,
  openIntake,
  isLikelyEmail,
  isRoutable,
  type IntakePayload,
  type Opener,
} from "../intake";
import { INTAKE_FORM_URL } from "../../types";

const valid: IntakePayload = {
  name: "Maya Lin",
  email: "maya@example.com",
  interest: "Free Discovery Call",
  timingPreference: "Mornings",
};

const openedOk: Opener = () => ({ closed: false });
const blocked: Opener = () => null;
const throws: Opener = () => {
  throw new Error("popup blocked");
};

describe("isLikelyEmail", () => {
  it.each(["a@b.co", "maya@example.com", "x.y+z@sub.domain.nl"])(
    "accepts %s",
    (e) => expect(isLikelyEmail(e)).toBe(true),
  );

  it.each(["", "   ", "no-at-sign", "a@b", "a@@b.co", "a b@c.co", "a@.co", "a@b."])(
    "rejects %s",
    (e) => expect(isLikelyEmail(e)).toBe(false),
  );
});

describe("isRoutable", () => {
  it("requires name and email", () => {
    expect(isRoutable(valid)).toBe(true);
    expect(isRoutable({ name: "", email: "a@b.co" })).toBe(false);
    expect(isRoutable({ name: "A", email: "bad" })).toBe(false);
    expect(isRoutable(null)).toBe(false);
    expect(isRoutable(undefined)).toBe(false);
  });
});

describe("buildIntakeUrl", () => {
  it("returns the approved Form URL when no prefill is configured", () => {
    expect(buildIntakeUrl(valid, {})).toBe(INTAKE_FORM_URL);
  });

  it("prefills only fields with a configured entry ID", () => {
    const url = buildIntakeUrl(valid, { name: "entry.111", email: "entry.222" });
    expect(url).toContain("entry.111=Maya+Lin");
    expect(url).toContain("entry.222=maya%40example.com");
    expect(url).toContain("usp=pp_url");
    // interest had no configured ID, so it must not leak into the URL
    expect(url).not.toContain("Discovery");
  });

  it("skips empty and whitespace-only values", () => {
    const url = buildIntakeUrl({ name: "A", email: "a@b.co", phone: "   " }, {
      name: "entry.1",
      phone: "entry.2",
    });
    expect(url).toContain("entry.1=A");
    expect(url).not.toContain("entry.2");
  });

  it("always targets the approved Form host and never a mailto", () => {
    const url = buildIntakeUrl(valid, { name: "entry.1" });
    expect(url.startsWith("https://docs.google.com/forms/")).toBe(true);
    expect(url).not.toContain("mailto:");
  });
});

describe("summarizeIntake", () => {
  it("includes every populated field, omits empty ones", () => {
    const s = summarizeIntake({ ...valid, note: "Prefer online" });
    expect(s).toContain("Name: Maya Lin");
    expect(s).toContain("Email: maya@example.com");
    expect(s).toContain("Interested in: Free Discovery Call");
    expect(s).toContain("Preferred timing: Mornings");
    expect(s).toContain("Note: Prefer online");
    expect(s).not.toContain("Phone");
  });

  it("returns an empty string for an empty payload", () => {
    expect(summarizeIntake({})).toBe("");
  });
});

describe("openIntake — successful routing", () => {
  it("routes a valid payload to the approved Form", () => {
    const spy = vi.fn(openedOk);
    const r = openIntake(valid, spy);
    expect(r.ok).toBe(true);
    expect(r.reason).toBeUndefined();
    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0].startsWith("https://docs.google.com/forms/")).toBe(true);
  });

  it("never routes to mailto, for any payload", () => {
    const spy = vi.fn(openedOk);
    openIntake({ ...valid, note: "mailto:someone@example.com" }, spy);
    expect(spy.mock.calls[0][0]).not.toContain("mailto:");
  });
});

describe("openIntake — graceful error handling", () => {
  it("reports invalid-payload without opening anything", () => {
    const spy = vi.fn(openedOk);
    const r = openIntake({ name: "", email: "nope" }, spy);
    expect(r.ok).toBe(false);
    expect(r.reason).toBe("invalid-payload");
    expect(spy).not.toHaveBeenCalled();
  });

  it("reports blocked when the opener returns null", () => {
    const r = openIntake(valid, blocked);
    expect(r.ok).toBe(false);
    expect(r.reason).toBe("blocked");
  });

  it("reports blocked instead of throwing when the opener throws", () => {
    expect(() => openIntake(valid, throws)).not.toThrow();
    expect(openIntake(valid, throws).reason).toBe("blocked");
  });

  it("still returns a usable url and summary on failure, so no detail is lost", () => {
    const r = openIntake(valid, blocked);
    expect(r.url.startsWith("https://docs.google.com/forms/")).toBe(true);
    expect(r.summary).toContain("Maya Lin");
    expect(r.summary).toContain("maya@example.com");
  });
});
