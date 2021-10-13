// CREATE BUCKET FROM RESUME STORED IN BUCKET --> ROUTES
// /admin/:userId/process

// INPUT(TEMPLATE_ID, USER_ID, RESUME)
// DOWNLOAD RESUME FROM BUCKET
// STORE LOCALLY
// EXTRACT TEXT FROM PDF
// ORDER THE TEXT
// CREATE PROJECTS, EDUCATION, EXPERIENCE FROM TEXT
// CREATE BUCKET WITH TEMPLATE 
// UPLOAD REACT APP TO BUCKET
// RETURN S3URL TO WEBSITE
const express = require("express");
const router = express.Router();
const { s3Client } = require('./../../functions/external/Amazon/index');
const { logEvent } = require("./../../logger");
const axios = require('axios');

router.get('/s3/buckets', async (req, res) => {
    try {
        const getBuckets = () => s3Client.listBuckets(function (err, data) {
            if(err){
                logEvent(req, res, err.stack);
                return res.status(400).json({
                    message: err.stack
                }) // an error occurred
            } else logEvent(req, res);
            return res.send({
                Buckets: data.Buckets
            }); // successful response
        })
        return getBuckets();
    } catch(err){
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
})

router.get('/s3/:user_id/bucket', async (req, res) => {
    try {
        const userId = req.params.user_id;
        const getUserBucket = () => s3Client.listBuckets(function (err, data) {
            if(err){
                logEvent(req, res, err.stack);
                return res.status(400).json({
                    message: err.stack
                });
            } else logEvent(req, res);
            return res.send({
                Bucket: data.Buckets.filter(result => result.Name.includes(`${userId}`))[0]
            }); // successful response

        });
        return getUserBucket();
    } catch(err){
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
});

router.post('/s3/:user_id/bucket/new', async (req, res) => {
    try {
        const userId = req.params.user_id;
        bucketParams = {
            Bucket: `${userId}`,
            CreateBucketConfiguration: {
                LocationConstraint: "us-west-2"
            }
        };
        const createUserBucket = () => s3Client.createBucket(bucketParams, function (err, data) {
            if(err){
                if(err.stack.includes("BucketAlreadyOwnedByYou")) return res.status(400).json({message: 'Bucket Already Exist!'})
                logEvent(req, res, err.stack);
                return res.status(400).json({
                    message: err.stack
                }) // an error occurred
            } else logEvent(req, res)
            const setHosting = axios.get(`http://localhost:5000/resume/s3/${userId}/bucket/configure`); // successful response
            return setHosting.then((response => res.send(response.data)))
        });
        return createUserBucket();
    } catch(err){
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
});

router.get('/s3/:user_id/bucket/configure', async (req, res) => {
    try {
        const userId = req.params.user_id;
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
        const setBucketHosting = () => s3Client.putBucketWebsite(hostingParams, function (err, data) {
            if(err){
                logEvent(req, res, err.stack);
                return res.status(400).json({
                    message: err.stack
                }) 
            } else logEvent(req, res);
            const setPolicy = axios.get(`http://localhost:5000/resume/s3/${userId}/bucket/policy`); // successful response
            return setPolicy.then((response => res.send(response.data)))
        });
        return setBucketHosting();
    } catch(err){
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
});

router.get('/s3/:user_id/bucket/policy', async (req, res) => {
    try {
        const userId = req.params.user_id;
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
        const setBucketPolicy = () => s3Client.putBucketPolicy(bucketPolicyParams, function (err, data) {
            if(err){
                logEvent(req, res, err.stack);
                return res.status(400).json({
                    message: err.stack
                }) // an error occurred
            } else logEvent(req, res);
            return res.send({message: 'Created Website'}); // successful response
        });
        return setBucketPolicy();
    } catch(err){
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
});

router.get('/s3/:user_id/objects', async (req, res) => {
    try {
        const userId = req.params.user_id;
        objectParams = {
            Bucket: `${userId}`
        };
        const getUserObjects = () => s3Client.listObjects(objectParams, function (err, data) {
            if(err){
                logEvent(req, res, err.stack);
                return res.status(400).json({
                    message: err.stack
                });
            } else logEvent(req, res);
            res.send({
                Objects: data.Contents.map(result => {
                    return {
                        Name: result.Key,
                        Size: result.Size
                    }
                })
            }); // successful response
        });
        return getUserObjects();
    } catch(err){
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
})
module.exports = router;