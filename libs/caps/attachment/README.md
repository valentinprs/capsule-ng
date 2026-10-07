# Capsule Attachment

Import `CapsAttachmentImports` from `@capsule-ng/caps/attachment`.

Properties follow [Spartan Attachment](https://www.spartan.ng/components/attachment):

- `CapsAttachment`: `state` defaults to `done` (idle/uploading/processing/error/done); `size` defaults to `default` (default/sm/xs); `orientation` defaults to `horizontal` (horizontal/vertical).
- `CapsAttachmentMedia.variant` defaults to `icon` (icon/image).
- `CapsAttachmentTrigger.type` accepts button/submit/reset/null and defaults to button; an anchor gets no type attribute.
- `CapsAttachmentAction`: `type` defaults to button (button/submit/reset), Button `variant` to ghost and `size` to icon-xs. `disabled` exposes the public Brain Button boolean/coercion contract, default false. Variant/size types retain null/undefined.
- Actions/Content/Description/Group/Title have no inputs. No primitive has custom outputs.

Use separate native links/buttons for triggers and actions; supply accessible names and image alternatives. Busy is derived from uploading/processing, with no live region or uploader. See [conversation anatomy](../../../docs/specs/caps-messages.md).

AttachmentGroup has native `role="group"` and `tabindex="0"` for horizontal keyboard scrolling. Applications can override the standard tabindex (for example `tabindex="-1"`); it is not a custom input.
