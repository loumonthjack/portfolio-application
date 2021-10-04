// GET PROJECTS, EDUCATIONS, EXPERIENCES, PROFILE --> ROUTES
const express = require("express");
const router = express.Router();
const Project = require('./../../functions/internal/project');
const Experience = require('./../../functions/internal/experience');
const Education = require('./../../functions/internal/education');
const Profile = require('./../../functions/internal/profile');
const Website = require('./../../functions/internal/website');
const Customer = require('./../../functions/external/Square/customer')

// GET ALL USER PROJECTS, EDUCATIONS, EXPERIENCES, PROFILE
router.get('/:user_id/', async(req, res)=>{
    try{
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
    }catch(err){
        return err
    }
});

router.get('/project/:project_id', async(req, res)=>{
    try{
        const projectId = req.params.project_id;
        const project = await Project.getProject(projectId);
        return res.send({
            project: project
        })
    }catch(err){
        return err
    }
});

router.get('/:user_id/projects', async(req, res)=>{
    try{
        const user = req.params.user_id;
        const projects = await Project.getUserProjects(user);
        return res.send({
            projects: projects
        })
    }catch(err){
        return err
    }
});

router.post('/:user_id/project', async(req, res) => {
    try{
        const user = req.params.user_id;
        const newProject = await Project.createUserProject(user, req.body);
        return res.send({project: newProject})
    }catch(err){
        return console.log(err)
    }
});

router.delete('/:user_id/project/:project_id', async(req, res)=>{
    try{
        const user = req.params.user_id;
        const project = req.params.project_id;
        const deleteProject = await Project.deleteUserProject(project);
        return res.send(deleteProject)
    }catch(err){return err}
})

router.get('/school/:school_id', async(req, res)=>{
    try{
        const schoolId = req.params.school_id;
        const school = await Education.getEducation(schoolId);
        return res.send({
            school: school
        })
    }catch(err){
        return err
    }
});

router.get('/:user_id/schools', async(req, res)=>{
    try{
        const user = req.params.user_id;
        const schools = await Education.getUserEducations(user);
        return res.send({
            schools: schools
        })
    }catch(err){
        return err
    }
});

router.post('/:user_id/school', async(req, res) => {
    try{
        const user = req.params.user_id;
        const newSchool = await Education.createUserEducation(user, req.body);
        return res.send({school: newSchool})
    }catch(err){
        return console.log(err)
    }
});

router.delete('/:user_id/school/:school_id', async(req, res)=>{
    try{
        const user = req.params.user_id;
        const school = req.params.school_id;
        const deleteSchool = await Education.deleteUserEducation(school);
        return res.send(deleteSchool)
    }catch(err){return err}
})

router.get('/experience/:experience_id', async(req, res)=>{
    try{
        const experienceId = req.params.experience_id;
        const experience = await Experience.getExperience(experienceId);
        return res.send({
            experience: experience
        })
    }catch(err){
        return err
    }
});

router.get('/:user_id/experiences', async(req, res)=>{
    try{
        const user = req.params.user_id;
        const experiences = await Experience.getUserExperiences(user);
        return res.send({
            experiences: experiences
        })
    }catch(err){
        return err
    }
});

router.post('/:user_id/experience', async(req, res) => {
    try{
        const user = req.params.user_id;
        const newExperience = await Experience.createUserExperience(user, req.body);
        return res.send({experience: newExperience})
    }catch(err){
        return console.log(err)
    }
});

router.delete('/:user_id/experience/:experience_id', async(req, res)=>{
    try{
        const user = req.params.user_id;
        const experience = req.params.experience_id;
        const deleteExperience = await Experience.deleteUserExperience(experience);
        return res.send(deleteExperience)
    }catch(err){return err}
})

router.get('/:user_id/profile', async(req, res)=>{
    try{
        const user = req.params.user_id;
        const profile = await Profile.getUserProfile(user);
        return res.send({
            profile: profile
        })
    }catch(err){
        return err
    }
});

router.post('/:user_id/profile', async(req, res) => {
    try{
        const user = req.params.user_id;
        const newProfile = await Profile.createUserProfile(user, req.body);
        return res.send({profile: newProfile})
    }catch(err){
        return console.log(err)
    }
});

router.delete('/:user_id/profile/:profile_id', async(req, res)=>{
    try{
        const user = req.params.user_id;
        const profile = req.params.profile_id;
        const deleteProfile = await Profile.deleteUserProfile(profile);
        return res.send(deleteProfile)
    }catch(err){return err}
})

router.get('/:user_id/website', async(req,res)=>{
    try{
        const user = req.params.user_id;
        const website = await Website.getUserWebsite(user);
        return res.send({
            website: website
        })
    }catch(err){
        return err
    }
});

router.post('/:user_id/website', async(req, res) => {
    try{
        const user = req.params.user_id;
        const newWebsite = await Website.createUserWebsite(user, req.body);
        return res.send({website: newWebsite})
    }catch(err){
        return console.log(err)
    }
});

router.delete('/:user_id/website/:website_id', async(req, res)=>{
    try{
        const user = req.params.user_id;
        const website = req.params.website_id;
        const deleteWebsite = await Website.deleteUserWebsite(website);
        return res.send(deleteWebsite)
    }catch(err){return err}
})

router.get('/square/customers', async(req, res) => {
    try{
        const customer = await Customer.getAllCustomers();
        return res.send(customer)
    }catch(err){return err}
})

router.get('/:user_id/customer', async(req, res) => {
    try{
        const user = req.params.user_id;
        const customer = await Customer.getCustomer(user);
        console.log(customer)
        return res.send(customer)
    }catch(err){return err}
})
router.post('/:user_id/customer', async(req, res) => {
    try{
        const user = req.params.user_id;
        const newCustomer = await Customer.createCustomer(user);
        return res.send(newCustomer)
    }catch(err){return err}
})
router.get('/:user_id/customer/card', async(req, res) => {
    try{
        const user = req.params.user_id;
        const customerCard = await Customer.getCustomerCard(user);
        return res.send(customerCard)
    }catch(err){return err}
})
router.post('/:user_id/customer/card', async(req, res) => {
    try{
        const user = req.params.user_id;
        const newCustomerCard = await Customer.createNewCustomerCard(user, req.body);
        return res.send(newCustomerCard)
    }catch(err){return err}
})


module.exports = router;