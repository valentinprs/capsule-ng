import { Component, computed, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsLabelImports } from '@capsule-ng/caps/label';
import { HlmToggleGroupImports } from '@spartan-ng/helm/toggle-group';

@Component({
	selector: 'spartan-card-spacing',
	imports: [CapsCardImports, CapsLabelImports, CapsInputImports, CapsButtonImports, HlmToggleGroupImports],
	host: { class: 'w-full max-w-md grid gap-4' },
	template: `
		<hlm-toggle-group type="single" size="sm" variant="outline" spacing="2" [(value)]="spacing">
			@for (space of spacingOptions; track $index) {
				<button hlmToggleGroupItem [value]="space.value" [aria-label]="'Toggle ' + space.label">
					{{ space.label }}
				</button>
			}
		</hlm-toggle-group>

		<caps-card class="w-full max-w-sm" [class]="spacingClass()">
			<caps-card-header>
				<caps-card-title [level]="3">Login to your account</caps-card-title>
				<caps-card-description>Enter your email below to login to your account</caps-card-description>

				<caps-card-action>
					<button capsButton variant="link">Sign Up</button>
				</caps-card-action>
			</caps-card-header>

			<caps-card-content>
				<form id="login-form">
					<div class="flex flex-col gap-6">
						<div class="grid gap-2">
							<label capsLabel for="email">Email</label>
							<input type="email" id="email" placeholder="m@example.com" required capsInput />
						</div>

						<div class="grid gap-2">
							<div class="flex items-center">
								<label capsLabel for="password">Password</label>
								<a href="#" class="ml-auto inline-block text-sm underline-offset-4 hover:underline">
									Forgot your password?
								</a>
							</div>
							<input type="password" id="password" capsInput />
						</div>
					</div>
				</form>
			</caps-card-content>

			<caps-card-footer class="flex-col gap-2">
				<button capsButton type="submit" class="w-full" form="login-form">Login</button>
				<button capsButton variant="outline" class="w-full">Login with Google</button>
			</caps-card-footer>
		</caps-card>
	`,
})
export class CardSpacing {
	public readonly spacing = signal('4');
	public readonly spacingOptions = [
		{
			className: '[--card-spacing:--spacing(4)]',
			label: '16px',
			value: '4',
		},
		{
			className: '[--card-spacing:--spacing(5)]',
			label: '20px',
			value: '5',
		},
		{
			className: '[--card-spacing:--spacing(6)]',
			label: '24px',
			value: '6',
		},
		{
			className: '[--card-spacing:--spacing(8)]',
			label: '32px',
			value: '8',
		},
	];

	public readonly spacingClass = computed(
		() => this.spacingOptions.find((option) => option.value === this.spacing())?.className,
	);
}
