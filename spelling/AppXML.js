"use strict";

var DICTATION = '<?xml version="1.0" encoding="UTF-8"?>'
+ '<plugin>'
+ '<name>Spelling_Y{{YEAR}}_{{TERM}}_Week{{WEEK}}_Dictation</name>'
+ '<folder>guides</folder>'
+ '<iconfilename>icon.png</iconfilename>'
+ '<imagefilename>User-Guide-Icons.png</imagefilename>'
+ '<launcher>link</launcher>'
+ '<link>Year{{YEAR}}{{TERM}}Week{{WEEK}}Dictations.pdf</link>'
+ '<params>sharedLinkMode=1</params>'
+ '<activated>1</activated>'
+ '<role>2</role>'
+ '<beta>1</beta>'
+ '<statstag>generic</statstag>'
+ '<searchable>1</searchable>'
+ '<allow_2do>1</allow_2do>'
+ '<mainsubject>literacy</mainsubject>'
+ '<allowguest>1</allowguest>'
+ '<languages>'
+ '<en_gb>'
+ '<title>Week {{WEEK}} - Dictation</title>'
+ '<description>Dictation for weekly spellings with pupil page and answer page.</description>'
+ '<keywords>dictation, year {{YEAR}}, y{{YEAR}}, {{TERM}}, spelling</keywords>'
+ '<yeargroups/>'
+ '<subjects>en</subjects>'
+ '<apppath/>'
+ '<activityname/>'
+ '<presentation/>'
+ '<iconfilename>Wk{{WEEK}}_Dictation_icon-en_gb.png</iconfilename>'
+ '<imagefilename>Wk{{WEEK}}_Dictation_help-en_gb.png</imagefilename>'
+ '<largeiconimage/>'
+ '</en_gb>'
+ '</languages>'
+ '<bundles>Package A</bundles>'
+ '<imagemarkers>[]</imagemarkers>'
+ '</plugin>';

var PRINTABLE = '<?xml version="1.0" encoding="UTF-8"?>'
+ '<plugin>'
+ '<name>Spelling_Y{{YEAR}}_{{TERM}}_Week{{WEEK}}_LSCWC</name>'
+ '<folder>guides</folder>'
+ '<iconfilename>icon.png</iconfilename>'
+ '<imagefilename>User-Guide-Icons.png</imagefilename>'
+ '<launcher>link</launcher>'
+ '<link>Year{{YEAR}}{{TERM}}Week{{WEEK}}LSCWC.pdf</link>'
+ '<params>sharedLinkMode=1</params>'
+ '<activated>1</activated>'
+ '<role>2</role>'
+ '<beta>1</beta>'
+ '<statstag>generic</statstag>'
+ '<searchable>1</searchable>'
+ '<allow_2do>1</allow_2do>'
+ '<mainsubject>literacy</mainsubject>'
+ '<allowguest>1</allowguest>'
+ '<languages>'
+ '<en_gb>'
+ '<title>Week {{WEEK}} - LSCWC</title>'
+ '<description>Look Say Write Cover and Check printable for pupils</description>'
+ '<keywords>LSCWC, Look, Say, Write, Cover, Check, spellings</keywords>'
+ '<yeargroups/>'
+ '<subjects>en</subjects>'
+ '<apppath/>'
+ '<activityname/>'
+ '<presentation/>'
+ '<iconfilename>Wk{{WEEK}}_LSCWC_icon-en_gb.png</iconfilename>'
+ '<imagefilename>Wk{{WEEK}}_LSCWC_help-en_gb.png</imagefilename>'
+ '<largeiconimage/>'
+ '</en_gb>'
+ '</languages>'
+ '<bundles>Package A</bundles>'
+ '<imagemarkers>[]</imagemarkers>'
+ '</plugin>';

var QUIZ = '<?xml version="1.0" encoding="UTF-8"?>'
+ '<plugin>'
+ '<name>y{{YEAR}}_{{TERM}}_Week{{WEEK}}_Week</name>'
+ '<folder>diyjs</folder>'
+ '<iconfilename>icon.png</iconfilename>'
+ '<imagefilename>help.png</imagefilename>'
+ '<launcher>jsapps/diy/quiz</launcher>'
+ '<link>y{{YEAR}}_{{TERM}}_Week{{WEEK}}_Week.2quiz</link>'
+ '<params>sharedLinkMode=1</params>'
+ '<activated>1</activated>'
+ '<statstag>2quiz</statstag>'
+ '<searchable>1</searchable>'
+ '<allow_2do>1</allow_2do>'
+ '<mainsubject>other</mainsubject>'
+ '<allowguest>1</allowguest>'
+ '<languages>'
+ '<en_gb>'
+ '<title>Week {{WEEK}} - Quiz</title>'
+ '<description>y{{YEAR}}_{{TERM}}_Week{{WEEK}}_Week</description>'
+ '<keywords>grammar, literacy, text toolkit, cloze, sentence, punctuation, spelling</keywords>'
+ '<yeargroups>{{YEAR}}</yeargroups>'
+ '<subjects>en,li</subjects>'
+ '<apppath/>'
+ '<activityname/>'
+ '<presentation/>'
+ '<iconfilename>quiz_wk{{WEEK}}_icon-en_gb.png</iconfilename>'
+ '<imagefilename>quiz_wk{{WEEK}}_help-en_gb.png</imagefilename>'
+ '<largeiconimage/>'
+ '</en_gb>'
+ '</languages>'
+ '<bundles>Package A</bundles>'
+ '<imagemarkers>[]</imagemarkers>'
+ '</plugin>';

var AppXML = function(){
    
};

AppXML.getDictation = function(row){
    var clone = "" + DICTATION;
    return clone
    .replace(/{{YEAR}}/g, row.year.replace(/\s/g,'').trim())
    .replace(/{{TERM}}/g, row.term.replace(/\s/g,'').trim())
    .replace(/{{WEEK}}/g, row.week.replace(/\s/g,'').trim());
};

AppXML.getPrintable = function(row){
    var clone = "" + PRINTABLE;
    return clone
    .replace(/{{YEAR}}/g, row.year.replace(/\s/g,'').trim())
    .replace(/{{TERM}}/g, row.term.replace(/\s/g,'').trim())
    .replace(/{{WEEK}}/g, row.week.replace(/\s/g,'').trim());
};

AppXML.getQuiz = function(row){
    var clone = "" + QUIZ;
    return clone
    .replace(/{{YEAR}}/g, row.year.replace(/\s/g,'').trim())
    .replace(/{{TERM}}/g, row.term.replace(/\s/g,'').trim())
    .replace(/{{WEEK}}/g, row.week.replace(/\s/g,'').trim());
};

module.exports = AppXML;


