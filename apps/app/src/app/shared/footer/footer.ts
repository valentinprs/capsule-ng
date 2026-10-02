import { Component } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { hlmMuted } from '@spartan-ng/helm/typography';
import { REPOSITORY_URL } from '../../../site.config';

@Component({
	selector: 'spartan-footer',
	imports: [HlmButton],
	host: {
		class: 'block px-4 py-6',
	},
	template: `
		<footer class="${hlmMuted} mx-auto max-w-screen-xl text-center text-sm">
			Capsule — source available to repository members on
			<a class="h-6 px-0.5 text-sm" hlmBtn href="${REPOSITORY_URL}" target="_blank" variant="link">GitHub.</a>
		</footer>
	`,
})
export class Footer {}
