const { exec } = require('child_process');
exec('script=$(cat /home/runner/work/_actions/sr-apotapov/action-terraform-cloud/master/tfe_output.js)', (err, stdout, stderr) => {
    if (err) {
        //some err occurred
        console.error(err)
    } else {
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    }
});