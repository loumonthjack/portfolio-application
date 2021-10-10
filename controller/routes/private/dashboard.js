// GET PROJECTS, EDUCATIONS, EXPERIENCES, PROFILE --> ROUTES
const express = require("express");
const router = express.Router();
const Project = require('./../../functions/internal/project');
const Experience = require('./../../functions/internal/experience');
const Education = require('./../../functions/internal/education');
const Profile = require('./../../functions/internal/profile');
const Website = require('./../../functions/internal/website');
const Square = require('../../functions/external/Square/index')
const Price = require("./../../functions/internal/price");
const Payment = require("./../../functions/internal/payment");
const Amazon = require('../../functions/external/Amazon/index')


// GET ALL USER PROJECTS, EDUCATIONS, EXPERIENCES, PROFILE
router.get('/:user_id/', async (req, res) => {
    try {
        const user = req.params.user_id;
        const profile = await Profile.getUserProfile(user);
        const projects = await Project.getUserProjects(user);
        const experiences = await Experience.getUserExperiences(user);
        const educations = await Education.getUserEducations(user);
        return res.send({
            profile: profile,
            projects: projects,
            experiences: experiences,
            schools: educations
        });
    } catch (err) {
        return console.log(err)
    }
});

router.get('/project/:project_id', async (req, res) => {
    try {
        const projectId = req.params.project_id;
        const project = await Project.getProject(projectId);
        return res.send({
            project: project
        })
    } catch (err) {
        return console.log(err)
    }
});

router.get('/:user_id/projects', async (req, res) => {
    try {
        const user = req.params.user_id;
        const projects = await Project.getUserProjects(user);
        return res.send({
            projects: projects
        })
    } catch (err) {
        return console.log(err)
    }
});

router.post('/:user_id/project', async (req, res) => {
    try {
        const user = req.params.user_id;
        const newProject = await Project.createUserProject(user, req.body);
        return res.send({
            project: newProject
        })
    } catch (err) {
        return console.log(err)
    }
});

router.delete('/:user_id/project/:project_id', async (req, res) => {
    try {
        const user = req.params.user_id;
        const project = req.params.project_id;
        const deleteProject = await Project.deleteUserProject(project);
        return res.send(deleteProject)
    } catch (err) {
        return console.log(err)
    }
})

router.get('/school/:school_id', async (req, res) => {
    try {
        const schoolId = req.params.school_id;
        const school = await Education.getEducation(schoolId);
        return res.send({
            school: school
        })
    } catch (err) {
        return console.log(err)
    }
});

router.get('/:user_id/schools', async (req, res) => {
    try {
        const user = req.params.user_id;
        const schools = await Education.getUserEducations(user);
        return res.send({
            schools: schools
        })
    } catch (err) {
        return console.log(err)
    }
});

router.post('/:user_id/school', async (req, res) => {
    try {
        const user = req.params.user_id;
        const newSchool = await Education.createUserEducation(user, req.body);
        return res.send({
            school: newSchool
        })
    } catch (err) {
        return console.log(err)
    }
});

router.delete('/:user_id/school/:school_id', async (req, res) => {
    try {
        const user = req.params.user_id;
        const school = req.params.school_id;
        const deleteSchool = await Education.deleteUserEducation(school);
        return res.send(deleteSchool)
    } catch (err) {
        return console.log(err)
    }
})

router.get('/experience/:experience_id', async (req, res) => {
    try {
        const experienceId = req.params.experience_id;
        const experience = await Experience.getExperience(experienceId);
        return res.send({
            experience: experience
        })
    } catch (err) {
        return console.log(err)
    }
});

router.get('/:user_id/experiences', async (req, res) => {
    try {
        const user = req.params.user_id;
        const experiences = await Experience.getUserExperiences(user);
        return res.send({
            experiences: experiences
        })
    } catch (err) {
        return console.log(err)
    }
});

router.post('/:user_id/experience', async (req, res) => {
    try {
        const user = req.params.user_id;
        const newExperience = await Experience.createUserExperience(user, req.body);
        return res.send({
            experience: newExperience
        })
    } catch (err) {
        return console.log(err)
    }
});

