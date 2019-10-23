# progress_reminder
POC to send reminders on course progress

This is a proof of concept system that consumes several exposed end-points in order to 
-Fetch the available modules currently in sessions
-Review the progress of the students
-Send the appropriate notification based on their progress status

# How it works
Once deployed, this application will always run at midnight. It will fetch the list of modules currently in progress. Once it has received the list of modules, it will go through every module checking to see if we have reached midway.

If we are currently midway through the module, it proceeds to review the students' progress and sends an appropriate notification to the students communicating their statuses.

## Installation Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g
---

## Install

    $ git clone https://github.com/LostLite/progress_reminder.git
    $ cd progress_reminder

## Running the project

    $ npm start

## Simple build for production

    $ npm build
