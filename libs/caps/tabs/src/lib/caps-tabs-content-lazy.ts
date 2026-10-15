import { Directive } from '@angular/core';
import { BrnTabsContentLazy } from '@spartan-ng/brain/tabs';

/** Instantiate on first activation, then keep the view alive until the panel is destroyed. */
@Directive({ selector: 'ng-template[capsTabsContentLazy]', hostDirectives: [BrnTabsContentLazy] })
export class CapsTabsContentLazy {}
