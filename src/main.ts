import * as util from 'util';
import * as fs from 'fs';
import * as core from '@actions/core';

import * as tfcloud from './lib/tfcloud';

const writeFile = util.promisify(fs.writeFile);

async function run (): Promise<void> {
  try {
    const tfApiToken: string = core.getInput('tf_api_token');
    const tfOrg: string = core.getInput('tf_organization');
    const planOutput = core.getInput('tf_plan_output'); // should be input

    // @todo try the better way :)
    // exec("terraform init");
    // const result = await exec("terraform plan");

    const plan = await tfcloud.getJsonPlan(planOutput, tfOrg, tfApiToken);

    await writeFile('tfplan.json', Buffer.from(plan));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
