var fs=require('fs')
var data =require('./data.json')
console.log(data.name)
fs.readFile('./data.json','utf-8',(err,data)=>{
    console.log(data)
})

//read dir 
fs.readdir('c:/',(err,data)=>{
    console.log(data)
})
//write to file 
var dataj = {
    "name":"ali from node"
};
fs.writeFile('data1.json',JSON.stringify( dataj),(err,data)=>{
console.log('write done ')
})