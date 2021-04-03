const fs = require('fs');
const axios = require(`${process.env.GITHUB_WORKSPACE}/node_modules/axios`);

const planOutput = `${{ steps.plan.outputs.stdout }}`;
const urlRegex = /app\.terraform\.io\/app\/shoprunner\/[A-Za-z0-9\-]*\/runs\/run\-[A-Za-z0-9]*/;
const match = planOutput.match(urlRegex);
const urlSplit = match[0].split('/');
const planApiUrl = `https://app.terraform.io/api/v2/runs/${urlSplit[urlSplit.length - 1]}/plan`

const planResult = await axios.request(planApiUrl, {
    headers: {
        accept: 'application/json',
        authorization: `Bearer ${{ secrets.TF_API_TOKEN }}`
    }
});
const apiUrl = `https://app.terraform.io${planResult.data.data.links['json-output']}`;
const result = await axios.request(apiUrl, {
    headers: {
        accept: 'application/json',
        authorization: `Bearer ${{ secrets.TF_API_TOKEN }}`
    }
});

const tfplan = result.data;
const tfplanOutput = JSON.stringify(tfplan);

fs.writeFileSync('tfplan.json', tfplanOutput);
return tfplanOutput;
