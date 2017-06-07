var express = 			require("express");
var formidable =	 	require("formidable");
var _ = 				require("underscore");
var Promise =           require("bluebird");
var path =           	require("path");
var Utils = 			require("./utils/Utils");
var SpellingOutput =    require("./SpellingOutput");
var SpellingParser = 	require("./spelling/SpellingParser");
var AdmZip = 			require('adm-zip');
var app = 				express();
var port = 				Number(process.env.PORT || 5000);

app.configure(function(){
	app.use(express.static(__dirname + "/public"));
});

app.post('/upload', function(req, res) {
	var form = new formidable.IncomingForm();
	form.multiples = true;
	form.parse(req, function(err, fields, files) {
		var filesArray = _.filter(Utils.arrayify(files.upload), Utils.isCorrectExtension);
		if(!filesArray || filesArray.length !== 1){
			res.status(500);
			res.send('Errrrrr I didnt get any csv files!');
		}
		else{
			new SpellingParser()
			.parseCSV(filesArray[0])
			.then(_.partial(SpellingOutput.output, res))
			.catch(function(){
				res.status(500);
				res.send('An error occurred sorry. Dunno what exactly.');
			});
		}
    });
});

app.get('/', function(req, res) {
	app.render(res, "public/src/index.html");
});

app.listen(port, function() {
   console.log("Listening on " + port);
});

