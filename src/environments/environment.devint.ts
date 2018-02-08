export const environment = {
  production: true,
  portalEnvironemnt: [
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
