const crypto = require('crypto');


const random = function() {
	return new Promise(function(resolve, reject) {

		let buf = new Buffer(1);
		crypto.randomFill(buf, (err) => {
			if(err) return reject(err);
			resolve(buf.readUInt8(0));
		});

	});
}


module.exports = function(amount, sides) {

	return new Promise(async function(resolve, reject) {

		let output = [];

		for(let i = 0; i < amount; i++){
			let result = await random();
			result = (result % (sides)) + 1;
			output.push(result);
		}

		resolve(output);

	});
}
