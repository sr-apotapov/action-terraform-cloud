import * as util from 'util';
import * as fs from 'fs';
import * as core from '@actions/core';

import * as tfcloud from './lib/tfcloud';

const writeFile = util.promisify(fs.writeFile);
const { promisify } = require('util');
// const exec = promisify(require('child_process').exec)
const { exec } = require('child_process');

function cleanup (log:string) {
  var replaceChars={ "%":"%25" , "%\n":"%0A" , "\r":"%0D" , "$": "\$" , "`": "%60" }; // cleanup settings
  log.replace(/#|_|/g,function(match) {return replaceChars[match];})
}
// async function terraform(command:string): Promise<string> {
//   if (command == 'plan') {
//     const tfplan_out = await exec('terraform plan -no-color')
//     const planOutput = cleanup(tfplan_out)
//     return planOutput
//   } 
//   if (command == 'init') {
//     await exec('terraform init')
//   } 
//   if (command == 'fmt') {
//     const fmt_out = await exec('terraform fmt -check -diff')
//     const fmt = cleanup(fmt_out)
//     return JSON.stringify(fmt.data);
//   }
//   else {
//     return "no command specified"
//   }
// }

async function run (): Promise<void> {
  try {
    const tfApiToken: string = core.getInput('tf_api_token');
    const tfOrg: string = core.getInput('tf_organization');
    // const planOutput = core.getInput('plan_output'); // should be input

    var fmt = exec('terraform fmt -diff -check',
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
    const new_fmt = cleanup(fmt.stdout)
    // var init = exec('terraform init; terraform plan -no-color',
    //     (error, stdout, stderr) => {
    //         console.log(stdout);
    //         console.log(stderr);
    //         if (error !== null) {
    //             console.log(`exec error: ${error}`);
    //         }
    //     });
    const init_out = cleanup(init.stdout)
    console.log(init_out)
    var tfplan = exec('terraform init; terraform plan -no-color',
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
    const planOutput = cleanup(tfplan.stdout)
    console.log(planOutput)
        
    const plan = await tfcloud.getJsonPlanf(planOutput, tfOrg, tfApiToken);

    await writeFile('tfplan.json', Buffer.from(plan));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();


    // const planOutput = core.getInput('plan_output'); // should be input
    // @todo try the better way :)
    // async function terraform (){
    // const code_scan_logs = await exec('ls ./code_scan/*.tap | xargs cat')
    // const code_scan_logs_result = code_scan_logs.replace(/#|_|/g,function(match) {return replaceChars[match];}) // cleaning up the code_scan_results
    // process.env.CONTENT = code_scan_logs_result
    // };
    // const planresult = await exec("terraform plan -no-color", (err, stdout, stderr) => {
    //   if (err) {
    //     resolve(err);
    //   } else {
    //     resolve({stdout, stderr});
    //     }
    //   });
    // };