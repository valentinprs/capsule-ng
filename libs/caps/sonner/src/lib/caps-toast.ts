import type { Type } from '@angular/core';
import { toast as brnToast, type ExternalToast, type PromiseData, type ToastAction } from '@spartan-ng/brain/sonner';

/**
 * Default cancel of every Capsule toast. `caps-toaster` renders it as an outline "Close" button only
 * when the toast never closes by itself (infinite duration), as in the Figma Sonner. A `cancel`
 * passed by the caller replaces it.
 */
export const CAPS_TOAST_CLOSE: ToastAction = { label: 'Close', onClick: () => undefined };

function withClose<T extends ExternalToast>(data?: T): T {
	return { cancel: CAPS_TOAST_CLOSE, ...data } as T;
}

type Message = string | Type<unknown>;

/** Brain's `toast`, with the Capsule "Close" button on persistent toasts. */
export const toast = Object.assign((message: Message, data?: ExternalToast) => brnToast(message, withClose(data)), {
	success: (message: Message, data?: ExternalToast) => brnToast.success(message, withClose(data)),
	info: (message: Message, data?: ExternalToast) => brnToast.info(message, withClose(data)),
	warning: (message: Message, data?: ExternalToast) => brnToast.warning(message, withClose(data)),
	error: (message: Message, data?: ExternalToast) => brnToast.error(message, withClose(data)),
	message: (message: Message, data?: ExternalToast) => brnToast.message(message, withClose(data)),
	loading: (message: Message, data?: ExternalToast) => brnToast.loading(message, withClose(data)),
	promise: <ToastData>(promise: Parameters<typeof brnToast.promise<ToastData>>[0], data?: PromiseData<ToastData>) =>
		brnToast.promise(promise, data && withClose(data)),
	custom: brnToast.custom,
	dismiss: brnToast.dismiss,
}) satisfies typeof brnToast;
