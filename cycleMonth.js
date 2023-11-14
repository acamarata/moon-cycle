function cycleMonth(date = new Date()) {
	/**
	 * There are 708 images from 001.webp to 708.webp in
	 * the moon monthly (mm) folder.  These are hourly
	 * photos from NASA's 2023 collection which directly
	 * relate to one per hour.  The below function takes
	 * seconds since the last known new moon the figures
	 * number of Synodic months since then to find the
	 * current "hourly phase" for the current cycle of
	 * the moon.  This relates R as always 1-708.
	 */

	const startDate = new Date("2023-11-13T09:27:00Z");
	const synDays = 29.53058821398858;
	const synSecs = synDays * 24 * 60 * 60;

	// X = number of seconds since 2023-11-13T09:27:00Z
	const X = Math.floor((date.getTime() - startDate.getTime()) / 1000);

	// Y = get the number of months since
	const Y = Math.floor(X / synSecs);

	// R = decimal time (minus years) * number of images
	const R = Math.floor(((X / synSecs) - Y) * 708);

	let result = R.toString().padStart(3, '0')+'.webp';
	return result;
}

module.exports = { cycleMonth };
