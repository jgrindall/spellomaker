"use strict";
var atob = 				require("atob");
var path = 				require('path');
var fs = 				require("fs");
var _ = 				require("underscore");

var EXTENSION = 		".csv";
var NEW_EXTENSION = 	".2quiz";

var Utils = {
	arrayify:function(a){
		return _.isArray(a) ? a : [a];
	},
	isCorrectExtension:function(file){
		return path.extname(file.name) === EXTENSION;
	}
};

module.exports = Utils;


