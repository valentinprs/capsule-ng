import { CapsToaster } from './lib/caps-toaster';
export { provideBrnSonnerToasterConfig as provideCapsSonnerToasterConfig, toast } from '@spartan-ng/brain/sonner';
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
export { CapsToaster } from './lib/caps-toaster';
export const CapsSonnerImports = [CapsToaster] as const;
