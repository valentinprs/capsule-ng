import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { CapsPopoverImports } from '@capsule-ng/caps/popover';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideArrowUp,
	lucideAtSign,
	lucideBlocks,
	lucideBookOpen,
	lucideCheck,
	lucideGlobe,
	lucidePaperclip,
	lucidePlus,
	lucideSearch,
	lucideX,
} from '@ng-icons/lucide';
import { tablerCircleDashedPlus } from '@ng-icons/tabler-icons';
import { HlmCommandImports } from '@spartan-ng/helm/command';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { MentionableItem } from './mentionable-item';

export type MentionItem = {
	type: string;
	title: string;
	image: string;
	workspace?: string;
};

type ModelItem = {
	name: string;
	badge?: string;
};

type GroupedItems = {
	mentionable: MentionItem[];
	models: ModelItem[];
};
@Component({
	selector: 'spartan-notion-prompt',
	imports: [
		CapsButtonImports,
		CapsTextareaImports,
		CapsInputGroupImports,
		CapsPopoverImports,
		HlmCommandImports,
		HlmDropdownMenuImports,
		NgIcon,
		MentionableItem,
		CapsBadgeImports,
	],
	providers: [
		provideIcons({
			lucideAtSign,
			lucideX,
			lucidePaperclip,
			lucideCheck,
			lucideGlobe,
			lucideBlocks,
			lucideBookOpen,
			lucidePlus,
			lucideArrowUp,
			lucideSearch,
			tablerCircleDashedPlus,
		}),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full' },
	template: `
		<caps-input-group class="[--radius:1.2rem]">
			<caps-input-group-addon align="block-start">
				<caps-popover>
					<button
						capsButton
						capsPopoverTrigger
						variant="outline"
						class="rounded-full"
						[size]="_mentionButtonSize()"
						aria-label="Add mention"
						size="xs"
						type="button"
					>
						<ng-icon name="lucideAtSign" />
						@if (!_hasMention()) {
							<span>Add mention</span>
						}
					</button>

					<ng-template capsPopoverContent let-ctx [class]="'p-0 [--radius:1.2rem]'">
						<hlm-command>
							<hlm-command-input placeholder="Type a command or search..." />

							<hlm-command-list>
								@for (groupType of _groupTypes(); track groupType) {
									<hlm-command-group [id]="groupType">
										<hlm-command-group-label>{{ groupType === 'page' ? 'Pages' : 'Users' }}</hlm-command-group-label>
										@for (item of _grouped()[groupType]; track item.title) {
											<button hlm-command-item [value]="item.title" (click)="addMention(item); ctx.close()">
												<spartan-mentionable-item [item]="item" />
												{{ item.title }}
											</button>
										}
									</hlm-command-group>
								}
							</hlm-command-list>

							<!-- Empty state -->
							<div *hlmCommandEmptyState hlmCommandEmpty>No results found.</div>
						</hlm-command>
					</ng-template>
				</caps-popover>
				<div class="no-scrollbar -m-1.5 flex gap-1 overflow-y-auto p-1.5">
					@for (mention of _mentions(); track mention) {
						<button
							capsButton
							variant="secondary"
							class="rounded-full"
							size="sm"
							(click)="removeMention(mention)"
							type="button"
						>
							<spartan-mentionable-item [item]="mention" />
							{{ mention.title }}
							<ng-icon name="lucideX" class="ml-1" />
						</button>
					}
				</div>
			</caps-input-group-addon>
			<textarea
				capsTextarea
				placeholder="Ask, Search or make anything..."
				aria-label="Ask, Search or make anything"
			></textarea>
			<caps-input-group-addon align="block-end" class="no-scrollbar gap-1 overflow-y-auto">
				<button capsButton class="rounded-full" size="icon-sm" variant="ghost" type="button">
					<ng-icon name="lucidePaperclip" />
					<span class="sr-only">Attachment</span>
				</button>
				<button
					capsButton
					class="rounded-full"
					size="sm"
					[hlmDropdownMenuTrigger]="model"
					#menuTrigger
					variant="ghost"
					type="button"
				>
					{{ _selectedModel() ? _selectedModel()?.name : 'Agent Mode' }}
				</button>
				<ng-template #model>
					<hlm-dropdown-menu class="w-50 [--radius:1rem]">
						<hlm-dropdown-menu-group>
							<hlm-dropdown-menu-label class="text-muted-foreground text-xs">Select Agent Mode</hlm-dropdown-menu-label>
							@for (model of _models; track model.name) {
								<button hlmDropdownMenuCheckbox [checked]="isChecked(model)" (triggered)="selectModel(model)">
									<span>{{ model.name }}</span>
									@if (model.badge) {
										<caps-badge
											variant="gray"
											class="ml-2 h-5 rounded-sm bg-blue-100 px-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100"
										>
											{{ model.badge }}
										</caps-badge>
									}
									<hlm-dropdown-menu-checkbox-indicator />
								</button>
							}
						</hlm-dropdown-menu-group>
					</hlm-dropdown-menu>
				</ng-template>

				<button
					capsButton
					class="rounded-full"
					size="sm"
					[hlmDropdownMenuTrigger]="sources"
					variant="ghost"
					type="button"
				>
					<ng-icon name="lucideGlobe" />
					All Sources
				</button>
				<ng-template #sources>
					<hlm-dropdown-menu class="w-75 [--radius:1rem]">
						<hlm-dropdown-menu-group>
							<button hlmDropdownMenuCheckbox [checked]="_webSearch()" (triggered)="_webSearch.set(!_webSearch())">
								<ng-icon name="lucideGlobe" class="mr-2" />
								Web Search
								<hlm-dropdown-menu-checkbox-indicator aria-hidden="true" />
							</button>
						</hlm-dropdown-menu-group>
						<hlm-dropdown-menu-separator />
						<hlm-dropdown-menu-group>
							<button
								hlmDropdownMenuCheckbox
								[checked]="_appIntegrations()"
								(triggered)="_appIntegrations.set(!_appIntegrations())"
							>
								<ng-icon name="lucideBlocks" class="mr-2" />
								Apps and Integrations
								<hlm-dropdown-menu-checkbox-indicator aria-hidden="true" />
							</button>
							<button hlmDropdownMenuItem>
								<ng-icon name="tablerCircleDashedPlus" />
								All Sources I can access
							</button>
							<button hlmDropdownMenuItem>
								<ng-icon name="lucideBookOpen" />
								Help Center
							</button>
						</hlm-dropdown-menu-group>
						<hlm-dropdown-menu-separator />
						<hlm-dropdown-menu-group>
							<button hlmDropdownMenuItem>
								<ng-icon name="lucidePlus" />
								Connect Apps
							</button>
							<hlm-dropdown-menu-label class="text-muted-foreground text-xs">
								We&apos;ll only search in the sources selected here.
							</hlm-dropdown-menu-label>
						</hlm-dropdown-menu-group>
					</hlm-dropdown-menu>
				</ng-template>

				<button capsButton variant="default" class="ml-auto rounded-full" size="icon-sm" type="button">
					<ng-icon name="lucideArrowUp" />
					<span class="sr-only">Send</span>
				</button>
			</caps-input-group-addon>
		</caps-input-group>
	`,
})
export class NotionPrompt {
	protected readonly _webSearch = signal(true);
	protected readonly _appIntegrations = signal(true);
	protected _models = SAMPLE_DATA.models;
	protected _mentions = signal<MentionItem[]>([]);
	protected _selectedModel = signal<ModelItem | undefined>(this._models[0]);

	protected _hasMention = computed(() => this._mentions().length > 0);
	protected _mentionButtonSize = computed(() => (this._hasMention() ? 'icon-sm' : 'sm'));

	protected _grouped = computed(() => {
		return SAMPLE_DATA.mentionable.reduce(
			(acc, item) => {
				const isAvailable = !this._mentions()
					.map((mention) => mention.title)
					.includes(item?.title);

				if (isAvailable) {
					if (!acc[item.type]) {
						acc[item.type] = [];
					}
					acc[item.type].push(item);
				}
				return acc;
			},
			{} as Record<string, typeof SAMPLE_DATA.mentionable>,
		);
	});
	protected _groupTypes = computed(() => Object.keys(this._grouped()));

	addMention(item: MentionItem) {
		this._mentions.update((mentions) => [...mentions, item]);
	}

	removeMention(item: MentionItem) {
		this._mentions.update((mentions) => mentions.filter((mention) => mention.title !== item.title));
	}

	selectModel(model: ModelItem) {
		this._selectedModel.set(model);
	}

	isChecked(model: ModelItem) {
		return this._selectedModel() === model;
	}
}

const SAMPLE_DATA: GroupedItems = {
	mentionable: [
		{
			type: 'page',
			title: 'Meeting Notes',
			image: '📝',
		},
		{
			type: 'page',
			title: 'Project Dashboard',
			image: '📊',
		},
		{
			type: 'page',
			title: 'Ideas & Brainstorming',
			image: '💡',
		},
		{
			type: 'page',
			title: 'Calendar & Events',
			image: '📅',
		},
		{
			type: 'page',
			title: 'Documentation',
			image: '📚',
		},
		{
			type: 'page',
			title: 'Goals & Objectives',
			image: '🎯',
		},
		{
			type: 'page',
			title: 'Budget Planning',
			image: '💰',
		},
		{
			type: 'page',
			title: 'Team Directory',
			image: '👥',
		},
		{
			type: 'page',
			title: 'Technical Specs',
			image: '🔧',
		},
		{
			type: 'page',
			title: 'Analytics Report',
			image: '📈',
		},
		{
			type: 'user',
			title: 'shadcn',
			image: 'https://github.com/shadcn.png',
			workspace: 'Workspace',
		},
		{
			type: 'user',
			title: 'maxleiter',
			image: 'https://github.com/maxleiter.png',
			workspace: 'Workspace',
		},
		{
			type: 'user',
			title: 'evilrabbit',
			image: 'https://github.com/evilrabbit.png',
			workspace: 'Workspace',
		},
	],
	models: [
		{
			name: 'Auto',
		},
		{
			name: 'Agent Mode',
			badge: 'Beta',
		},
		{
			name: 'Plan Mode',
		},
	],
};
