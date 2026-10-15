# Date Picker

```ts
import { CapsDatePickerImports, provideCapsDatePickerConfig } from '@capsule-ng/caps/date-picker';
import { provideCapsNativeDateAdapter } from '@capsule-ng/caps/calendar';
```

```html
<caps-date-picker [formControl]="birthday" placeholder="Pick a date" />
<caps-date-range-picker [date]="stay ?? undefined" (dateChange)="stay = $event" />
<caps-date-picker-multi [(date)]="days" [maxSelection]="5" />
<caps-month-year-picker [date]="month ?? undefined" (dateChange)="month = $event" />
<caps-date-picker [date]="day ?? undefined" (dateChange)="day = $event">
	<caps-date-picker-trigger>Pick a date</caps-date-picker-trigger>
</caps-date-picker>
```

The API preserves the four typed families and projected trigger/input composition documented by
[Spartan Date Picker](https://www.spartan.ng/components/date-picker), using the installed Brain
contracts. As a Capsule convenience, a root without a projected control owns a native text input. Project a typed input to customize parseDate and
formatInputDate/formatInputDates, or a trigger for selection without typing. Inputs preserve raw
invalid text and commit on blur/Enter; Enter prevents form submission. Configuration providers
retain the four existing typed parser/formatter/transform and auto-close contracts. Calendar
providers configure the native, UTC, Jalali or custom adapter and runtime i18n separately.

Roots preserve date/dateChange and Angular CVA. Empty single/range/month-year inputs use undefined;
their dateChange outputs and CVA values use null when cleared. Multi uses T[] and clears to [].
The explicit bindings above preserve these installed Spartan input/output types.
minDate/maxDate, disabled, align, captionLayout (day calendars), defaultFocusedDate (single/month),
auto-close and multiple cardinality remain available. Capsule additionally forwards existing Calendar dateDisabled,
weekStartsOn and highlightDays inputs on day pickers. Header/footer slots use capsDatePickerHeader/capsDatePickerFooter.
See [the full specification](../../../docs/specs/caps-date-picker.md).
