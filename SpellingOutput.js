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
	// clean up
	//console.log("cleanup", fileName);
	//_removeFile(fileName);
	_forceRemoveDir("./tmp");
	fs.mkdirSync("./tmp");
	fs.mkdirSync("./tmp/applications");
};

module.exports = {
	"output":function(res, file, data){
		var categoryXML = data[0];
		var appData = data[1];
		var date = new Date().toJSON();
		date = ("" + date).replace(/:/g, '_');
		date = ("" + date).replace(/\./g, '_');
		var fileName = file.name.split(".")[0].replace(/\s/g,'').trim() + "_" + date + ".zip";
		console.log(fileName);
		var output = fs.createWriteStream(fileName);
		var archive = archiver('zip', {store: true});
		_cleanUp(fileName);
		output.on('close', function() {
			console.log("close");
		  	res.set("Content-Disposition", "attachment;filename=" + fileName);
			res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
			console.log("download", fileName);
			return res.download(fileName, fileName); 
		});
		archive.on('error', function(err) {
		  	throw err;
		});
		// create the category stuff
		console.log("add category");
		archive.append(categoryXML, { name: 'install.xml' });
		archive.append(fs.createReadStream("./inc/img/spelling-_year_1_help-en_gb.png"), { name: 'spelling-_year_1_help-en_gb.png' });
		archive.append(fs.createReadStream("./inc/img/spelling-_year_1_icon-en_gb.png"), { name: 'spelling-_year_1_icon-en_gb.png' });
		// create the applications in the tmp folder
		_.each(appData, function(app){
			var dirName;
			console.log("add app");
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
		console.log("add application folder");
		//add the entire folder
		archive.directory('./tmp/applications/', './applications');
		archive.finalize();
		archive.pipe(output);
	},
	"error":function(res){
		res.writeHead(200, {'content-type': 'application/force-download','Content-disposition':'attachment; filename=error.txt'});
		res.write("error");
		res.end();
	}
};


