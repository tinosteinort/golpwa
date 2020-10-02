# Conways Game Of Live

The `Game of Live` as standalone PWA with a Web App Manifest. Have
a look at the application: https://tinosteinort.github.io/golpwa


## Development

The typescript source is located in the `src` folder. The HTML source is in the
 `site` folder.

To start development execute:
```
npm run dev
```

The local test webserver is reachable at `http://localhost:8000/`. You have to refresh
 the browser by your own to execute the new transpiled code.

 > :warning: `site/js` and `build` folders will be genereated. Dont't modify code within manually.


## Distributing

The distributable folder is `site`. Before using, run:
```
npm run build
```
