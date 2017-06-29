/* not stricty because of the weird octal thing */

var _ = 				require("underscore");
var archiver = 			require('archiver');
var fs = 				require("fs");
var path = 				require('path');

var _removeWhiteSpace = function(str){
	return str.replace(/\s/g,'').trim(); 
};

var _removeFile = function(filePath){
	if(!fs.existsSync(filePath)){
		return;
	}
	if (fs.statSync(filePath).isFile()){
		fs.unlinkSync(filePath);
	}
};

var _forceRemoveDir = function(path){
	var rm = function(dirPath){
		var files = null;
		try {
			files = fs.readdirSync(dirPath);
		}
		catch(e) {
			return;
		}
		if (files && files.length > 0){
		  	for (var i = 0; i < files.length; i++) {
				var filePath = dirPath + '/' + files[i];
				if (fs.statSync(filePath).isFile()){
					fs.unlinkSync(filePath);
				}
				else{
					// directory
					rm(filePath);
				}
		  	}
		}
		fs.rmdirSync(dirPath);
	};
	rm(path);
};

var _copySync = function(from, to) {
	if(fs.existsSync(from)){
		fs.writeFileSync(to, fs.readFileSync(from));
	}
	else{
		console.log("not found", from);
	}
};

var _cleanUp = function(fileName){
	_forceRemoveDir("./tmp");
	fs.mkdirSync("./tmp");
	fs.mkdirSync("./tmp/applications");
};

var _outputJSONOnly = function(res, file, data, archive, output){
	_.each(data, function(app){
		archive.append(JSON.stringify(app.json, null, 2), { name: app.name });
	});
	archive.finalize();
	archive.pipe(output);
};

var _outputZIP = function(res, file, data, archive, output){
	var categoryXML = data[0];
	var appData = data[1];
	// create the category stuff
	console.log("add category");
	archive.append(categoryXML, { name: 'install.xml' });
	archive.append(fs.createReadStream("./inc/img/spelling-_year_1_help-en_gb.png"), { name: 'spelling-_year_1_help-en_gb.png' });
	archive.append(fs.createReadStream("./inc/img/spelling-_year_1_icon-en_gb.png"), { name: 'spelling-_year_1_icon-en_gb.png' });
	// create the applications in the tmp folder
	console.log("add", appData.length, "apps to the tmp folder");
	_.each(appData, function(app){
		var dirName;
		if(app.quiz){
			dirName = "./tmp/applications/" + app.quiz.fileName.split(".")[0];
			fs.mkdirSync(dirName);
			fs.writeFileSync(dirName + "/" + app.quiz.fileName, JSON.stringify(app.quiz.fileContents, null, 2), 'utf8');
			fs.writeFileSync(dirName + "/install.xml", app.quiz.install, 'utf8');
			_.each(app.quiz.inc, function(filename){
				_copySync("./inc/" + filename, dirName + "/" + _.last(filename.split("/")));
			});
		}
		if(app.dictation){
			dirName = "./tmp/applications/" + app.dictation.fileName.split(".")[0]; 
			fs.mkdirSync(dirName);
			fs.writeFileSync(dirName + "/install.xml", app.dictation.install, 'utf8');
			_.each(app.dictation.inc, function(filename){
				_copySync("./inc/" + filename, dirName + "/" + _.last(filename.split("/")));
			});
		}
		if(app.printable){
			dirName = "./tmp/applications/" + app.printable.fileName.split(".")[0]; 
			fs.mkdirSync(dirName);
			fs.writeFileSync(dirName + "/install.xml", app.printable.install, 'utf8');
			_.each(app.printable.inc, function(filename){
				_copySync("./inc/" + filename, dirName + "/" + _.last(filename.split("/")));
			});
		}
	});
	console.log("now add the entire tmp/application folder");
	//add the entire folder
	archive.directory('./tmp/applications/', './applications');
	archive.finalize();
	archive.pipe(output);
};

module.exports = {
	"output":function(res, file, options, data){
		var date = new Date().toJSON(), fileName, output, archive;
		date = ("" + date).replace(/:/g, '_');
		date = ("" + date).replace(/\./g, '_');
		fileName = file.name.split(".")[0].replace(/\s/g,'').trim() + "_" + date + ".zip";
		output = fs.createWriteStream(fileName);
		archive = archiver('zip', {store: true});
		_cleanUp(fileName);
		output.on('close', function() {
			res.set("Content-Disposition", "attachment;filename=" + fileName);
			res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
			return res.download(fileName, fileName); 
		});
		archive.on('error', function(err) {
		  	throw err;
		});
		if(options && options.jsononly){
			_outputJSONOnly(res, file, data, archive, output);
		}
		else{
			_outputZIP(res, file, data, archive, output);
		}
	},
	"error":function(res){
		res.writeHead(200, {'content-type': 'application/force-download','Content-disposition':'attachment; filename=error.txt'});
		res.write("error");
		res.end();
	}
};


