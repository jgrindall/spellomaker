"use strict";

var _ =                 			require("underscore");
var Promise =           			require("bluebird");
var Deferred =          			require("../utils/Deferred");
var SpellingOutput = 				require("../SpellingOutput");
var SpellingQuestionMaker = 		require("./SpellingQuestionMaker");
var Utils =      					require("../utils/Utils");
var fs = 							require("fs");
var path = 							require("path");
var csv = 							require('csvtojson');
var iconvlite =						require('iconv-lite');

var SpellingParser = function(){
	
};

SpellingParser.prototype.makeFiles = function(str){
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
	var str, json;
	str = _readFileSync_encoding(csvFile.path, "utf8");
	try{
		return this.makeFiles(str);
	}
	catch(e){
		console.log(e);
		console.log("failed to parse", csvFile);
	}
	return Promise.reject("unable to parse csv??");
};

module.exports = SpellingParser;
