import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsLabelImports } from '@capsule-ng/caps/label';

@Component({
	selector: 'spartan-card-edge-to-edge',
	imports: [CapsCardImports, CapsLabelImports, CapsInputImports, CapsButtonImports],
	host: { class: 'w-full max-w-md' },
	template: `
		<caps-card maxWidth="sm" class="mx-auto">
			<caps-card-header>
				<caps-card-title [level]="3">Terms of Service</caps-card-title>
				<caps-card-description>Review the terms before accepting the agreement.</caps-card-description>
			</caps-card-header>

			<caps-card-content class="-mb-(--card-spacing)">
				<div
					tabindex="0"
					role="region"
					aria-label="Terms of service"
					class="bg-muted/50 -mx-(--card-spacing) max-h-48 space-y-4 overflow-y-scroll border-t px-(--card-spacing) py-4 text-sm leading-relaxed"
				>
					<p>
						These terms govern your use of the workspace, including access to shared documents, project files, and
						collaboration tools.
					</p>
					<p>
						You are responsible for the content you upload and for ensuring that your team has the appropriate
						permissions to view or edit it.
					</p>
					<p>
						We may update features or limits as the service evolves. When those changes materially affect your workflow,
						we will notify your workspace administrators.
					</p>
					<p>
						By continuing, you agree to keep your account credentials secure and to follow your organization&apos;s
						acceptable use policies.
					</p>
				</div>
			</caps-card-content>

			<caps-card-footer class="justify-end gap-2 pt-(--card-spacing)">
				<button capsButton variant="outline">Decline</button>
				<button capsButton>Accept</button>
			</caps-card-footer>
		</caps-card>
	`,
})
export class CardEdgeToEdge {}
