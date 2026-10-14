/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Single routing point for every visitor enquiry on the Flo site.
 *
 * WHY THIS MODULE EXISTS
 * ----------------------
 * `CRM-HANDOFF.md` states: "The Google Form is now the single front door for
 * all inquiries." Two components previously submitted via a hardcoded
 * `mailto:` to a Gmail address instead, so those enquiries never entered the
 * tracked Form -> Sheets CRM pathway.
 *
 * Every enquiry now routes through `openIntake`. There is deliberately no
 * `mailto:` fallback: a silent downgrade to email is the exact failure this
 * module exists to prevent. When routing fails, the caller shows the visitor
 * the Form link plus a copyable summary so no entered detail is lost.
 */

import { INTAKE_FORM_URL } from "../types";

export interface IntakePayload {
  /** Visitor name. Required. */
  name: string;
  /** Visitor email. Required. */
  email: string;
  /** Optional phone number. */
  phone?: string;
  /** What the visitor is asking about, e.g. a session title or a guide name. */
  interest?: string;
  /**
   * Coarse timing preference only (e.g. "Mornings", "Flexible").
   * NEVER a specific confirmed date/time — the site has no scheduling system,
   * so a specific slot cannot be honoured and must not be implied.
   */
  timingPreference?: string;
  /** Free-text note the visitor chose to write. */
  note?: string;
}

export interface IntakeRouteResult {
  /** True when the intake Form was successfully opened. */
  ok: boolean;
  /** The Form URL that was used (always populated, so callers can link it). */
  url: string;
  /** Human-readable summary the visitor can copy if routing failed. */
  summary: string;
  /** Machine-readable reason when `ok` is false. */
  reason?: "invalid-payload" | "blocked";
}

/**
 * Google Form prefill entry IDs, keyed by payload field.
 *
 * Empty by default — prefill requires the numeric `entry.<id>` values from
 * Flo's Form, which must be read from its "Get pre-filled link" view. Until
 * those are filled in, routing still works: the Form opens unprefilled and
 * the visitor is shown a copyable summary.
 *
 * To enable prefill, add e.g. `name: "entry.123456789"`.
 */
export const INTAKE_PREFILL_ENTRY_IDS: Partial<
  Record<keyof IntakePayload, string>
> = {};

/** Minimal email shape check. Deliberately permissive. */
export function isLikelyEmail(value: string): boolean {
  const v = (value ?? "").trim();
  if (v.length < 3 || v.length > 254) return false;
  if (/\s/.test(v)) return false;
  const at = v.indexOf("@");
  if (at <= 0 || at !== v.lastIndexOf("@")) return false;
  const domain = v.slice(at + 1);
  return domain.includes(".") && !domain.startsWith(".") && !domain.endsWith(".");
}

/** A payload is routable when it has a name and a plausible email. */
export function isRoutable(payload: Partial<IntakePayload> | null | undefined): boolean {
  if (!payload) return false;
  return Boolean(payload.name?.trim()) && isLikelyEmail(payload.email ?? "");
}

/**
 * Build the intake Form URL, prefilled only for fields with a configured
 * entry ID. Returns the bare Form URL when nothing is configured.
 */
export function buildIntakeUrl(
  payload: Partial<IntakePayload>,
  entryIds: Partial<Record<keyof IntakePayload, string>> = INTAKE_PREFILL_ENTRY_IDS,
): string {
  const params = new URLSearchParams();

  (Object.keys(entryIds) as Array<keyof IntakePayload>).forEach((field) => {
    const entryId = entryIds[field];
    const value = payload[field];
    if (entryId && typeof value === "string" && value.trim()) {
      params.set(entryId, value.trim());
    }
  });

  if ([...params.keys()].length === 0) return INTAKE_FORM_URL;

  params.set("usp", "pp_url");
  const separator = INTAKE_FORM_URL.includes("?") ? "&" : "?";
  return `${INTAKE_FORM_URL}${separator}${params.toString()}`;
}

/**
 * Plain-text summary of what the visitor entered, so nothing is lost if the
 * Form opens unprefilled or is blocked.
 */
export function summarizeIntake(payload: Partial<IntakePayload>): string {
  const rows: Array<[string, string | undefined]> = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Phone", payload.phone],
    ["Interested in", payload.interest],
    ["Preferred timing", payload.timingPreference],
    ["Note", payload.note],
  ];
  return rows
    .filter(([, v]) => typeof v === "string" && v.trim().length > 0)
    .map(([label, v]) => `${label}: ${String(v).trim()}`)
    .join("\n");
}

/** Injectable window opener, so routing is testable without a real browser. */
export type Opener = (url: string) => { closed?: boolean } | null;

const defaultOpener: Opener = (url) =>
  typeof window === "undefined"
    ? null
    : window.open(url, "_blank", "noopener,noreferrer");

/**
 * Route an enquiry to the approved intake Form.
 *
 * Never throws and never falls back to `mailto:`. On failure the caller is
 * expected to render `url` as a link and `summary` as copyable text.
 */
export function openIntake(
  payload: Partial<IntakePayload>,
  opener: Opener = defaultOpener,
): IntakeRouteResult {
  const url = buildIntakeUrl(payload);
  const summary = summarizeIntake(payload);

  if (!isRoutable(payload)) {
    return { ok: false, url, summary, reason: "invalid-payload" };
  }

  try {
    const handle = opener(url);
    if (!handle || handle.closed) {
      return { ok: false, url, summary, reason: "blocked" };
    }
    return { ok: true, url, summary };
  } catch {
    return { ok: false, url, summary, reason: "blocked" };
  }
}
