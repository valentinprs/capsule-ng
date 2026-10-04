import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsDialogImports } from '@capsule-ng/caps/dialog';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSwitch } from '@capsule-ng/caps/switch';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEllipsis } from '@ng-icons/lucide';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';

@Component({
	selector: 'spartan-preset-actions',
	imports: [HlmDropdownMenuImports, CapsDialogImports, CapsButton, NgIcon, CapsSwitch, CapsFieldImports],
	providers: [provideIcons({ lucideEllipsis })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button
			capsButton
			variant="secondary"
			align="end"
			[hlmDropdownMenuTrigger]="menu"
			size="icon"
			aria-label="Preset actions"
		>
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
		<caps-dialog>
			<button id="filter" capsDialogTrigger class="hidden" #contentFilter>Save</button>
			<ng-template capsDialogContent let-ctx class="sm:max-w-[512px]">
				<caps-dialog-header>
					<caps-dialog-title>Content filter preferences</caps-dialog-title>
					<caps-dialog-description>
						The content filter flags text that may violate our content policy. It's powered by our moderation endpoint
						which is free to use to moderate your OpenAI API traffic. Learn more.
					</caps-dialog-description>
				</caps-dialog-header>
				<div class="py-6">
					<h4 class="text-muted-foreground text-sm">Playground Warnings</h4>
					<caps-field orientation="horizontal" class="pt-3">
						<caps-switch name="show" [checked]="true" />
						<caps-field-content>
							<caps-field-label>Show a warning when content is flagged</caps-field-label>
							<caps-field-description>
								A warning will be shown when sexual, hateful, violent or self-harm content is detected.
							</caps-field-description>
						</caps-field-content>
					</caps-field>
				</div>
				<caps-dialog-footer>
					<button capsButton type="submit" variant="secondary" (click)="ctx.close()">Close</button>
				</caps-dialog-footer>
			</ng-template>
		</caps-dialog>
		<caps-dialog>
			<button id="delete" capsDialogTrigger class="hidden" #delete>Save</button>
			<ng-template capsDialogContent let-ctx class="sm:max-w-[512px]">
				<caps-dialog-header>
					<caps-dialog-title>Are you absolutely sure?</caps-dialog-title>
					<caps-dialog-description>
						This action cannot be undone. This preset will no longer be accessible by you or others you've shared it
						with.
					</caps-dialog-description>
				</caps-dialog-header>

				<caps-dialog-footer>
					<button capsButton variant="outline" (click)="ctx.close()">Cancel</button>
					<button capsButton type="submit" variant="destructive" (click)="ctx.close()">Delete</button>
				</caps-dialog-footer>
			</ng-template>
		</caps-dialog>
	`,
})
export class PresetActions {}
