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
const Storage = require('../../functions/external/Amazon/storage');
const { createUserWebsite } = require("../../functions/internal/website");


router.get('/:user_id/storage', async(req, res)=>{
    try{
        const user = req.params.user_id;
        const resumes = await Storage.listUserObjects(user);
        return res.send(resumes);
    }catch(err){ return err }
});

router.post('/:user_id/upload', async(req, res)=>{
    try{
        const user = req.params.user_id;
        const resumes = Storage.uploadToBucket(user, req.body)
        return res.send(resumes);
    }catch(err){ return err }
});

router.post('/:user_id/bucket', async(req, res)=>{
    try{
        const user = req.params.user_id;
        const createBucket = Storage.createUserBucket(user);
        const setPolicy = Storage.updatePolicy(user);
        const setHosting = Storage.updateHosting(user);
        const newWebsite = createUserWebsite(user);
        const website = setPolicy && setHosting && createBucket.Location && newWebsite;
        if(website){
            return res.send(website);
        }
    }catch(err){ return err }
});

module.exports = router;