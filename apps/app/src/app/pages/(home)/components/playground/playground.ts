import { Component } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsLabel } from '@capsule-ng/caps/label';
import { CapsSeparator } from '@capsule-ng/caps/separator';
import { CapsTabsImports } from '@capsule-ng/caps/tabs';
import { CapsTextarea } from '@capsule-ng/caps/textarea';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerBrowserPlus, tablerEdit, tablerMessageCheck, tablerRotate } from '@ng-icons/tabler-icons';
import {
	CodeViewer,
	MaxLengthSelector,
	ModelSelector,
	PresetActions,
	PresetSave,
	PresetSelector,
	PresetShare,
	TemperatureSelector,
	TopPSelector,
} from './components';
import { MODELS, TYPES } from './data/models';
import { PRESETS_DATA } from './data/presets';

@Component({
	selector: 'spartan-playground-example',
	imports: [
		CapsLabel,
		PresetShare,
		PresetSave,
		PresetSelector,
		PresetActions,
		CodeViewer,
		CapsSeparator,
		CapsTabsImports,
		NgIcon,
		CapsTextarea,
		CapsButton,
		ModelSelector,
		TemperatureSelector,
		TopPSelector,
		MaxLengthSelector,
	],
	providers: [provideIcons({ tablerMessageCheck, tablerBrowserPlus, tablerEdit, tablerRotate })],
	template: `
		<div class="md:hidden">
			<img src="/assets/playground-light.png" alt="Playground" class="block dark:hidden" />
			<img src="/assets/playground-dark.png" alt="Playground" class="hidden dark:block" />
		</div>
		<div class="hidden flex-1 flex-col rounded-lg border md:flex">
			<div
				class="flex flex-col items-start justify-between gap-2 px-8 py-4 sm:flex-row sm:items-center sm:gap-0 md:h-16"
			>
				<h2 class="pl-0.5 text-lg font-semibold">Playground</h2>
				<div class="ml-auto flex w-full gap-2 sm:justify-end">
					<spartan-preset-selector [presets]="_presets" />
					<spartan-preset-save />
					<div class="hidden gap-2 md:flex">
						<spartan-code-viewer />
						<spartan-preset-share />
					</div>
					<spartan-preset-actions />
				</div>
			</div>
			<caps-separator />
			<caps-tabs value="complete" class="grid flex-1 items-stretch gap-6 p-6 md:grid-cols-[1fr_200px]">
				<div class="col-span-2 md:col-span-1">
					<caps-tabs-content value="complete" class="mt-0">
						<div class="flex h-full flex-col gap-4">
							<textarea
								capsTextarea
								placeholder="Write a tagline for an ice cream shop"
								class="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
							></textarea>
							<div class="flex items-center gap-2">
								<button capsButton>Submit</button>
								<button capsButton variant="secondary" size="icon">
									<span class="sr-only">Show history</span>
									<ng-icon name="tablerRotate" />
								</button>
							</div>
						</div>
					</caps-tabs-content>
					<caps-tabs-content value="insert" class="mt-0">
						<div class="flex h-full flex-col gap-4">
							<div class="grid grid-cols-2 gap-4">
								<textarea
									capsTextarea
									placeholder="We're writing to [inset]. Congrats from OpenAI!"
									class="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
								></textarea>
								<div class="bg-muted rounded-md border"></div>
							</div>

							<div class="flex items-center gap-2">
								<button capsButton>Submit</button>
								<button capsButton variant="secondary" size="icon">
									<span class="sr-only">Show history</span>
									<ng-icon name="tablerRotate" />
								</button>
							</div>
						</div>
					</caps-tabs-content>
					<caps-tabs-content value="edit" class="mt-0">
						<div class="flex h-full flex-col gap-4">
							<div class="grid grid-cols-2 gap-4">
								<div class="flex flex-col gap-4">
									<textarea
										capsTextarea
										placeholder="We're writing to [inset]. Congrats from OpenAI!"
										class="min-h-[298px] flex-1 p-4 md:min-h-[598px] lg:min-h-[598px]"
									></textarea>
									<div class="flex flex-col gap-2">
										<label capsLabel for="playground-instructions">Instructions</label>
										<textarea
											capsTextarea
											id="playground-instructions"
											placeholder="Fix the spelling mistakes"
										></textarea>
									</div>
								</div>
								<div class="bg-muted rounded-md border"></div>
							</div>

							<div class="flex items-center gap-2">
								<button capsButton>Submit</button>
								<button capsButton variant="secondary" size="icon">
									<span class="sr-only">Show history</span>
									<ng-icon name="tablerRotate" />
								</button>
							</div>
						</div>
					</caps-tabs-content>
				</div>
				<div class="hidden flex-col gap-6 sm:flex md:order-2">
					<div class="grid gap-3">
						<span class="text-sm font-medium">Mode</span>
						<caps-tabs-list aria-label="tabs example" class="w-full">
							<button capsTabsTrigger value="complete">
								<ng-icon name="tablerMessageCheck" />
							</button>
							<button capsTabsTrigger value="insert">
								<ng-icon name="tablerBrowserPlus" />
							</button>
							<button capsTabsTrigger value="edit">
								<ng-icon name="tablerEdit" />
							</button>
						</caps-tabs-list>
					</div>
					<spartan-model-selector [models]="_models" [types]="_types" />
					<spartan-temperature-selector />
					<spartan-max-length-selector />
					<spartan-top-p-selector />
				</div>
			</caps-tabs>
		</div>
	`,
})
export class PlaygroundExample {
	protected readonly _presets = PRESETS_DATA;
	protected readonly _models = MODELS;
	protected readonly _types = TYPES;
}
