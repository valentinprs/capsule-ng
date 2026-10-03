import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsLabel } from '@capsule-ng/caps/label';
import { CapsSwitch } from '@capsule-ng/caps/switch';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEllipsis } from '@ng-icons/lucide';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';

@Component({
	selector: 'spartan-preset-actions',
	imports: [HlmDropdownMenuImports, HlmDialogImports, CapsButton, NgIcon, CapsSwitch, CapsLabel],
	providers: [provideIcons({ lucideEllipsis })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button capsButton variant="secondary" align="end" [hlmDropdownMenuTrigger]="menu" size="icon">
			<ng-icon name="lucideEllipsis" />
		</button>
		<ng-template #menu>
			<hlm-dropdown-menu class="w-56">
				<hlm-dropdown-menu-group>
					<button hlmDropdownMenuItem (click)="contentFilter.click()">
						<span>Content filter preferences</span>
					</button>
					<hlm-dropdown-menu-separator />
					<button hlmDropdownMenuItem variant="destructive" (click)="delete.click()">
						<span>Delete preset</span>
					</button>
				</hlm-dropdown-menu-group>
			</hlm-dropdown-menu>
		</ng-template>
		<hlm-dialog>
			<button id="filter" hlmDialogTrigger class="hidden" #contentFilter>Save</button>
			<hlm-dialog-content class="sm:max-w-[512px]" *hlmDialogPortal="let ctx">
				<hlm-dialog-header>
					<h3 hlmDialogTitle>Content filter preferences</h3>
					<p hlmDialogDescription>
						The content filter flags text that may violate our content policy. It's powered by our moderation endpoint
						which is free to use to moderate your OpenAI API traffic. Learn more.
					</p>
				</hlm-dialog-header>
				<div class="py-6">
					<h4 class="text-muted-foreground text-sm">Playground Warnings</h4>
					<div class="flex items-start justify-between gap-4 pt-3">
						<caps-switch name="show" id="show" [checked]="true" />
						<label capsLabel class="grid gap-1 font-normal" for="show">
							<span class="font-semibold">Show a warning when content is flagged</span>
							<span class="text-muted-foreground text-sm">
								A warning will be shown when sexual, hateful, violent or self-harm content is detected.
							</span>
						</label>
					</div>
				</div>
				<hlm-dialog-footer>
					<button capsButton type="submit" variant="secondary" (click)="ctx.close()">Close</button>
				</hlm-dialog-footer>
			</hlm-dialog-content>
		</hlm-dialog>
		<hlm-dialog>
			<button id="delete" hlmDialogTrigger class="hidden" #delete>Save</button>
			<hlm-dialog-content class="sm:max-w-[512px]" *hlmDialogPortal="let ctx">
				<hlm-dialog-header>
					<h3 hlmDialogTitle>Are you absolutely sure?</h3>
					<p hlmDialogDescription>
						This action cannot be undone. This preset will no longer be accessible by you or others you've shared it
						with.
					</p>
				</hlm-dialog-header>

				<hlm-dialog-footer>
					<button capsButton variant="outline" (click)="ctx.close()">Cancel</button>
					<button capsButton type="submit" variant="destructive" (click)="ctx.close()">Delete</button>
				</hlm-dialog-footer>
			</hlm-dialog-content>
		</hlm-dialog>
	`,
})
export class PresetActions {}
