import { Injectable, signal } from '@angular/core';
import { Style } from '@spartan-ng/styles';

@Injectable({
	providedIn: 'root',
})
export class StyleService {
	public readonly style = signal<Style>('nova');
}
