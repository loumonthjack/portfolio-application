const AWS = require('aws-sdk');
require('dotenv').config();

const AppCreds = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const s3Client = new AWS.S3(AppCreds);
const cloudWatchClient = new AWS.CloudWatchLogs({
    ...AppCreds,
    region: 'us-west-2'
});
const route53Client = new AWS.Route53Domains({
    ...AppCreds,
    region: 'us-west-2'
});

const createStream = () => {
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const date = `${month}-${day}-${year}`;
    const getParams = {
        logStreamName: `${date}`,
        logGroupName: 'application'
    }
    cloudWatchClient.createLogStream(getParams, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(data);
            return data
        };
    });

};
const every24hrs = () => setInterval(createStream, 1000 * 60 * 60 * 24);
every24hrs();
module.exports = {
    s3Client,
    cloudWatchClient,
    route53Client
}