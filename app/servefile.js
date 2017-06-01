const fs = require('fs');

module.exports = function(res, filename) {

	return new Promise(function(resolve, reject) {

		let read = fs.createReadStream(filename);
		read.pipe(res);
		read.on('end', resolve);
		read.on('error', reject);

	});

}
