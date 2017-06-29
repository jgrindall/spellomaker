"use strict";

var _ =                 			require("underscore");
var Promise =           			require("bluebird");
var Deferred =          			require("../utils/Deferred");
var SpellingOutput = 				require("../SpellingOutput");
var SpellingQuestionMaker = 		require("./SpellingQuestionMaker");
var Utils =      					require("../utils/Utils");
var fs = 							require("fs");
var path = 							require("path");
var CategoryXML = 					require("./CategoryXML");
var AppXML = 						require("./AppXML");
var csv = 							require('csvtojson');
var iconvlite =						require('iconv-lite');

var SpellingParser = function(){
	
};

SpellingParser.prototype.makeCategoryXML = function(){
	return Promise.resolve(CategoryXML.getXML(this.year));
};

SpellingParser.prototype.makeAllFiles = function(str){
	return Promise.all([
		this.makeCategoryXML(this.year),
		this.makeApps(str),
		Promise.resolve({"year":this.year})
	]);
};

SpellingParser.prototype.makeApps = function(str){
	var apps = [], deferred = new Deferred();
	this.makeQuizFiles(str)
	.then(function(data){
		_.each(data, function(file){
			var dictationFileName = "Year{{YEAR}}{{TERM}}Week{{WEEK}}Dictations.pdf";
			file.row.year = file.row.year.replace(/\s/g,'').trim();
			file.row.term = file.row.term.replace(/\s/g,'').trim();
			dictationFileName = dictationFileName
			.replace(/{{YEAR}}/g, file.row.year)
		    .replace(/{{TERM}}/g, file.row.term)
		    .replace(/{{WEEK}}/g, file.row.week);
			var printableFileName = "Year{{YEAR}}{{TERM}}Week{{WEEK}}LSCWC.pdf";
			printableFileName = printableFileName
			.replace(/{{YEAR}}/g, file.row.year)
		    .replace(/{{TERM}}/g, file.row.term)
		    .replace(/{{WEEK}}/g, file.row.week);
			apps.push({
				"quiz":{
					"fileName":file.name,
					"fileContents":file.json,
					"install":AppXML.getQuiz(file.row),
					"inc":[
						"img/quiz_wk" + file.row.week + "_help-en_gb.png",
						"img/quiz_wk" + file.row.week + "_icon-en_gb.png"
					]
				},
				"dictation":{
					"install":AppXML.getDictation(file.row),
					"fileName":dictationFileName,
					"inc":[
						"img/Wk" + file.row.week + "_Dictation_help-en_gb.png",
						"img/Wk" + file.row.week + "_Dictation_icon-en_gb.png",
						"pdf/Year" + file.row.year + file.row.term + "Week" + file.row.week + "Dictations.pdf"
					]
				},
				"printable":{
					"install":AppXML.getPrintable(file.row),
					"fileName":printableFileName,
					"inc":[
						"img/Wk" + file.row.week + "_LSCWC_help-en_gb.png",
						"img/Wk" + file.row.week + "_LSCWC_icon-en_gb.png",
						"pdf/Year" + file.row.year + file.row.term + "Week" + file.row.week + "LSCWC.pdf"
					]
				}
			});
		});
		deferred.resolve(apps);
	});
	return deferred.promise;
};

SpellingParser.prototype.makeQuizFiles = function(str){
	var _this = this;
	this.files = [];
	var deferred = new Deferred();
	console.log("STR", str);
	csv().fromString(str)
	.on('json', function(row){
		console.log(row);
		var data = SpellingQuestionMaker.make(row);
		if(data){
			_this.files.push(data);
		}
	})
	.on('done', function(){
		console.log("DONE");
		return deferred.resolve(_this.files);
	});
	return deferred.promise;
};

var _readFileSync_encoding = function(filename, encoding) {
	var content = fs.readFileSync(filename);
	return iconvlite.decode(content, encoding);
};

SpellingParser.prototype.parseCSV = function(csvFile, options){
	var str;
	this.year = parseInt(csvFile.name.match(/[0-9]+/g)[0], 10);
	if(_.range(1, 7).indexOf(this.year) === -1){
		return Promise.reject("unable to get year");
	}
	str = _readFileSync_encoding(csvFile.path, "utf8");
	try{
		if(options && options.jsononly){
			return this.makeQuizFiles(str);
		}
		else{
			return this.makeAllFiles(str);
		}
	}
	catch(e){
		console.log(e);
		console.log("failed to parse", csvFile);
	}
	return Promise.reject("unable to parse csv??");
};

module.exports = SpellingParser;
