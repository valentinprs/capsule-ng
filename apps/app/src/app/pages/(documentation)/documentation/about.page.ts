import type { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { MainSection } from '@spartan-ng/app/app/shared/layout/main-section';
import { SectionIntro } from '@spartan-ng/app/app/shared/layout/section-intro';
import { metaWith } from '@spartan-ng/app/app/shared/meta/meta.util';
import { REPOSITORY_URL } from '../../../../site.config';
export const routeMeta: RouteMeta = {
	data: { breadcrumb: 'About' },
	title: 'Capsule — About',
	meta: metaWith('Capsule — About', 'Angular components and their open-source origins.'),
};
@Component({
	selector: 'spartan-about',
	imports: [MainSection, SectionIntro],
	template: `
		<section spartanMainSection>
			<spartan-section-intro name="About Capsule" lead="An Angular component library with dedicated Capsule APIs." />
			<p class="mt-6">
				Capsule is maintained in its
				<a class="underline" [href]="_repository">GitHub repository</a>
				.
			</p>
			<h2 class="mt-8 text-xl font-semibold">Open-source credits</h2>
			<p class="mt-4">
				Capsule derives from
				<a class="underline" href="https://github.com/spartan-ng/spartan">Spartan</a>
				. Its Brain primitives remain an upstream dependency. Original work is MIT © Robin Goetz and the Spartan
				contributors. Original license and copyright notices are preserved in the repository.
			</p>
			<p class="mt-4">Thanks also to Angular, shadcn/ui and Radix UI for their work on accessible interfaces.</p>
		</section>
	`,
})
export default class AboutPage {
	protected readonly _repository = REPOSITORY_URL;
}
