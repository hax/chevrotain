const acorn = require("acorn")
const Benchmark = require("benchmark")
const fs = require("fs")
const path = require("path")
const adapterLex = require("./ecma5_lexer")

function newSuite(name) {
    return new Benchmark.Suite(name, {
        onStart: () => console.log(`\n\n${name}`),
        onCycle: event => console.log(String(event.target)),
        onComplete: function() {
            console.log("Fastest is " + this.filter("fastest").map("name"))
        }
    })
}

function acornLex(input) {
    for (let token of acorn.tokenizer(input)) {
        // iterate over the tokens
    }
}

function acornLexAndConvertToChev(input) {
    return adapterLex.tokenize(input)
}

var samplePath = path.join(__dirname, "../node_modules/lodash/lodash.js")
var sampleString = fs.readFileSync(samplePath, "utf8").toString()

newSuite("let")
    .add("Acorn", () => acornLex(sampleString))
    .add("Acorn Adapter", () => acornLexAndConvertToChev(sampleString))
    // .add("Acorne full", () => acorn.parse(sampleString))
    .run({
        async: false
    })
