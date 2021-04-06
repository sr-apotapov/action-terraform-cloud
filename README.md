# Getting Started

Use this template to create a Github Action using TypeScript. Please complete all the todos below
before publishing your action for use.

## Todos
- [ ] Update the code
- [ ] Update the `action.yaml` file with the correct information
- [ ] Update the `package.json` with the name, version etc.
- [ ] Update the `ci.yaml` with the correct inputs and validation steps
- [ ] Add a title & update the description
- [ ] Add usage description and update the `yaml` example
- [ ] Update the `yaml` in the Validation section  
- [ ] Remove everything above (& including) the `<hr>`

<hr>

# Add a title
> Add a detailed description

## Usage
> Add detailed usage information AND update the yaml code below 

```yaml
- name: T
  uses: hashicorp/setup-terraform
- name: FOO
  uses: shoprunner/action-terraform-cloud@main
  with:
    tf_api_token: ${{ secrets.TF_API_TOKEN }}
```

## Publishing the Action

Actions are run from GitHub repos, so we MUST check in the packaged `/dist` directory. 

Then run [ncc](https://github.com/zeit/ncc) and push the results:
```bash
$ npm run build
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin main
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket: 

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Validate

You can now validate the action by referencing `./` in a workflow in your repo (see [ci.yml](.github/workflows/ci.yml))

```yaml
uses: ./
with:
  # Add inputs
```

## Attribution

This repository is based on the [https://github.com/actions/typescript-action](https://github.com/actions/typescript-action) template.
