const fs = require('fs/promises')

const myFileWriter = async (fileName, fileContent) => {
	// write code here
	// dont chnage function name
	const data = await fs.writeFile(`${fileName}`, `${fileContent}`, err => {
		throw new Error("Something went wrong - Unable to create file");
	})
	console.log(`${fileName} created successfully`);
}

const myFileReader = async (fileName) => {
	// write code here
	// dont chnage function name
	const data = await fs.readFile(`${fileName}`, 'utf-8', (err, data) => {
		if (err) throw new Error("Something went wrong - Unable to read file");
	});
	console.log(data);
}


const myFileUpdater = async (fileName, fileContent) => {
	// write code here
	// dont chnage function name
	await fs.appendFile(`${fileName}`, `${fileContent}`, err => {
		throw new Error("Something went wrong - Unable to Update file");
	});
	console.log(`${fileName} updated successfully`)
}

const myFileDeleter = async (fileName) => {
	// write code here
	// dont chnage function name
	await fs.unlink(`${fileName}` , err => {
		throw new Error("Something went wrong - Unable to Delete file");
	});
	console.log(`${fileName} deleted successfully`);
}



module.exports = { myFileWriter, myFileUpdater, myFileReader, myFileDeleter };