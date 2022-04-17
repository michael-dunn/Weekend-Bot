
var logs = [];

function log(message){
    logs.push(message);
}

function reset(){
    console.log("----------------------");
    logs.forEach(log => {
        console.log(log);
    });
    logs = [];
}

module.exports.log = log;
module.exports.reset = reset;