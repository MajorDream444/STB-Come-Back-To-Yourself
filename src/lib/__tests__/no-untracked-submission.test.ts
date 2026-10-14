/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Regression guard. `CRM-HANDOFF.md` makes the Google Form the single front
 * door for enquiries. Two components previously bypassed it with a hardcoded
 * `mailto:` submission. This test fails if any component reintroduces a
 * mailto-based *submission*, so that defect cannot quietly return.
 *
 * A plain contact link (e.g. Flo's address in the footer) is still allowed;
 * what is forbidden is assigning a mailto to `window.location` as a
 * submission path.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const COMPONENT_DIR = join(process.cwd(), "src", "components");
const files = readdirSync(COMPONENT_DIR).filter((f) => f.endsWith(".tsx"));

/** `window.location... = ` ... `mailto:` on the same statement. */
const MAILTO_SUBMISSION = /window\s*\.\s*location(?:\s*\.\s*href)?\s*=\s*[^;]*mailto:/;

describe("no untracked mailto submissions", () => {
  it("finds component files to scan", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)("%s does not submit via mailto", (file) => {
    const src = readFileSync(join(COMPONENT_DIR, file), "utf8");
    const match = src.match(MAILTO_SUBMISSION);
    expect(
      match?.[0] ?? null,
      `${file} assigns a mailto: to window.location. Enquiries must route ` +
        `through src/lib/intake.ts (the approved Google Form), per CRM-HANDOFF.md.`,
    ).toBeNull();
  });
});

describe("no fabricated availability", () => {
  it.each(files)("%s does not advertise invented scarcity", (file) => {
    const src = readFileSync(join(COMPONENT_DIR, file), "utf8");
    // e.g. "3 spots open", "1 spot left" — the site has no scheduling system,
    // so availability counts cannot be truthful.
    const scarcity = src.match(/\d+\s+spots?\s+(open|left|remaining)/i);
    expect(
      scarcity?.[0] ?? null,
      `${file} advertises availability ("${scarcity?.[0]}") but the site has ` +
        `no scheduling system to back it.`,
    ).toBeNull();
  });
});
