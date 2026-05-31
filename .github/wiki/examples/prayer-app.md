# Prayer App Integration

Displaying the current moon phase alongside Islamic prayer times is a natural pairing. `moon-cycle` maps the current date to the correct NASA image; [pray-calc](https://github.com/acamarata/pray-calc) computes the prayer schedule for the same moment.

## React component

```tsx
import { cycleMonth, cdnUrl } from 'moon-cycle';
import { getPrayerTimes } from 'pray-calc';

interface PrayerCardProps {
  date: Date;
  latitude: number;
  longitude: number;
  timezone: string;
}

function PrayerCard({ date, latitude, longitude, timezone }: PrayerCardProps) {
  const filename = cycleMonth(date);
  const moonUrl = cdnUrl(filename, 'mm', 256, 75);

  const times = getPrayerTimes({ date, latitude, longitude, timezone });

  return (
    <div className="prayer-card">
      <img src={moonUrl} alt="Current moon phase" width={128} height={128} />
      <ul>
        <li>Fajr: {times.fajr}</li>
        <li>Dhuhr: {times.dhuhr}</li>
        <li>Asr: {times.asr}</li>
        <li>Maghrib: {times.maghrib}</li>
        <li>Isha: {times.isha}</li>
      </ul>
    </div>
  );
}
```

## Plain JavaScript

```js
import { cycleMonth, cdnUrl } from 'moon-cycle';

const date = new Date();
const filename = cycleMonth(date);
const moonUrl = cdnUrl(filename, 'mm', 256, 75);

// Inject into an existing img element
document.getElementById('moon-img').src = moonUrl;
```

## Pinning to a stable image set

If you want the moon image to stay consistent across deploys, pin the CDN reference to a specific release tag:

```ts
const url = cdnUrl(filename, 'mm', 256, 75, 'v2.0.0');
```

## Choosing the right dataset

For a prayer app, the monthly dataset (`'mm'`) is generally the better choice. It reflects the current phase of the synodic cycle, which corresponds to the Islamic lunar calendar month. The yearly dataset (`'my'`) is better when you want to show the actual NASA photograph for today's date in 2023 imagery.

## See Also

- [pray-calc](https://github.com/acamarata/pray-calc): Islamic prayer times library
- [Basic Usage](basic-usage) — other usage patterns
- [API Reference](../API-Reference) — full function documentation