router.delete('/:user_id/experience/:experience_id', async (req, res) => {
    try {
        const user = req.params.user_id;
        const experience = req.params.experience_id;
        const deleteExperience = await Experience.deleteUserExperience(experience);
        return res.send(deleteExperience)
    } catch (err) {
        return console.log(err)
    }
})

router.get('/:user_id/profile', async (req, res) => {
    try {
        const user = req.params.user_id;
        const profile = await Profile.getUserProfile(user);
        return res.send({
            profile: profile
        })
    } catch (err) {
        return console.log(err)
    }
});

router.post('/:user_id/profile', async (req, res) => {
    try {
        const user = req.params.user_id;
        const newProfile = await Profile.createUserProfile(user, req.body);
        return res.send({
            profile: newProfile
        })
    } catch (err) {
        return console.log(err)
    }
});

router.delete('/:user_id/profile/:profile_id', async (req, res) => {
    try {
        const user = req.params.user_id;
        const profile = req.params.profile_id;
        const deleteProfile = await Profile.deleteUserProfile(profile);
        return res.send(deleteProfile)
    } catch (err) {
        return console.log(err)
    }
})

router.get('/:user_id/website', async (req, res) => {
    try {
        const user = req.params.user_id;
        const website = await Website.getUserWebsite(user);
        return res.send({
            website: website
        })
    } catch (err) {
        return console.log(err)
    }
});

router.post('/:user_id/website', async (req, res) => {
    try {
        const user = req.params.user_id;
        const newWebsite = await Website.createUserWebsite(user, req.body);
        return res.send({
            website: newWebsite
        })
    } catch (err) {
        return console.log(err)
    }
});

router.delete('/:user_id/website/:website_id', async (req, res) => {
    try {
        const user = req.params.user_id;
        const website = req.params.website_id;
        const deleteWebsite = await Website.deleteUserWebsite(website);
        return res.send(deleteWebsite)
    } catch (err) {
        return console.log(err)
    }
})

router.get('/square/customers', async (req, res) => {
    try {
        const customers = await Square.getAllCustomers();
        return res.send(customers)
    } catch (err) {
        return console.log(err)
    }
})

router.get('/:user_id/customer', async (req, res) => {
    try {
        const user = req.params.user_id;
        const customer = await Square.getCustomer(user);
        return res.send(customer)
    } catch (err) {
        return console.log(err)
    }
})
router.post('/:user_id/customer', async (req, res) => {
    try {
        const user = req.params.user_id;
        const newCustomer = await Square.createCustomer(user);
        return res.send(newCustomer)
    } catch (err) {
        return console.log(err)
    }
})
router.get('/:user_id/customer/card', async (req, res) => {
    try {
        const user = req.params.user_id;
        const customerCard = await Square.getCustomerCard(user);
        return res.send(customerCard)
    } catch (err) {
        return console.log(err)
    }
})

router.post('/:user_id/customer/card', async (req, res) => {
    try {
        const user = req.params.user_id;
        const newCustomerCard = await Square.createNewCustomerCard(user, req.body);
        return res.send(newCustomerCard)
    } catch (err) {
        return console.log(err)
    }
})

router.get('/square/prices', async (req, res) => {
    try {
        const catalogs = await Square.getPriceTypes();
        return res.send(catalogs);
    } catch (err) {
        return console.log(err)
    }
})

/*
router.post('/square/price', async(req, res) => {
    const catalogs = await Square.createPriceType();
    return res.send(catalogs);
})
*/

router.delete('/square/price', async(req, res) => {
    const catalogs = await Square.deletePriceType();
    return res.send(catalogs);
})

router.post('/square/:user_id/subscription', async(req, res) => {
    const user = req.params.user_id;
    const subscription = await Square.createSubscription(user, req.body);
    return res.send(subscription);
})
router.put('/square/:user_id/subscription/:subscription_id', async(req, res) => {
    const subscriptionId = req.params.subscription_id;
    const subscription = await Square.cancelSubscription(subscriptionId);
    return res.send(subscription);
})

router.get('/square/:user_id/subscriptions', async(req, res) => {
    const user = req.params.user_id;
    const subscriptions = await Square.getSubscriptions(user);
    return res.send(subscriptions);
})

