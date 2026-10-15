# Calendar

```ts
import { CapsCalendarImports, provideCapsCalendarI18n } from '@capsule-ng/caps/calendar';
```

```html
<caps-calendar [(date)]="day" [min]="min" [max]="max" [dateDisabled]="isWeekend" />
<caps-calendar-multi [(date)]="days" [minSelection]="1" [maxSelection]="5" />
<caps-calendar-range [(startDate)]="start" [(endDate)]="end" />
<caps-month-year-calendar [(date)]="month" view="month" />
```

All dates use the injected date adapter. Native, UTC, Jalali and custom adapters remain supported
through the re-exported Capsule providers. I18n supports runtime `use()` and custom weekday,
month/year, navigation labels and first day of week. `captionLayout` accepts label, dropdown,
dropdown-months and dropdown-years. Consumers can customize `class`; internal structure is owned.
See [the complete specification](../../../docs/specs/caps-calendar.md).

Multiple selection starts a fresh list when `maxSelection` is reached; `minSelection` prevents
removing the last required day. Disabled dates block navigation to that date instead of being skipped.
