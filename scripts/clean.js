var rimraf = require("rimraf");

rimraf.sync("./build");
rimraf.sync("./docs/js");
rimraf.sync("./docs/service-worker.js");
