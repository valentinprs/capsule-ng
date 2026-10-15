# Conversation messages — issue #54

## API basis — Spartan review, 2026-10-07

The public properties follow the official Spartan [Bubble](https://www.spartan.ng/components/bubble), [Message](https://www.spartan.ng/components/message) and [Attachment](https://www.spartan.ng/components/attachment) documentation, including their API tables and manual implementation source. The repository's Helm baseline confirms the same values and defaults. There are no family-specific Bubble, Message or Attachment entry points in local Brain; the only behavioral adapter used here is the publicly exported `BrnButton` from `@spartan-ng/brain/button` for the independent action's disabled behavior.

Capsule adapts these public contracts to projected Angular components and native actions. MessageScroller retains its existing behavior.

### Public API

| Primitive                                                                                                                   | Inputs and defaults                                                                                                                                                                                                                               | Custom outputs |
| --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `CapsBubble`                                                                                                                | `variant: CapsBubbleVariants['variant'] = 'default'`; `align: 'start' \| 'end' = 'start'`                                                                                                                                                         | None           |
| `CapsBubbleReactions`                                                                                                       | `side: CapsBubbleReactionsVariants['side'] = 'bottom'`; `align: CapsBubbleReactionsVariants['align'] = 'end'`                                                                                                                                     | None           |
| `CapsBubbleContent`, `CapsBubbleContentDirective`, `CapsBubbleGroup`                                                        | None                                                                                                                                                                                                                                              | None           |
| `CapsMessage`                                                                                                               | `align: 'start' \| 'end' = 'start'`                                                                                                                                                                                                               | None           |
| `CapsMessageAvatar`, `CapsMessageContent`, `CapsMessageHeader`, `CapsMessageFooter`, `CapsMessageGroup`                     | None                                                                                                                                                                                                                                              | None           |
| `CapsAttachment`                                                                                                            | `state: CapsAttachmentState = 'done'`; `size: CapsAttachmentVariants['size'] = 'default'`; `orientation: CapsAttachmentVariants['orientation'] = 'horizontal'`                                                                                    | None           |
| `CapsAttachmentMedia`                                                                                                       | `variant: CapsAttachmentMediaVariants['variant'] = 'icon'`                                                                                                                                                                                        | None           |
| `CapsAttachmentTrigger`                                                                                                     | `type: 'button' \| 'submit' \| 'reset' \| null = 'button'`                                                                                                                                                                                        | None           |
| `CapsAttachmentAction`                                                                                                      | `type: 'button' \| 'submit' \| 'reset' = 'button'`; `variant: CapsButtonVariant \| null \| undefined = 'ghost'`; `size: CapsButtonSize \| null \| undefined = 'icon-xs'`; exposed Brain `disabled: boolean = false`, with `BooleanInput` coercion | None           |
| `CapsAttachmentActions`, `CapsAttachmentContent`, `CapsAttachmentDescription`, `CapsAttachmentGroup`, `CapsAttachmentTitle` | None                                                                                                                                                                                                                                              | None           |

Bubble variant values: default/secondary/muted/tinted/outline/ghost/destructive. Reaction side values: top/bottom; reaction alignment: start/end. Attachment states: idle/uploading/processing/error/done; sizes: default/sm/xs; orientations: horizontal/vertical; media variants: icon/image. The CVA-derived property types retain null/undefined as in the Spartan baseline; `CapsBubbleVariant` is only a non-null type alias for consumers. Action variants/sizes use the already public Capsule Button equivalents of the baseline Button types.

Native `click`, `href`, `download`, `target`, `rel`, `type`, `disabled` and content projection remain consumer-owned native behavior, rather than new component events or a file/message data model. A trigger only applies `type` to a button, never its anchor form.

### Capsule adaptation

Structural selectors become elements; whole-content Bubble actions remain native `button`/`a` directives, and Attachment actions remain siblings of their native overlay trigger. The message article role and state-derived attachment busy attribute provide semantics without a new public input. Historical messages receive no automatic live region. No sender, attachment URL, reaction, upload or sending props/services are introduced. Global class merging and the shared preset keep existing Capsule styling conventions.

## Anatomy

`caps-message` owns logical start/end layout; `caps-message-avatar`, `caps-message-content`, `caps-message-header` and `caps-message-footer` project identity, content, dates, statuses and actions. `caps-message-group` groups rows. A message is an article; its descendants remain neutral structural containers. Dates use native time, and historical statuses have no imposed live region. Avatar remains a composition of the public Capsule Avatar API.

`caps-bubble` owns the variant and logical alignment. `caps-bubble-content` projects ordinary content; `button[capsBubbleContent]` and `a[capsBubbleContent]` style native interactive content when the whole content is actionable. These native forms never contain another control. `caps-bubble-reactions` preserves top/bottom and start/end positioning; `caps-bubble-group` groups consecutive bubbles. Variants: default, secondary, muted, tinted, outline, ghost, destructive. Plain content is not an interactive role.

`caps-attachment` owns state (idle/uploading/processing/error/done), size (default/sm/xs) and orientation (horizontal/vertical). Media (icon/image), content, title, description and actions remain projected elements. `button[capsAttachmentTrigger]` or `a[capsAttachmentTrigger]` fills the card as a sibling overlay; `button[capsAttachmentAction]` is a separate native action with Capsule Button styles, default type button, ghost variant and icon-xs size. Busy is exposed during uploading/processing without a live region. Application code supplies accessible action names, file links/download attributes, error text and image alternatives. No upload, storage or sending API.

All components use the shared Capsule preset, semantic colors, spacing and focus tokens. Structural hosts use ng-content and OnPush, with no display:contents or native list nesting. Group wrappers retain their useful flex/scroll layout.

## Inventory and migration

All previews/pages/snippets/stories in Bubble, Message and Attachment are migrated, plus their primitives in MessageScroller previews, transcript-row and stories. MessageScroller/Marker APIs remain unchanged for #55. Existing Caps Avatar/Button/Popover/Tooltip/Dialog auxiliaries are preferred. Spinner uses the validated Capsule API; Scroller remains Helm until its own lot lands; typography is outside this lot. No home-page consumers existed at the starting SHA.

Public imports: CapsBubbleImports, CapsMessageImports, CapsAttachmentImports and their individual classes from /bubble, /message and /attachment. CSS classes become caps-\*; Helm and Brain sources remain unchanged. Native href/routerLink/download/target remain application-owned.

## Validation

Targeted consumer contracts, real browser keyboard/focus and accessible independent actions; catalogue/story variants, light/dark desktop/mobile/RTL layout and SSR/hydration are required before delivery. Results are recorded after execution, never inferred from compilation.

## Accessibility composition corrections

The complete audit of the loading compositions identified insufficient contrast when error text used destructive at 80% opacity, plus a horizontal attachment group inaccessible to keyboard scrolling. Capsule error descriptions use the full existing destructive token. AttachmentGroup exposes a native tabindex=0 and group semantics, preserving consumer tabindex overrides; the visible focus ring uses the shared focus token. No theme token, contrast threshold or axe rule is changed. The six specified responsive/theme cases require real render proofs before delivery.

The destructive Bubble keeps its red tinted surface and uses the foreground token for readable text. The catalogue popover exposed insufficient contrast with destructive text on the translucent red surface; both themes retain the destructive surface without changing global tokens or audit thresholds.
