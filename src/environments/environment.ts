// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  portalEnvironemnt: [
    {
      portalApiRoot: 'http://localhost:8083/DMS/api/',
      portalApiRootFC: 'http://localhost:8083/Navigation/Api/',
      url: 'http://localhost:8083/Portal/Support/DmsAdmin',
      poll: 'http://localhost:8083/DMS/api/Poll',
      type: 'local',
      displayValue: 'Local'
    },
    {
      portalApiRoot: 'https://gcsportal-devint.nasdaq.com/DMS/api/',
      portalApiRootFC: 'https://gcsportal-devint.nasdaq.com/Navigation/Api/',
      url: 'https://gcsportal-devint.nasdaq.com/Portal/Support/DmsAdmin',
      poll: 'https://gcsportal-devint.nasdaq.com/DMS/api/Poll',
      type: 'devint',
      displayValue: 'Devint'
    },
    {
      portalApiRoot: 'https://gcsportal-qc.nasdaq.com/DMS/api/',
      portalApiRootFC: 'https://gcsportal-qc.nasdaq.com/Navigation/Api/',
      url: 'https://gcsportal-qc.nasdaq.com/Portal/Support/DmsAdmin',
      poll: 'https://gcsportal-qc.nasdaq.com/DMS/api/Poll',
      type: 'qc',
      displayValue: 'QC'
    }
  ],
};
