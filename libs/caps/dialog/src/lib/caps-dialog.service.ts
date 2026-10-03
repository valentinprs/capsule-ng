import type { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import {
	BrnDialogService,
	cssClassesToArray,
	type BrnDialogOptions,
	type BrnDialogRef,
} from '@spartan-ng/brain/dialog';
import { CapsDialogPanel } from './caps-dialog-panel';

export type CapsDialogOptions<TContext = unknown> = Partial<BrnDialogOptions> & {
	contentClass?: string;
	showCloseButton?: boolean;
	closeLabel?: string;
	context?: TContext;
};

@Injectable({ providedIn: 'root' })
export class CapsDialogService {
	private readonly _service = inject(BrnDialogService);
	open<TResult = unknown, TContext = unknown>(
		component: ComponentType<unknown>,
		options: CapsDialogOptions<TContext> = {},
	): BrnDialogRef<TResult> {
		return this._service.open(
			CapsDialogPanel,
			undefined,
			{
				...(options.context && typeof options.context === 'object' ? options.context : {}),
				$component: component,
				$contentClass: options.contentClass,
				$showCloseButton: options.showCloseButton,
				$closeLabel: options.closeLabel,
			},
			{ ...options, backdropClass: ['caps-dialog-overlay', ...cssClassesToArray(options.backdropClass)] },
		);
	}
}
