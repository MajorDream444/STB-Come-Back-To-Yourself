/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Asset integrity. `docs/assets/FLO-ASSET-REGISTER.md` is the approval record
 * for Flo's imagery. These tests assert that (a) every path the register
 * declares actually exists, and (b) every image referenced by the app exists.
 *
 * The register declared `public/assets/flo-first-doorway-banner.png`, which
 * was absent from the repository. This test is what makes that class of drift
 * fail loudly instead of shipping.
 */
import { describe, it, expect } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const REGISTER = join(ROOT, "docs", "assets", "FLO-ASSET-REGISTER.md");

/** Repo-relative asset paths named in the register. */
function declaredPaths(): string[] {
  let md = readFileSync(REGISTER, "utf8");
  // The "Unresolved" block documents open questions and assets that are
  // deliberately NOT approved, so its paths are not asserted to exist.
  md = md.replace(
    /<!--\s*asset-register:unresolved:start\s*-->[\s\S]*?<!--\s*asset-register:unresolved:end\s*-->/g,
    "",
  );
  const found = md.match(/(?:public|src)\/[\w./-]+\.(?:png|jpe?g|webp|svg)/gi) ?? [];
  return [...new Set(found)];
}

/** Public-root image paths referenced from app source. */
function referencedPublicPaths(): string[] {
  const dirs = [join(ROOT, "src"), join(ROOT, "src", "components")];
  const refs = new Set<string>();
  for (const dir of dirs) {
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir)) {
      const p = join(dir, f);
      if (!statSync(p).isFile()) continue;
      if (!/\.(tsx?|html)$/.test(f)) continue;
      const src = readFileSync(p, "utf8");
      for (const m of src.matchAll(/["'`](\/[\w./-]+\.(?:png|jpe?g|webp|svg))["'`]/gi)) {
        refs.add(m[1]);
      }
    }
  }
  return [...refs];
}

describe("asset register", () => {
  it("exists", () => {
    expect(existsSync(REGISTER)).toBe(true);
  });

  it("declares at least one asset path", () => {
    expect(declaredPaths().length).toBeGreaterThan(0);
  });

  it.each(declaredPaths())("declared asset %s exists on disk", (rel) => {
    expect(
      existsSync(join(ROOT, rel)),
      `FLO-ASSET-REGISTER.md declares "${rel}" but it is not in the repository. ` +
        `Either add the approved asset or correct the register.`,
    ).toBe(true);
  });
});

describe("referenced assets", () => {
  it("finds image references in app source", () => {
    expect(referencedPublicPaths().length).toBeGreaterThan(0);
  });

  it.each(referencedPublicPaths())("referenced image %s exists in public/", (rel) => {
    expect(
      existsSync(join(ROOT, "public", rel.replace(/^\//, ""))),
      `Source references "${rel}" but public${rel} does not exist — it would 404 in production.`,
    ).toBe(true);
  });
});
