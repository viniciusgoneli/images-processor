const sharp = require("sharp");
const fsUtils = require("../../utils/fsUtils.js");
const path = require("path");

class Sharp {
	inputPath;
	outputPath;

	constructor(inputPath, outputPath) {
		this.inputPath = path.resolve(inputPath);
		this.outputPath = path.resolve(outputPath);
	}

	_validateFormat(fileName) {
		const allowedFormats = /.png|.webp|.jpg/g;

		return allowedFormats.test(fileName);
	}

	async resizeImage(width, height) {
		const outputWithTimestamp =
			await fsUtils.createFolderInPathWithTimestampName(
				this.outputPath
			);

		const filesNames = fsUtils.getFilesNamesInDirectory(this.inputPath);

		console.log(filesNames);

		try {
			for (const fn of filesNames) {
				if (!this._validateFormat(fn)) {
					continue;
				}

				await sharp(path.join(this.inputPath, fn))
					.resize(width, height)
					.toFile(path.join(outputWithTimestamp, fn));
			}
		} catch (error) {
			console.error("Erro ao redimensionar a imagem:", error);
		}
	}
}

module.exports = Sharp;
