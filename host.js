#!/usr/bin/env node

function execute(command) {
  const exec = require('child_process').exec

  exec(command, (err, stdout, stderr) => {
    process.stdout.write(stdout)
  })
}

const string = "lighthouse https://airhorner.com/"

execute(string)