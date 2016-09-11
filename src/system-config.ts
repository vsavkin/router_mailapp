// /***********************************************************************************************
//  * User Configuration.
//  **********************************************************************************************/
// /** Map relative paths to URLs. */
// const map: any = {
//   '@angular2-material': 'vendor/@angular2-material'
// };
// 
// /** User packages configuration. */
// const packages: any = {};
// 
// // put the names of any of your Material components here
// const materialPkgs: string[] = ['core', 'button', 'card', 'input', 'sidenav', 'list'];
// 
// materialPkgs.forEach((pkg) => { packages[`@angular2-material/${pkg}`] = {main: `${pkg}.js`}; });
// 
// ////////////////////////////////////////////////////////////////////////////////////////////////
// /***********************************************************************************************
//  * Everything underneath this line is managed by the CLI.
//  **********************************************************************************************/
// const barrels: string[] = [
//   // Angular specific barrels.
//   '@angular/core', '@angular/common', '@angular/compiler', '@angular/http', '@angular/router',
//   '@angular/forms', '@angular/platform-browser', '@angular/platform-browser-dynamic',
// 
//   // Thirdparty barrels.
//   'rxjs',
// 
//   // App specific barrels.
//   'app',
//   'app/aaa',
//   /** @cli-barrel */
// ];
// 
// const cliSystemConfigPackages: any = {};
// barrels.forEach((barrelName: string) => {
//   if (barrelName.startsWith("@angular")) {
//     const b = barrelName.split("/");
//     const m = b[1];
//     cliSystemConfigPackages[barrelName] = {main: `bundles/${m}.umd`};
//   } else {
//     cliSystemConfigPackages[barrelName] = {main: 'index'};
//   }
// });
// 
// /** Type declaration for ambient System. */
// declare var System: any;
// 
// // Apply the CLI SystemJS configuration.
// System.config({
//   map: {'@angular': 'vendor/@angular', 'rxjs': 'vendor/rxjs', 'main': 'main.js'},
//   packages: cliSystemConfigPackages
// });
// 
// // Apply the user's configuration.
// System.config({map, packages});
// 

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/

const components = [
  //'all',
  'button',
  'card',
  //'checkbox',
 // 'dialog',
 // 'grid-list',
 // 'icon',
  'input',
  'list',
  //'menu',
  //'progress-bar',
  //'progress-circle',
  //'radio',
  'sidenav',
  //'slider',
  //'slide-toggle',
  //'button-toggle',
  //'tabs',
  //'toolbar',
  //'tooltip',
];


/** User packages configuration. */
const packages: any = {
  '@angular2-material/core': {
    format: 'cjs',
    main: 'core.umd.js'
  },
  // Set the default extension for the root package, because otherwise the demo-app can't
  // be built within the production mode. Due to missing file extensions.
  '.': {
    defaultExtension: 'js'
  }
};
components.forEach(name => {
  packages[`@angular2-material/${name}`] = {
    format: 'cjs',
    main: `${name}.umd.js`
  };
});


////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const angularPackages = {
  // Angular specific barrels.
  '@angular/core': { main: 'bundles/core.umd.js'},
  '@angular/core/testing': { main: 'bundles/core-testing.umd.js'},
  '@angular/common': { main: 'bundles/common.umd.js'},
  '@angular/compiler': { main: 'bundles/compiler.umd.js'},
  '@angular/http': { main: 'bundles/http.umd.js'},
  '@angular/forms': { main: 'bundles/forms.umd.js'},
  '@angular/router': { main: 'bundles/router.umd.js'},
  '@angular/platform-browser': { main: 'bundles/platform-browser.umd.js'},
  '@angular/platform-browser-dynamic': { main: 'bundles/platform-browser-dynamic.umd.js'},
  '@angular/platform-browser-dynamic/testing': {
    main: 'bundles/platform-browser-dynamic-testing.umd.js'
  },
};

const barrels: string[] = [
  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/aaa',
  /** @cli-barrel */
];

const _cliSystemConfig: any = angularPackages;
barrels.forEach((barrelName: string) => {
  _cliSystemConfig[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js',
    '@angular2-material': 'vendor/@angular2-material',
  },
  packages: _cliSystemConfig
});

// Apply the user's configuration.
System.config({ packages });
