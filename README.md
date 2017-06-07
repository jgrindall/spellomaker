There are two projects in this repository:

1. A command line interface to process mp3 files and save them as base 64 ready to be inserted into quiz json files

2. A web interface in which you can upload a csv file and download a zip file containing your quizzes.

======================================

1. command line interface

usage
=====

* fill the "audio" folder (gitignore'd) with all your mp3 files

* run "node process"

* this will populate SpellingAudio.js



2. web interface 

usage
=====

This project has 2 remotes

* origin: purplemash/spellomaker

* github: spellomaker  (using john.grindall@gmail's account)

Any time code is pushed to the 'spellomaker' remote it deploys the web app to heroku.

Heroku displays the app at "spellomaker.herokuapp.com"

(I did this because Heroku has a super-easy way to deploy from github)

Or, run locally with "node web"





