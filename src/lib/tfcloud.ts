import axios from 'axios';

function getPlanApiUrl (planOutput: string, tfOrg: string) {
  const urlRegex = new RegExp(`app\\.terraform\\.io\\/app\\/${tfOrg}\\/[A-Za-z0-9\\-]*\\/runs\\/run\\-[A-Za-z0-9]*`);
  const match = planOutput.match(urlRegex);
  if (match) {
    const urlSplit = match[0].split('/');
    return `https://app.terraform.io/api/v2/runs/${urlSplit[urlSplit.length - 1]}/plan`;
  } 
  if (planOutput == null){
    throw new Error(`planOutput is null : ${planOutput}`);
  }
  if (planOutput == undefined){
    throw new Error(`planOutput is undefined: ${planOutput}`);
  }
  else {
    throw new Error(`Unable to find URL match for organization: ${tfOrg}`);
  }
}

/**
 * Finds the url from a CLI output and returns the Terraform Plan JSON output as a string
 * @param planOutput
 * @param tfOrg
 * @param tfApiToken
 */
export async function getJsonPlan (planOutput: string, tfOrg: string, tfApiToken: string): Promise<string> {
  const planApiUrl = getPlanApiUrl(planOutput, tfOrg);

  const planResult = await axios.get(planApiUrl, {
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${tfApiToken}`
    }
  });

  const result = await axios.get(`https://app.terraform.io${planResult.data.data.links['json-output']}`, {
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${tfApiToken}`
    }
  });

  return JSON.stringify(result.data);
}
