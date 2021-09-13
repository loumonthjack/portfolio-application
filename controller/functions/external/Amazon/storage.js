const AWS =  require('aws-sdk');
require('dotenv').config();

const s3Client = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
function getAllBuckets(){
    try{
        s3Client.listBuckets(function(err, data) {
            if (err) return err, err.stack; // an error occurred
            else     return data;           // successful response
       })
    }catch(err){
        return err
    }
}
function uploadToBucket(userId, data){
    uploadParams = {
        Body: `${data.file}`, 
        Bucket: `${userId}`, 
        Key: `/public/static/resume/${data.fileName}`
       };
    s3Client.putObject(uploadParams, function(err, data) {
         if (err) return err, err.stack; // an error occurred
         else     return data;           // successful response
    });
}
function downloadFromBucket(userId){
    downloadParams = {
        Bucket: `${userId}`, 
        Key: `/public/static/resume/${data.fileName}`
       };
    s3Client.getObject(downloadParams, function(err, data) {
        if (err) return err, err.stack; // an error occurred
        else     return data;           // successful response
    });
}

function listUserObjects(userId){
    objectParams = {
        Bucket: `${userId}`, 
        MaxKeys: 5
    };
    try{
        s3Client.listObjects(objectParams, function(err, data) {
            if (err) return err, err.stack; // an error occurred
            else     return data;           // successful response
        });
    }catch(err){ return err}
}

function createUserBucket(userId){
    // Bucket Configuration
    bucketParams = {
        Bucket: `${userId}`, 
        CreateBucketConfiguration: {
            LocationConstraint: "us-west-2"
        }
    };
    try{
        // Create Bucket
        s3Client.createBucket(bucketParams, function(err, data) {
            if (err) return err, err.stack; // an error occurred
            else     return data;           // successful response
        });
    }catch(err){ return err}
}
function deleteUserBucket(userId){
    bucketParams = {
        Bucket: `${userId}`
    };
    try{
        s3Client.deleteBucketWebsite(bucketParams, function(err, data) {
                if (err) return err, err.stack; // an error occurred
                else     return data;           // successful response
        });
    }catch(err){ return err}
}

function updateHosting(userId){
    // Hosting Configuration
    hostingParams = {
        Bucket: `${userId}`, 
        WebsiteConfiguration: {
            ErrorDocument: {
                Key: 'error.html'
            },
            IndexDocument: {
                Suffix: 'index.html'
            },
        }
    };
    try{
        s3Client.putBucketWebsite(hostingParams, function(err, data) {
            if (err)  return err, err.stack; // an error occurred
            else     return data;           // successful response
          });
    }catch(err){ return err}
}

function updatePolicy(userId){
    // Policy of Bucket                   
    policyParams = {
        Version: "2012-10-17",
        Statement: [{
            Sid: "PublicReadGetObject",
            Effect: "Allow",
            Principal: "*",
            Action: "s3:GetObject",
            Resource: `arn:aws:s3:::${userId}/*`
        }]
    };
    // Name and Policy of Bucket 
    bucketPolicyParams = {
        Bucket: `${userId}`,
        Policy: JSON.stringify(policyParams)
    };
    try{
        s3Client.putBucketPolicy(bucketPolicyParams, function(err, data) {
            if (err) return err, err.stack; // an error occurred
            else     return data;           // successful response
          });
    }catch(err){
        return err
    }
}

module.exports ={
    createUserBucket,
    getAllBuckets,
    uploadToBucket,
    downloadFromBucket,
    listUserObjects,
    updatePolicy,
    updateHosting,
    deleteUserBucket    
}
