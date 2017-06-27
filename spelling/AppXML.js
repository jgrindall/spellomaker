"use strict";

var AppXML = function(){
    
};

AppXML.getDictation = function(year, term, week){
    var termShort = "short";
    var s = '<name>Spelling_Y{{YEAR}}_{{TERM_SHORT}}_Wk{{WEEK}}_Dictation</name>'
    + '<folder>guides</folder>'
    + '<iconfilename>icon.png</iconfilename>'
    + '<imagefilename>User-Guide-Icons.png</imagefilename>'
    + '<launcher>link</launcher>'
    + '<link>Year {{YEAR}} {{TERM}} Week {{WEEK}} Dictations.pdf</link>'
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
    + '<imagemarkers></imagemarkers>';
    
    return s
    .replace(/{{YEAR}}/g, year)
    .replace(/{{TERM}}/g, term)
    .replace(/{{TERM_SHORT}}/g, termShort);
    .replace(/{{WEEK}}/g, week);
    
};


AppXML.getPrintable = function(year, term, week){
    var s = '<name>Spelling_Y{{YEAR}}_{{TERM}}_Wk{{WEEK}}_Dictation</name>'
    + '<folder>guides</folder>'
    + '<iconfilename>icon.png</iconfilename>'
    + '<imagefilename>User-Guide-Icons.png</imagefilename>'
    + '<launcher>link</launcher>'
    + '<link>Year {{YEAR}} {{TERM}} Week {{WEEK}} Dictations.pdf</link>'
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
    + '<imagemarkers></imagemarkers>';
    
    return s
    .replace(/{{YEAR}}/g, year)
    .replace(/{{TERM}}/g, term)
    .replace(/{{WEEK}}/g, week);
    
};


AppXML.getQuiz = function(year, term, week){
    var s = '<name>y{{YEAR}}_{{TERM}}_Week{{WEEK}}_Week</name>'
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
+ '<imagemarkers>[]</imagemarkers>';
    
    return s
    .replace(/{{YEAR}}/g, year)
    .replace(/{{TERM}}/g, term)
    .replace(/{{TERM_SHORT}}/g, termShort);
    .replace(/{{WEEK}}/g, week);
    
};


module.exports = AppXML;


