import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCommandImports } from '@capsule-ng/caps/command';
import { CapsKbdImports } from '@capsule-ng/caps/kbd';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight, lucideCornerDownLeft, lucideSearch } from '@ng-icons/lucide';
import { searchPages } from './search-pages';

@Component({
	selector: 'spartan-docs-dialog',
	imports: [CapsButtonImports, CapsKbdImports, CapsCommandImports, NgIcon, FormsModule],
	providers: [
		provideIcons({
			lucideSearch,
			lucideCornerDownLeft,
			lucideArrowRight,
		}),
	],
	host: {
		'(window:keydown)': '_onKeyDown($event)',
	},
	template: `
		<button
			capsButton
			variant="outline"
			class="bg-input/30 border-input/30 text-muted-foreground hover:bg-input/50 hover:text-muted-foreground relative h-8 w-full justify-start gap-2 pl-2.5 font-normal shadow-none active:translate-y-px sm:pr-12 md:w-48 lg:w-60 xl:w-64"
			(click)="_state.set(true)"
		>
			<ng-icon name="lucideSearch" class="shrink-0 opacity-(--caps-opacity-50)" />
			<span class="hidden lg:inline-flex">Search documentation...</span>
			<span class="inline-flex lg:hidden">Search...</span>
			<div class="absolute top-1.5 right-1.5 hidden gap-1 sm:flex">
				<caps-kbd-group>
					<kbd capsKbd class="hidden [html[style*='--is-mac']_&]:inline-flex">⌘</kbd>
					<kbd capsKbd class="[html[style*='--is-mac']_&]:hidden">Ctrl</kbd>
					<kbd capsKbd>K</kbd>
				</caps-kbd-group>
			</div>
		</button>

		<caps-command-dialog
			[open]="_state()"
			(openChange)="_state.set($event)"
			dialogContentClass="border-ring/50 w-full rounded-xl! border-4 p-1 sm:max-w-lg"
		>
			<caps-command class="min-h-[400px] w-full pb-10" [(search)]="_searchVal">
				<caps-command-input placeholder="Type a command or search..." />
				<caps-command-list class="max-h-[400px] pt-1">
					@for (item of _pages; track item.url) {
						<button capsCommandItem (selected)="onSelect(item.url)" [value]="item.label + ' ' + item.section">
							<ng-icon name="lucideArrowRight" />
							<span class="flex flex-col text-left">
								<span>{{ item.label }}</span>
								<span class="text-muted-foreground text-xs">{{ item.section }}</span>
							</span>
						</button>
					}
				</caps-command-list>
				<!-- Empty state -->
				<caps-command-empty>No results found.</caps-command-empty>
			</caps-command>

			<div
				class="text-muted-foreground absolute inset-x-0 bottom-0 z-(--caps-z-20) flex h-10 items-center gap-2 rounded-b-lg border-t border-t-neutral-100 bg-neutral-50 px-4 text-xs font-medium dark:border-t-neutral-700 dark:bg-neutral-800"
			>
				<div class="flex items-center gap-2">
					<kbd capsKbd>
						<ng-icon name="lucideCornerDownLeft" />
					</kbd>
					<span>Go to Page</span>
				</div>
			</div>
		</caps-command-dialog>
	`,
})
export class DocsDialog {
	protected readonly _pages = searchPages;
	protected readonly _state = signal(false);
	protected readonly _searchVal = signal('');

	protected _onKeyDown(e: KeyboardEvent) {
		if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
			if (
				(e.target instanceof HTMLElement && e.target.isContentEditable) ||
				e.target instanceof HTMLInputElement ||
				e.target instanceof HTMLTextAreaElement ||
				e.target instanceof HTMLSelectElement
			) {
				return;
			}

			e.preventDefault();
			this._state.set(true);
		}
	}

	protected onSelect(url: string): void {
		window.location.href = url;
	}
}
