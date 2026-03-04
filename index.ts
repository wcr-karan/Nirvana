#!/usr/bin/env node
const {Command} = require('commander');

const program = new Command();
program
.command('greet veer')
.action((name)=>{
    console.log(`Hello ${name}!`);
})
program
.command("Add <n1> <n2>")
.action((n1,n2)=>{
    const sum = Number(n1) + Number(n2);
    console.log(sum);
})
program.parse();