
# moon-cycle

Simple functions to map a Date() to the current lunar phase and map that to hourly photos of the moon during that phase from NASA.

Yearly takes the full photos for all of 2023 (8760 images) while Monthly take only the cycle starting from November 13 (708 images).

The images have been organized, named, converted to webp, and optimized according to the following structure:
- "mm" (moon monthly) vs "my" (moon yearly)
- "256" (256x256 size) vs "512" (512x512 size)
- "75" (lower quality) vs "85" (higher quality)

## Installation

The images in this project make it too big for npm, so recommended usage is below.

## Usage

Copy any of the mm or my folders (or both) to your projects "public" directory.  Then use as follows:

```js
const { cycleMonth, cycleYear } = require('moon-cycle');

const date = new Date();

// Get results
const mm = cycleMonth(date)
const my = cycleYear(date)

// Print results
console.log(`\nDate = ${date.toISOString()}\nMatch Moon Image URLs to Date..\n`)
console.log(`MM = /mm/${mm}`);
console.log(`MY = /my/${my}`);


```

Exported functions include cycleMonth and cycleYear

### Parameters:

- result: name of the monthly or yearly webp file

## Contributing

Contributions are welcome!

## License

ISC License
