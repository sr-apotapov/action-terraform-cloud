var exec = require('child_process').exec, child;

child = exec('script=$(cat tfe_output.js)',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
 child();