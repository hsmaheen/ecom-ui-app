// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  catalogAPIUrl: 'https://ecom-catalog-api.herokuapp.com/',
  orderApiUrl: 'https://ecom-order-api.herokuapp.com/',
  paymentApiUrl: 'https://ecom-payment-api.herokuapp.com/'

  // catalogAPIUrl: 'http://localhost:3000/',
  // orderApiUrl: 'http://localhost:3100/',
  // paymentApiUrl: 'http://localhost:3200/'


};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
