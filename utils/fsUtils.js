const fs = require("fs");
const path = require("path");

async function createFolderInPathWithTimestampName(sourcePath) {
	try {
		const now = new Date();

		const timezoneOffset = now.getTimezoneOffset() * 60000;

		const localTime = new Date(now.getTime() - timezoneOffset)
			.toISOString()
			.replace(/:/g, ".")
			.slice(0, 19);

		const folderPath = path.join(sourcePath, localTime);

		await fs.promises.mkdir(folderPath, { recursive: true });

		return folderPath;
	} catch (error) {
		console.error(`Erro ao criar a pasta: ${error.message}`);
	}
}

const getFilesNamesInDirectory = (directoryPath) => {
	try {
		const files = fs.readdirSync(directoryPath);

		const filesNames = files.filter((file) => {
			const filePath = path.join(directoryPath, file);
			return fs.statSync(filePath).isFile(); // Verifica se é um arquivo
		});

		return filesNames;
	} catch (error) {
		console.error("Erro ao ler o diretório:", error.message);
	}
};

module.exports = {
	createFolderInPathWithTimestampName,
	getFilesNamesInDirectory,
};
