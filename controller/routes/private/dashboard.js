// GET PROJECTS, EDUCATIONS, EXPERIENCES, PROFILE --> ROUTES
const express = require("express");
const router = express.Router();
const Project = require('./../../functions/internal/project')
const Experience = require('./../../functions/internal/experience')
const Education = require('./../../functions/internal/education')
const Profile = require('./../../functions/internal/profile')
const Website = require('./../../functions/internal/website')
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
})
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
})
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
})
router.get('/:user_id/experiences', async(req, res)=>{
    try{
        const user = req.params.user_id;
        const experiences = await Education.getUserEducations(user);
        return res.send({
            experiences: experiences
        })
    }catch(err){
        return err
    }
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
})
router.get('/:user_id/website', async(req,res)=>{
    try{
        const user = req.params.user_id;
        const website = await Website.getWebsite(user);
        return res.send({
            website: website
        })
    }catch(err){
        return err
    }
})

module.exports = router;