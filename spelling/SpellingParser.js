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
var csv = 							require('csvtojson');
var iconvlite =						require('iconv-lite');

var SpellingParser = function(){
	
};

SpellingParser.prototype.makeCategoryXML = function(year){
	return Promise.resolve(CategoryXML.getXML(year));
};

SpellingParser.prototype.makeAllFiles = function(str, year){
	var appXML = [];
	var deferred = new Deferred();
	this.makeQuizFiles(str)
	.then(function(files){
		_.each(files, function(file){
			console.log(file);
			appXML.push("<test>");
		});
	});
	return Promise.all([
		this.makeCategoryXML(year),
		this.makeAppXMLS(str),
		this.makeQuizFiles(str)
	]);
};

SpellingParser.prototype.makeAppXMLS

SpellingParser.prototype.makeQuizFiles = function(str){
	var _this = this;
	this.files = [];
	var deferred = new Deferred();
	csv().fromString(str)
	.on('json', function(row){
		var data = SpellingQuestionMaker.make(row);
		if(data){
			_this.files.push(data);
		}
	})
	.on('done', function(){
		return deferred.resolve(_this.files);
	});
	return deferred.promise;
};

var _readFileSync_encoding = function(filename, encoding) {
	var content = fs.readFileSync(filename);
	return iconvlite.decode(content, encoding);
};

SpellingParser.prototype.parseCSV = function(csvFile){
	var str, json, year;
	year = parseInt(csvFile.name.match(/[0-9]+/g)[0], 10);
	if(_.range(1, 7).indexOf(year) === -1){
		return Promise.reject("unable to get year");
	}
	str = _readFileSync_encoding(csvFile.path, "utf8");
	try{
		return this.makeAllFiles(str, year);
	}
	catch(e){
		console.log(e);
		console.log("failed to parse", csvFile);
	}
	return Promise.reject("unable to parse csv??");
};

module.exports = SpellingParser;
