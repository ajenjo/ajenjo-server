var repl = require("repl");
var path = require("path");

console.log(" ,___,")
console.log(" {O,O}")
console.log(" ( v )")
console.log('  " "   ajenjo Console 0.1.0-beta')
console.log();

r = repl.start({
    prompt: "ajenjo> ",
    ignoreUndefined: true,
    // load: path.join(process.cwd(), "app.js")
  })

// r.context.version


