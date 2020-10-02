var rimraf = require("rimraf");

rimraf.sync("./build");
rimraf.sync("./site/js");
rimraf.sync("./site/service-worker.js");
