const { exec } = require('child_process');
exec('echo ‘CF_URL<<EOF’ >> $GITHUB_ENV && echo "script=$(cat /home/runner/work/_actions/sr-apotapov/action-terraform-cloud/master/tfe_output.js)" >> $GITHUB_ENV && echo ‘EOF’ >> $GITHUB_ENV', (err, stdout, stderr) => {
    if (err) {
        //some err occurred
        console.error(err)
    } else {
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    }
});