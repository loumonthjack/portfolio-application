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

module.exports = {
    s3Client,
    cloudWatchClient,
    route53Client
}