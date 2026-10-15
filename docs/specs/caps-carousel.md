# Capsule Carousel — issue #58

## Inventory and decision before implementation (2026-10-07)

The [official Spartan Carousel documentation](https://www.spartan.ng/components/carousel)
and the repository's existing public Helm contract define the starting API. Carousel uses Embla
and its Angular wrapper; there is no Brain Carousel primitive. Brain's public button supplies the
native disabled contract through CapsButton. The 2026-10-07 user instruction makes Spartan the
property reference for this lot. No Brain or Helm source is changed.

Retained: horizontal/vertical orientation, ambient RTL with explicit Embla direction override,
responsive slide basis, spacing, navigation availability, current snap/count and arbitrary plugins.
The existing autoplay example is retained with user-controlled pause/restart. Snap count is the
number of scroll positions (which can differ from item count for grouped/responsive slides).

Anatomy: `<caps-carousel>` owns the viewport and Embla; `<caps-carousel-content>` is the track;
`<caps-carousel-item>` projects arbitrary slide content. Native `button capsButton
capsCarouselPrevious/Next` owns its label/icon and automatically disables at an edge.
`<caps-carousel-slide-display>` reports current snap/count. Native `button capsButton
capsCarouselAutoplay` toggles the existing autoplay plugin and is projected before the viewport,
so rotation control is first in the tab order. Navigation is inline by default; consumers choose
layout rather than receiving hidden absolute-positioned buttons/icons.

The root is a named region; slides are named groups, automatically numbered unless the consumer
provides `aria-label` or `aria-labelledby`. Offscreen slides are inert after browser initialization
so their controls do not enter the tab sequence. They remain rendered during SSR; Embla initializes
after render. Arrow keys follow orientation and RTL and do not intercept editable controls or
nested widgets. Navigation uses native button focus and does not submit a containing form. Arrow
keys on links, buttons or other focusable slide content stay with those controls, preventing an
arrow-driven transition from making the focused slide inert.

[WAI carousel guidance](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) requires rotation to stop
on focus/hover, explicit restart and a first-in-order rotation control. Capsule pauses the autoplay
plugin on focus, pointer hover and manual navigation; it never resumes on leave. Reduced motion
makes manual moves instantaneous and stops/prevents autoplay. The
[Embla autoplay API](https://www.embla-carousel.com/docs/v8/plugins/autoplay) supplies play/stop/
isPlaying; other plugins stay consumer-owned. Examples use the plugin's reduced-motion breakpoint
and persistent stop-on-interaction options as well. No autoplay plugin is created by Capsule.

## Example audit

All seven catalogue consumers: default, sizes, spacing, vertical orientation, slide counter,
autoplay/plugins and translated RTL. All five original Storybook stories migrate and receive
counter/RTL coverage. Existing Card remains Capsule; native buttons use CapsButton. The page's
external links use CapsLink. Typography helpers remain because no Capsule equivalent exists.
Displayed skeleton/import strings and generated snippets/API must match those public imports.
There are no additional live Carousel consumers on the home page (repository-wide search).

## Public contracts

Entrypoint `@capsule-ng/caps/carousel`, `CapsCarouselImports`. Inputs on root: `orientation`,
`options` (Embla options except `axis`, owned by orientation), `plugins`, `aria-label`.
Read-only signals: `canScrollPrev`, `canScrollNext`, `currentSlide`, `slideCount`, `autoplayPlaying`,
`reducedMotion`. Methods: `scrollPrev`, `scrollNext`, `pauseAutoplay`, `playAutoplay`, `toggleAutoplay`.
Navigation directives accept an additional `disabled` condition. They require projected names.
Slide display retains Spartan's string `label` (default `Slide`) and `slideClass`; the screen-reader sentence follows Spartan. The earlier proposed formatting callback has been removed. No control/value accessor or form state is introduced.

## Property and behavior matrix (Spartan audit, 2026-10-07)

[Spartan](https://www.spartan.ng/components/carousel) and the matching existing
[Helm source](../../libs/helm/carousel/src/lib/hlm-carousel.ts) establish the retained shapes.
[BrnButton](../../libs/brain/button/src/lib/brn-button.ts) supplies native disabled behavior;
[CapsButton](../../libs/caps/button/src/lib/caps-button.ts) already exposes its styling inputs.
The accessibility rows are explicit Capsule adaptations, grounded in the
[WAI carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/).

| Prepared contract                                                                                              | Source                                                                                          | Capsule adaptation and reason                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Root `orientation: 'horizontal' \| 'vertical'`, default `horizontal`                                           | Spartan root                                                                                    | Retained; controls track layout, Embla axis and matching arrows.                                                                              |
| Root `options: Omit<EmblaOptionsType, 'axis'>`, optional                                                       | Spartan root; [Embla options](https://www.embla-carousel.com/docs/v8/api/options)               | Retained; ambient direction precedes explicit options; orientation owns axis. Reduced motion overrides duration to zero.                      |
| Root `plugins: EmblaPluginType[]`, default `[]`                                                                | Spartan root                                                                                    | Retained; consumer constructs and configures plugins.                                                                                         |
| Previous/next `variant`, `size`                                                                                | Spartan native controls; existing CapsButton                                                    | Composed through `capsButton` on the same native button; label/icon remain projected. No duplicate styling input on the navigation directive. |
| Previous/next `disabled: boolean`, default `false`                                                             | Brain button; native HTML disabled                                                              | Additional consumer disable condition combined with edge availability. Native property and `data-disabled` stay synchronized with CapsButton. |
| Display `label: string`, default `Slide`                                                                       | Spartan slide display                                                                           | Retained shape and sentence. Removed the proposed callback: existing consumers need no new formatter API.                                     |
| Display `slideClass: ClassValue`, default `text-muted-foreground text-sm`                                      | Spartan slide display                                                                           | Retained; normalizes class values with the existing utility.                                                                                  |
| Root `aria-label: string`, default `Slides`                                                                    | WAI region naming                                                                               | Capsule extension for a meaningful named region without an application-generated ID.                                                          |
| Item `aria-label?`, `aria-labelledby?`                                                                         | WAI slide naming                                                                                | Capsule extensions for consumer content names; otherwise automatic DOM-order item numbering.                                                  |
| Root `canScrollPrev`, `canScrollNext`, `currentSlide`, `slideCount` read-only signals                          | Existing public Helm; [Embla methods](https://www.embla-carousel.com/docs/v8/api/methods)       | Retained state. Selected index is zero-based; count is scroll snaps, while item names count items.                                            |
| Root `scrollPrev()`, `scrollNext()`                                                                            | Existing public Helm / Embla                                                                    | Retained; user navigation pauses rotation and synchronizes state immediately.                                                                 |
| Root `autoplayPlaying`, `pauseAutoplay()`, `playAutoplay()`, `toggleAutoplay()`; native `capsCarouselAutoplay` | [Embla Autoplay](https://www.embla-carousel.com/docs/v8/plugins/autoplay); WAI rotation control | Capsule extension for the existing plugin example: explicit restart, persistent user pause, rotation control first in Tab order.              |
| Root `reducedMotion` read-only signal                                                                          | User motion preference; WAI rotation control                                                    | Capsule extension lets the consumer disable its rotation button; motion reduction stops autoplay and makes manual navigation instantaneous.   |

Content and item sizing/spacing remain CSS classes, as in the Spartan examples. Item visibility
is an internal accessibility concern: browser-initialized offscreen items become inert; SSR content
stays present. `registerSlide`, `slideLabel` and `slideInert` are internal composition methods,
not consumer configuration.

Native button attributes, DOM events and containing-form semantics pass through intact; the
navigation/autoplay directives set `type="button"` to prevent accidental form submission.

### Events and configuration audit

The installed Angular wrapper publicly provides `options`, `plugins`, `subscribeToEvents`,
`eventsThrottleTime` and `emblaChange`; Capsule uses them internally. It subscribes to Embla's
`init`, `select`, `reInit`, `slidesInView` and `settle`, plus the Autoplay plugin's `autoplay:play`
and `autoplay:stop`. These names match the installed declarations and the official
[Embla events](https://www.embla-carousel.com/docs/v8/api/events) and
[Autoplay documentation](https://www.embla-carousel.com/docs/v8/plugins/autoplay). Capsule creates
no additional output. Throttle time zero and immediate state synchronization after manual moves
keep rapid navigation current without a new public event option.

The example Autoplay configuration uses documented `delay`, `stopOnFocusIn`, `stopOnMouseEnter`,
`stopOnInteraction` and reduced-motion `breakpoints`/`active`. Tests additionally exercise documented
`playOnInit`. Existing options cover direction, duration, alignment, looping and grouped scrolling;
all other Embla options continue through the original options object. Capsule's persistent pause
is intentional: leave events and reinitialization do not silently undo a user's pause.

## Validation (2026-10-07, Node 22.15.0)

All seven public Chromium contracts pass. They cover names/reordering, native form non-submission,
combined consumer/edge disabled state and styling hook, focus, inert offscreen controls, projected
editing/interactive keys, LTR/RTL overrides, vertical arrows, grouped/looped/rapid navigation,
persistent autoplay pause, pointer restart, live announcements and reduced motion. A discovered
zero-area Embla intersection was corrected before this passing run: only slides with positive
viewport intersection remain interactive. Later public type annotations change declaration
emission, not runtime behavior; these contracts were not repeated unnecessarily.

The seven actual catalogue compositions pass navigation, responsive layout, fonts and unwaived
axe at 1280/light and 390/dark. The real Storybook renderer passes all seven stories at 1280/light
and the four meaningful sizes/vertical/autoplay/RTL variants at 390/dark. Themes are exclusive on
html/body and computed colors differ. Font load/status/ready checks and CDP-visible glyph checks
confirm custom Inter and Arabic fonts. Complete catalogue and selected Storybook captures were
inspected. Camera-only captures do not constitute additional interaction coverage.

The real `/components/carousel` HTTP route returns SSR markup and hydration markers. Its initialized
browser validates native navigation/focus, keyboard, loaded custom glyphs and horizontal overflow.
The final full-page host axe assertion remains **failed** on exactly two unnamed copy buttons in
shared `apps/app/src/app/shared/code/code.ts:135`. Before the authorized copy-name correction, that source matched HEAD8 byte-for-byte; this is
source attribution, not a proven runtime baseline. Parent then explicitly expanded this lot to add
only `aria-label="Copy code"` on the shared copy button. Format and lint pass for the attribute fix;
its runtime effect remains pending the central union run. The recorded host assertion is not
reclassified as a pass. The newly displayed Capsule API now has a
meaningful `Components` h3 before the shared h4 class headings, and the final host audit confirms
no heading-order violation. No axe rules/nodes are excluded. Parent accepted delivery with this
explicit finding and the minimal shared attribute correction; its union review validates the fix.

The targeted Capsule package and its three dependencies build successfully after the final source
change. Source-before/source-after hashes match the final bundle/DTS/styles receipt. A stricter
portable declaration check found inferred `node_modules/embla-carousel/...` imports; public
InputSignal/Signal annotations following Spartan corrected these. Final declaration and external
Angular-template consumers pass without baseUrl/workspace paths and with skipLibCheck=false,
using actual package exports. Earlier workspace-based consumer compilation is retained as a
separate, less strict proof. Source consumers, App/Storybook/test compilation and actual Caps,
App, Storybook, Cypress and Tools ESLint configs pass with Nx boundaries active; Tools retains
three existing any warnings. The App config disables Nx boundaries by default; the final light
App lint explicitly enables them on the cached graph. Its seven Carousel auto-import violations
were converted to equivalent relative imports (page, RTL example and loader). These consumer-only
imports and the shared copy-name attribute do not change the validated Capsule package or require
a behavioral rebuild. The generated RTL snippet reflects the final relative import. SSR renderApplication separately preserves all projected slide names
and static content without inert attributes.

API/snippet generation passes. Metadata has 10 passing tests in normal mode; the snapshot adds
only the new Carousel caps section. Inferred string aria inputs remain `unknown` in the existing
metadata extractor; their distributed InputSignal<string> declarations and external consumer are
verified. No shared extractor is changed for this lot. Cypress scenarios are migrated and linted;
the Cypress runner itself was not executed. The global union pipeline remains central-owned.
