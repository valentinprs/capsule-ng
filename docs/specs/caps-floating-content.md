# Capsule floating content — issue #36

## Approved API and anatomy

The user's Carbon Angular decision supersedes the issue's unimplemented proposals.
Popover and Tooltip adapt [PopoverContainer](https://angular.carbondesignsystem.com/documentation/directives/PopoverContainer.html)
and [Tooltip](https://angular.carbondesignsystem.com/documentation/components/Tooltip.html),
including inherited state, placements, appearance, timing and template context.
[Toggletip](https://angular.carbondesignsystem.com/documentation/components/Toggletip.html)
is not an equivalent Hover Card interaction. Hover Card retains the existing service's
four sides and timing, with its side named placement.

Public anatomy and exact defaults are documented in the three entrypoint READMEs.
Structural roots use caps-\* elements, triggers use native buttons/links, and content
uses explicit lazy ng-templates. Popover owns its panel and an accessible nonmodal
dialog; Tooltip never moves focus or wraps the native control; Hover Card remains
supplementary. Standard ARIA names are forwarded to the popover overlay.

## Foundation adaptation

BrnPopover's public extension points allow the twelve Carbon placements without
modifying Brain. The CDK strategy supplies fixed placement unless autoAlign is enabled;
start/end offset reverses on end, and the caret compensates for its cross-axis offset.
Tooltip uses BrnOverlayService/BrnOverlayRef directly to avoid BrnPopover's automatic
focus restoration after blur. Hover Card composes BrnHoverCardContentService with a
Capsule-owned connected strategy and trigger timers, preserving content hover tracking
and making placement updates and Escape cancellation effective. No new dependency is
added. A scoped internal direction service preserves parent direction and root overrides
without attaching a second native Dir directive; moved panels receive their effective
direction. All visual rules live in the shared Capsule foundations stylesheet.

## Example composition audit

All previews, variants, consumers, stories and their displayed strings were inventoried.
Their executed templates and displayed snippets use the same public Capsule imports.
Native controls, buttons and labels with existing Capsule APIs are migrated too; Helm
remains for primitives outside this issue (Avatar, Badge, Input Group, Command, etc.).
The simultaneous #42 migration is deliberately not required by this branch.

- Lazy templates replace the extra portal/content element pair. Angular drops static
  template classes, so panel overrides use an explicit [class] binding.
- Hover Card's profile previews use real links, replacing actionless buttons.
- Explicit for/id labels are retained in dimensions demos because they show a grid of
  independent controls; they are not redundant Field wrappers.
- Native icon controls receive accessible names. The disabled-tooltip example uses a
  keyboard-focusable inline wrapper around its disabled native button.
- Transcript outline keeps its button and navigation items; those are existing useful
  Hover Card capabilities, and no essential action is hidden behind hover alone.
- Tooltip's former group provider is removed because Carbon has no skip-delay group API;
  its multiple-controls example uses the approved delays independently.
- Popover's close-on-scroll story uses open state plus the native document scroll event,
  because Carbon has no scrollStrategy input. The story retains the observable behavior.
- The mobile menu shares one open signal with the native trigger and uses Carbon's
  alignment-axis offset instead of old Brain offset inputs. Its width is ordinary CSS.

Inventoried source compositions:

- `apps/app/src/app/shared/code/code-rtl-preview.ts`
- `apps/app/src/app/shared/header/header-mobile-nav.ts`
- `apps/app/src/app/pages/(components)/components/(bubble)/bubble--tooltip.preview.ts`
- `apps/app/src/app/pages/(components)/components/(bubble)/bubble--popover.preview.ts`
- `apps/app/src/app/pages/(components)/components/(dialog)/dialog--dismiss-options.preview.ts`
- `apps/app/src/app/pages/(components)/components/(hover-card)/hover-card--rtl.example.ts`
- `apps/app/src/app/pages/(components)/components/(hover-card)/hover-card.preview.ts`
- `apps/app/src/app/pages/(components)/components/(button-group)/button-group--input-group.example.ts`
- `apps/app/src/app/pages/(components)/components/(button-group)/button-group--popover.example.ts`
- `apps/app/src/app/pages/(components)/components/(tooltip)/tooltip--disabled.example.ts`
- `apps/app/src/app/pages/(components)/components/(tooltip)/tooltip--disabled-button-with-tooltip.example.ts`
- `apps/app/src/app/pages/(components)/components/(tooltip)/tooltip--template.example.ts`
- `apps/app/src/app/pages/(components)/components/(tooltip)/tooltip--rtl.example.ts`
- `apps/app/src/app/pages/(components)/components/(tooltip)/tooltip.preview.ts`
- `apps/app/src/app/pages/(components)/components/(tooltip)/tooltip--position.example.ts`
- `apps/app/src/app/pages/(components)/components/(tooltip)/tooltip--simple.example.ts`
- `apps/app/src/app/pages/(components)/components/(tooltip)/tooltip--group.example.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller--visibility.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller--previous-context.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller--streaming.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller--group-chat.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller--load-history.preview.ts`
- `apps/app/src/app/pages/(components)/components/(popover)/popover--rtl.example.ts`
- `apps/app/src/app/pages/(components)/components/(popover)/popover--align.preview.ts`
- `apps/app/src/app/pages/(components)/components/(popover)/popover--basic.preview.ts`
- `apps/app/src/app/pages/(components)/components/(popover)/popover.preview.ts`
- `apps/app/src/app/pages/(components)/components/(input-group)/input-group--form.preview.ts`
- `apps/app/src/app/pages/(components)/components/(input-group)/input-group--button.preview.ts`
- `apps/app/src/app/pages/(components)/components/(input-group)/input-group--tooltip.preview.ts`
- `apps/app/src/app/pages/(components)/components/(input-group)/input-group--label.preview.ts`
- `apps/app/src/app/pages/(home)/components/tasks/components/table-actions.ts`
- `apps/app/src/app/pages/(home)/components/playground/components/preset-share.ts`
- `apps/app/src/app/pages/(home)/components/playground/components/preset-selector.ts`
- `apps/app/src/app/pages/(home)/components/playground/components/model-selector.ts`
- `apps/app/src/app/pages/(home)/components/overview/components/notion-prompt.ts`
- `apps/app/src/app/pages/(home)/components/overview/components/button-group-popover.ts`
- `apps/app/src/app/pages/(home)/components/overview/components/input-group.ts`
- `apps/ui-storybook/stories/hover-card.stories.ts`
- `apps/ui-storybook/stories/input-group.stories.ts`
- `apps/ui-storybook/stories/popover.stories.ts`
- `apps/ui-storybook/stories/tooltip.stories.ts`

## Validation

Validation evidence is recorded in the PR description after the browser, build, lint,
format and generated metadata checks complete. Brain must remain unchanged.
