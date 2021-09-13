const AWS =  require('aws-sdk');
require('dotenv').config()

// Connect to Cloudwatch
const watchClient = new AWS.CloudWatchLogs({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

function listUserLogGroup(userId){
    
}
function listUserLogStream(userId){
    
}
function listUserLogEvent(userId){

}
function createUserLogGroup(userId){

}
function createUserLogStream(userId){
    
}
function createUserLogEvent(userId){
    
}
module.exports = {
    listUserLogStream,
    listUserLogGroup,
    listUserLogEvent,
    createUserLogStream,
    createUserLogGroup,
    createUserLogEvent
}