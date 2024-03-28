const conf = require("./eosioConfig")
const env = require("./.env.js")
const { api, tapos, doAction } = require("./lib/eosjs")()
const activeChain = process.env.CHAIN || env.defaultChain
const contractAccount = conf.accountName[activeChain]
const fs = require('node:fs');

async function main(){
  const schemas = JSON.parse(fs.readFileSync("schemas.json").toString())
  await doAction("")

}

main()
