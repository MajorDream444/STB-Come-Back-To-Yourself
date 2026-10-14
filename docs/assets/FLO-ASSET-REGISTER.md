# Flo Asset Register

Approval record for Flo's imagery. Every path in an approved section below is
asserted to exist by `src/lib/__tests__/asset-register.test.ts`, so a stale
path fails the test run instead of shipping.

---

## Approved — First Doorway visual (in production use)

File:
public/flo-first-doorway.jpg

Referenced by:
`src/components/FirstDoorwayBanner.tsx` (and `Hero.tsx` via `/flo-first-doorway.jpg`)

Properties:
3024 × 4032 px (portrait, 3:4) · 920 KB · JPEG

Use:
First Doorway banner / brand positioning visual / podcast or Notion cover reference.

Message:
Nothing was lost. The first doorway is getting clearer.

Visual notes:
- Flo is visible larger in frame
- floral/nature background
- cream, sage, gold palette
- calm premium wellness feel
- should be used as approved reference for "First Doorway" visuals

Do not use:
- older backwards image
- banner versions where Flo is too low or too small
- crops that hide Flo's face

---

## Approved — other production assets

| File | Referenced by | Properties |
|---|---|---|
| public/flo-rice-field.jpg | `src/` (`/flo-rice-field.jpg`) | JPEG |

---

## Unresolved — needs Flo's decision

Nothing in this section is asserted by the test, because these items are
open questions rather than approved assets.

<!-- asset-register:unresolved:start -->

### 1. The register previously declared an asset that has never existed

The prior version of this file named an approved banner at
`public/assets/flo-first-doorway-banner.png`. Neither that file nor the
`public/assets/` directory exists in this repository, and git history shows
it was never committed. The `.png` extension and the word "banner" suggest a
landscape crop was intended that was never produced, or was produced outside
the repo.

**Decision needed:** either (a) supply the landscape banner PNG and add it to
the approved section, or (b) confirm that `public/flo-first-doorway.jpg` —
the portrait photo actually in production — is the approved First Doorway
visual, and this entry is closed.

Pending that decision, the approved section above documents what is really
in production, which is what the site serves today.

### 2. A higher-resolution duplicate is unreferenced

`public/images/flo-first-doorway.jpg` — 4284 × 5712 px, **4.2 MB** — is a
different file from the approved `public/flo-first-doorway.jpg` (different
checksum, different dimensions). Nothing in the source references it.

**Decision needed:** confirm which is the approved original, then either
promote the higher-resolution file (resized and compressed first — 4.2 MB is
far too heavy to serve, especially on mobile) or remove it. Not deleted here:
removing a possible original photograph is Flo's call, not an automated one.

### 3. Unreferenced images

Present in the repo but referenced by no source file:

- `public/flo-about-flowers.jpg`
- `public/flo-about-rice-field.jpg`
- `src/assets/images/regenerated_image_1780275756727.jpg`
- `src/assets/images/regenerated_image_1780275760582.jpg`

**Decision needed:** keep as an archive or remove. Retained pending review —
and note that the two `regenerated_image_*` filenames suggest generative
output, which should be confirmed against the "preserve original
photographs" rule before any of them is ever put into production.

<!-- asset-register:unresolved:end -->

---

## Rules

1. No generative modification of Flo's photographs. Approved assets are
   original photography; resizing and compression are permitted, alteration
   of content is not.
2. Any asset added to an approved section must exist in the repository at the
   stated path, or the asset-register test fails.
3. Assets served to visitors should be compressed for web delivery. Anything
   over ~500 KB needs a resized variant before production use.
