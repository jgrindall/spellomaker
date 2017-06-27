/* not stricty because of the weird octal thing */

var _ = 				require("underscore");
var AdmZip = 			require('adm-zip');
var fs = 				require("fs");
var path = 				require('path');

var _removeWhiteSpace = function(str){
	return str.replace(/\s/g,'').trim(); 
};

module.exports = {
	"output":function(res, categoryXML, appXMLs, quizFiles){
		console.log(categoryXML);
		console.log(quizFiles);
		res.writeHead(200);
		res.write("ok");
		res.end();
		
		
		return;
		var zip = new AdmZip();
		console.log("zip #= ", files.length);
		_.each(files, function(file, i){
			file.name = _removeWhiteSpace(file.name);
			try{
				zip.addFile(file.name, new Buffer(JSON.stringify(file.json, null, 2)), file.name, 0400);
			}
			catch(e){s
				console.log("failed", e, e.message, e.stack);
			}
		});
		var buffer = zip.toBuffer();
		res.setHeader('Content-disposition', 'attachment; filename=quiz.zip');
		return res.send(200, buffer);
	},
	"error":function(res){
		res.writeHead(200, {'content-type': 'application/force-download','Content-disposition':'attachment; filename=error.txt'});
		res.write("error");
		res.end();
	}
};












