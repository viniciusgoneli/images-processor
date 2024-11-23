const Sharp = require("./processors/sharp/sharp.js");

function main() {
	const sharp = new Sharp("./input", "./output");

	sharp.resizeImage(229, 356);
}

main();
