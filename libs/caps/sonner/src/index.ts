import { CapsToaster } from './lib/caps-toaster';
export { provideBrnSonnerToasterConfig as provideCapsSonnerToasterConfig } from '@spartan-ng/brain/sonner';
export type {
	BrnSonnerToasterConfig,
	ExternalToast,
	Position,
	PromiseData,
	PromiseT,
	Theme,
	ToastAction,
	ToastClassnames,
	ToasterProps,
	ToastOptions,
	ToastT,
	ToastTypes,
} from '@spartan-ng/brain/sonner';
export { CAPS_TOAST_CLOSE, toast } from './lib/caps-toast';
export { CapsToaster } from './lib/caps-toaster';
export const CapsSonnerImports = [CapsToaster] as const;
