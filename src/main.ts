import * as util from 'util';
import * as fs from 'fs';
import * as core from '@actions/core';

import * as tfcloud from './lib/tfcloud';

const writeFile = util.promisify(fs.writeFile);
const { promisify } = require('util');
const exec = promisify(require('child_process').exec)

async function run (): Promise<void> {
  try {
    const tfApiToken: string = core.getInput('tf_api_token');
    const tfOrg: string = core.getInput('tf_organization');
    const planOutput = core.getInput('tf_plan_output'); // should be input

    // @todo try the better way :)
    // async function terraform (){
    var replaceChars={ "%":"%25" , "%\n":"%0A" , "\r":"%0D" , "$": "\$" , "`": "%60" }; // cleanup settings

    // const code_scan_logs = await exec('ls ./code_scan/*.tap | xargs cat')
    // const code_scan_logs_result = code_scan_logs.replace(/#|_|/g,function(match) {return replaceChars[match];}) // cleaning up the code_scan_results
    // process.env.CONTENT = code_scan_logs_result
    // const init = await exec('terraform init') //tf init
    // console.log(init)
    // const fmt = await exec('terraform fmt -check -diff') // tf fmt with diff
    // const fmt_result = fmt.replace(/#|_|/g,function(match) {return replaceChars[match];}) // cleaning up the tf fmt results
    // console.log(fmt_result)
    // const tfplan = await exec('terraform plan -no-color') // tf plan
    // const tfplan_result = tfplan.replace(/#|_|/g,function(match) {return replaceChars[match];})
    // console.log(tfplan_result) // cleaning up the tf plan results
    // };
    // const planresult = await exec("terraform plan -no-color", (err, stdout, stderr) => {
    //   if (err) {
    //     resolve(err);
    //   } else {
    //     resolve({stdout, stderr});
    //     }
    //   });
    // };

    const plan = await tfcloud.getJsonPlan(planOutput, tfOrg, tfApiToken);

    await writeFile('tfplan.json', Buffer.from(plan));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
