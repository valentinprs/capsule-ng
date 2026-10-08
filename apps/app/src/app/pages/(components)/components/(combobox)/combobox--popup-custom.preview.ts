import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsComboboxImports } from '@capsule-ng/caps/combobox';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEarth } from '@ng-icons/lucide';

type Country = {
	code: string;
	value: string;
	label: string;
	continent: string;
	flag: string;
};

@Component({
	selector: 'spartan-combobox-popup-custom-preview',
	imports: [CapsComboboxImports, NgIcon],
	providers: [provideIcons({ lucideEarth })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-combobox>
			<caps-combobox-trigger aria-label="Select a country" class="w-64 justify-between font-normal">
				<caps-combobox-placeholder>
					<ng-icon name="lucideEarth" />
					Select a country
				</caps-combobox-placeholder>
				<ng-template capsComboboxValueTemplate let-value>
					<span>{{ value.flag }} {{ value.label }}</span>
				</ng-template>
			</caps-combobox-trigger>
			<caps-combobox-content>
				<caps-combobox-input showTrigger="false" placeholder="Search" showClear />
				<caps-combobox-empty>No items found.</caps-combobox-empty>

				@for (country of countries; track country.code) {
					<caps-combobox-option [value]="country">{{ country.flag }} {{ country.label }}</caps-combobox-option>
				}
			</caps-combobox-content>
		</caps-combobox>
	`,
})
export class ComboboxPopupCustomPreview {
	public countries: Country[] = [
		{ code: 'af', value: 'afghanistan', label: 'Afghanistan', continent: 'Asia', flag: '🇦🇫' },
		{ code: 'al', value: 'albania', label: 'Albania', continent: 'Europe', flag: '🇦🇱' },
		{ code: 'dz', value: 'algeria', label: 'Algeria', continent: 'Africa', flag: '🇩🇿' },
		{ code: 'ad', value: 'andorra', label: 'Andorra', continent: 'Europe', flag: '🇦🇩' },
		{ code: 'ao', value: 'angola', label: 'Angola', continent: 'Africa', flag: '🇦🇴' },
		{
			code: 'ar',
			value: 'argentina',
			label: 'Argentina',
			continent: 'South America',
			flag: '🇦🇷',
		},
		{ code: 'am', value: 'armenia', label: 'Armenia', continent: 'Asia', flag: '🇦🇲' },
		{ code: 'au', value: 'australia', label: 'Australia', continent: 'Oceania', flag: '🇦🇺' },
		{ code: 'at', value: 'austria', label: 'Austria', continent: 'Europe', flag: '🇦🇹' },
		{ code: 'az', value: 'azerbaijan', label: 'Azerbaijan', continent: 'Asia', flag: '🇦🇿' },
		{
			code: 'bs',
			value: 'bahamas',
			label: 'Bahamas',
			continent: 'North America',
			flag: '🇧🇸',
		},
		{ code: 'bh', value: 'bahrain', label: 'Bahrain', continent: 'Asia', flag: '🇧🇭' },
		{ code: 'bd', value: 'bangladesh', label: 'Bangladesh', continent: 'Asia', flag: '🇧🇩' },
		{
			code: 'bb',
			value: 'barbados',
			label: 'Barbados',
			continent: 'North America',
			flag: '🇧🇧',
		},
		{ code: 'by', value: 'belarus', label: 'Belarus', continent: 'Europe', flag: '🇧🇾' },
		{ code: 'be', value: 'belgium', label: 'Belgium', continent: 'Europe', flag: '🇧🇪' },
		{ code: 'bz', value: 'belize', label: 'Belize', continent: 'North America', flag: '🇧🇿' },
		{ code: 'bj', value: 'benin', label: 'Benin', continent: 'Africa', flag: '🇧🇯' },
		{ code: 'bt', value: 'bhutan', label: 'Bhutan', continent: 'Asia', flag: '🇧🇹' },
		{
			code: 'bo',
			value: 'bolivia',
			label: 'Bolivia',
			continent: 'South America',
			flag: '🇧🇴',
		},
		{
			code: 'ba',
			value: 'bosnia-and-herzegovina',
			label: 'Bosnia and Herzegovina',
			continent: 'Europe',
			flag: '🇧🇦',
		},
		{ code: 'bw', value: 'botswana', label: 'Botswana', continent: 'Africa', flag: '🇧🇼' },
		{ code: 'br', value: 'brazil', label: 'Brazil', continent: 'South America', flag: '🇧🇷' },
		{ code: 'bn', value: 'brunei', label: 'Brunei', continent: 'Asia', flag: '🇧🇳' },
		{ code: 'bg', value: 'bulgaria', label: 'Bulgaria', continent: 'Europe', flag: '🇧🇬' },
		{
			code: 'bf',
			value: 'burkina-faso',
			label: 'Burkina Faso',
			continent: 'Africa',
			flag: '🇧🇫',
		},
		{ code: 'bi', value: 'burundi', label: 'Burundi', continent: 'Africa', flag: '🇧🇮' },
		{ code: 'kh', value: 'cambodia', label: 'Cambodia', continent: 'Asia', flag: '🇰🇭' },
		{ code: 'cm', value: 'cameroon', label: 'Cameroon', continent: 'Africa', flag: '🇨🇲' },
		{ code: 'ca', value: 'canada', label: 'Canada', continent: 'North America', flag: '🇨🇦' },
		{ code: 'cv', value: 'cape-verde', label: 'Cape Verde', continent: 'Africa', flag: '🇨🇻' },
		{
			code: 'cf',
			value: 'central-african-republic',
			label: 'Central African Republic',
			continent: 'Africa',
			flag: '🇨🇫',
		},
		{ code: 'td', value: 'chad', label: 'Chad', continent: 'Africa', flag: '🇹🇩' },
		{ code: 'cl', value: 'chile', label: 'Chile', continent: 'South America', flag: '🇨🇱' },
		{ code: 'cn', value: 'china', label: 'China', continent: 'Asia', flag: '🇨🇳' },
		{
			code: 'co',
			value: 'colombia',
			label: 'Colombia',
			continent: 'South America',
			flag: '🇨🇴',
		},
		{ code: 'km', value: 'comoros', label: 'Comoros', continent: 'Africa', flag: '🇰🇲' },
		{ code: 'cg', value: 'congo', label: 'Congo', continent: 'Africa', flag: '🇨🇬' },
		{
			code: 'cr',
			value: 'costa-rica',
			label: 'Costa Rica',
			continent: 'North America',
			flag: '🇨🇷',
		},
		{ code: 'hr', value: 'croatia', label: 'Croatia', continent: 'Europe', flag: '🇭🇷' },
		{ code: 'cu', value: 'cuba', label: 'Cuba', continent: 'North America', flag: '🇨🇺' },
		{ code: 'cy', value: 'cyprus', label: 'Cyprus', continent: 'Asia', flag: '🇨🇾' },
		{
			code: 'cz',
			value: 'czech-republic',
			label: 'Czech Republic',
			continent: 'Europe',
			flag: '🇨🇿',
		},
		{ code: 'dk', value: 'denmark', label: 'Denmark', continent: 'Europe', flag: '🇩🇰' },
		{ code: 'dj', value: 'djibouti', label: 'Djibouti', continent: 'Africa', flag: '🇩🇯' },
		{
			code: 'dm',
			value: 'dominica',
			label: 'Dominica',
			continent: 'North America',
			flag: '🇩🇲',
		},
		{
			code: 'do',
			value: 'dominican-republic',
			label: 'Dominican Republic',
			continent: 'North America',
			flag: '🇩🇴',
		},
	];
}
