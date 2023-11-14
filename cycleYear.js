function cycleYear(date = new Date()) {
	/**
	 * There are 8760 images from 0001.webp to 8760.webp
	 * in the moon yearly (my) folder.  These are hourly
	 * photos from NASA's 2023 collection which directly
	 * relate to one per hour.  The below function takes
	 * hours (seconds / 3600) and maps directly to these
	 * 8760 images in the folders.  The last calculation
	 * below rounds the cycle so R is always 1-8760.
	 */

	const startDate = new Date("2023-01-01T00:00:00Z");

	// X = number of seconds since 2023-01-01T00:00:00Z
	const X = Math.floor((date.getTime() - startDate.getTime()) / 1000);

	// Y = convert to number of hours since
	const Y = Math.floor(X / 3600);

	// Z = get the number of years since
	const Z = Math.floor(Y / 8760);

	// R = decimal time (minus years) * number of images
	const R = Math.floor(((Y / 8760) - Z) * 8760);

	let result = R.toString().padStart(4, '0')+'.webp';
	return result;
}

module.exports = { cycleYear };