router.get('/portfolio/prices', async (req, res) => {
    try {
        const prices = await Price.getPrices();
        return res.send({
            prices: prices
        })
    } catch (err) {
        return console.log(err)
    }
})

router.get('/portfolio/prices/:type', async (req, res) => {
    try {
        const type = req.params.type;
        const prices = await Price.getPrice(type);
        return res.send({
            price: prices
        })
    } catch (err) {
        return console.log(err)
    }
})

router.delete('/portfolio/:price_id/price', async (req, res) => {
    try {
        const priceId = req.params.price_id;
        const prices = await Price.deletePrice(priceId);
        return res.send(prices)
    } catch (err) {
        return console.log(err)
    }
});

router.post('/portfolio/price', async (req, res) => {
    try {
        const newPrice = await Price.createPrice();
        return res.send(newPrice)
    } catch (err) {
        return console.log(err)
    }
});
router.get('/:user_id/payments', async(req, res) => {
    try {
        const userId = req.params.user_id;
        const payments = await Payment.getUserPayments(userId);
        return res.send({payments: payments})
    } catch (err) {
        return console.log(err)
    }
});
router.get('/:user_id/payment/:payment_id', async(req, res) => {
    try {
        const paymentId = req.params.payment_id;
        const payments = await Payment.getPayment(paymentId);
        return res.send(payments)
    } catch (err) {
        return console.log(err)
    }
});
router.post('/:user_id/payment', async(req, res)=>{
    try{
        const userId = req.params.user_id;
        const subscription = await Square.createSubscription(userId, req.body);
        const payment = await Payment.getPayment(subscription.paymentId);
        return res.send({payment: payment[0]})
    }catch(err){
        return console.log(err)
    }
})

router.get('/s3/buckets', async(req, res) => {
    try{
        Amazon.s3Client.listBuckets(function(err, data) {
            if (err) return res.send(err), err.stack; // an error occurred
            else res.send(data.Buckets);           // successful response
       })
    }
    catch(err){
        return console.log(err)
    }
})

router.get('/s3/:user_id/bucket', async(req, res) => {
    try{
        const userId = req.params.user_id;
        Amazon.s3Client.listBuckets(function(err, data) {
            if (err) return res.send(err), err.stack; // an error occurred
            else res.send({
                Bucket: data.Buckets.filter(result=> result.Name.includes(`${userId}`))[0]
            });           // successful response
       })
    }
    catch(err){
        return console.log(err)
    }
});

router.post('/s3/new/:user_id/bucket', async(req, res) => {
    try{
        const userId = req.params.user_id;
        bucketParams = {
            Bucket: `${userId}`, 
            CreateBucketConfiguration: {
                LocationConstraint: "us-west-2"
            }
        };
        Amazon.s3Client.createBucket(bucketParams, function(err, data) {
            if (err) return res.send(err.stack); // an error occurred
            else return res.send(data)
        });
    }
    catch(err){
        return console.log(err)
    }
});

router.post('/s3/:user_id/bucket/configure', async(req, res) => {
    try{
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
        Amazon.s3Client.putBucketWebsite(hostingParams, function(err, data) {
            if (err)  return res.send(err.stack); // an error occurred
            else     return res.send(data);           // successful response
        });
    }
    catch(err){
        return console.log(err)
    }
});

router.post('/s3/:user_id/bucket/policy', async(req, res) => {
    try{
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
        Amazon.s3Client.putBucketPolicy(bucketPolicyParams, function(err, data) {
            if (err) return res.send(err.stack); // an error occurred
            else     return res.send(data);           // successful response
        });
    }
    catch(err){
        return console.log(err)
    }
});

router.get('/s3/:user_id/objects', async(req, res) => {
    try{
        const userId = req.params.user_id;
        objectParams = {
            Bucket: `${userId}`
        };
        Amazon.s3Client.listObjects(objectParams, function(err, data) {
            if (err) return res.send(err), err.stack; // an error occurred
            else res.send({Objects: data.Contents.map(result => {return {Name: result.Key, Size: result.Size}})});           // successful response
       })
    }
    catch(err){
        return console.log(err)
    }
})

module.exports = router;