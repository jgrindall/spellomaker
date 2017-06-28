/* not stricty because of the weird octal thing */

var _ = 				require("underscore");
var AdmZip = 			require('adm-zip');
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

var _cleanUp = function(){
	// clean up
	_removeFile("all.zip");
	_forceRemoveDir("./tmp");
	fs.mkdirSync("./tmp");
	fs.mkdirSync("./tmp/applications");
};

module.exports = {
	"output":function(res, data){
		_cleanUp();
		var output = fs.createWriteStream('all.zip');
		var archive = archiver('zip', {store: true});
		output.on('close', function() {
		  	res.set("Content-Disposition", "attachment;filename=all.zip");
			res.setHeader('Content-disposition', 'attachment; filename=all.zip');
			return res.download("all.zip", "all.zip"); 
		});
		archive.on('error', function(err) {
		  	throw err;
		});
		var categoryXML = data[0];
		var appData = data[1];
		// create the category stuff
		archive.append(categoryXML, { name: 'install.xml' });
		archive.append(fs.createReadStream("./inc/img/spelling-_year_1_help-en_gb.png"), { name: 'spelling-_year_1_help-en_gb.png' });
		archive.append(fs.createReadStream("./inc/img/spelling-_year_1_icon-en_gb.png"), { name: 'spelling-_year_1_icon-en_gb.png' });
		// create the applications in the tmp folder
		_.each(appData, function(app, N){
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





/***

var archiver = require('archiver');
 
// create a file to stream archive data to. 
var output = fs.createWriteStream(__dirname + '/example.zip');
var archive = archiver('zip', {
    store: true // Sets the compression method to STORE. 
});
 
output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});
 
archive.on('error', function(err) {
  throw err;
});
 
archive.pipe(output);
 
// append a file from stream 
var file1 = __dirname + '/file1.txt';
archive.append(fs.createReadStream(file1), { name: 'file1.txt' });
 
// append a file from string 
archive.append('string cheese!', { name: 'file2.txt' });
 
// append a file from buffer 
var buffer3 = new Buffer('buff it!');
archive.append(buffer3, { name: 'file3.txt' });
 
// append a file 
archive.file('file1.txt', { name: 'file4.txt' });
 
// append files from a directory 
archive.directory('subdir/');
 
// append files from a glob pattern 
archive.glob('subdir/*.txt');
 
// finalize the archive (ie we are done appending files but streams have to finish yet) 
archive.finalize();


***/






