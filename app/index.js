const xml = require('xml');

const roll = require('./rolldice');
const serve = require('./servefile');

module.exports = async function(req, res) {

	let diceSides = 6;
	let diceAmount = 1;
	let responseType = 'json';


	if(req.url === '/'){
		await serve(res, './index.html');
		return;
	}

	let url = req.url.substr(1);

	if(url.indexOf('.') !== -1){
		responseType = url.split('.')[1];

		if(responseType !== 'json' && responseType !== 'xml'){
			res.statusCode = 404;
			return '';
		}

		url = url.substr(0, url.indexOf('.'));
	}

	if(url.indexOf('d') === -1){
		res.statusCode = 404;
		return '';
	}

	url = url.split('d');


	if(url[0] !== ''){
		url[0] = parseInt(url[0]);

		if(isFinite(url[0]) && url[0] > 0 && url[0] < 101)
			diceAmount = url[0];
	}

	if(url[1] !== ''){
		url[1] = parseInt(url[1]);

		if(isFinite(url[1]) && url[1] > 1 && url[1] < 101)
			diceSides = url[1];
	}


	let results = await roll(diceAmount, diceSides);

	let output;

	if(responseType === 'xml'){
		results = {
			rolls: results.map((i, k) => {
				return {roll: i};
			})
		};
		output = xml(results);
		res.writeHead(200, {'Content-Type': 'text/xml'});

	}else{
		output = JSON.stringify({rolls: results});
		res.writeHead(200, {'Content-Type': 'application/json'});
	}

	res.write(output);
	res.end();

}
