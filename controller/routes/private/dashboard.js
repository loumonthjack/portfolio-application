// GET PROJECTS, EDUCATIONS, EXPERIENCES, PROFILE --> ROUTES
const express = require("express");
const router = express.Router();
const Project = require('./../../functions/internal/project');
const Experience = require('./../../functions/internal/experience');
const Education = require('./../../functions/internal/education');
const Profile = require('./../../functions/internal/profile');
const Website = require('./../../functions/internal/website');
const Session = require("../../functions/internal/session");
const { logEvent } = require("./../../logger");
const { updateAccess } = require('../../middleware/updateAccess');

// GET ALL USER PROJECTS, EDUCATIONS, EXPERIENCES, PROFILE
router.get('/:user_id/', updateAccess, async (req, res) => {
    try {
        const user = req.params.user_id;
        const profile = await Profile.getUserProfile(user);
        const projects = await Project.getUserProjects(user);
        const experiences = await Experience.getUserExperiences(user);
        const educations = await Education.getUserEducations(user);
        logEvent(req, res);
        return res.send({
            profile: profile,
            projects: projects,
            experiences: experiences,
            schools: educations
        });
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
});

router.get('/:user_id/project/:project_id', async (req, res) => {
    try {
        const user = req.params.user_id;
        const projectId = req.params.project_id;
        const project = await Project.getProject(projectId);
        if (user != project.userId) {
            const errorMessage = 'Not authorized to view this Project!'
            logEvent(req, res, errorMessage);
            return res.status(400).json({
                message: errorMessage
            })
        }
        logEvent(req, res);
        return res.send({
            project: project
        })
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
});

router.get('/:user_id/projects', async (req, res) => {
    try {
        const user = req.params.user_id;
        const projects = await Project.getUserProjects(user);
        logEvent(req, res);
        return res.send({
            projects: projects
        })
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
});

router.post('/:user_id/project', async (req, res) => {
    try {
        const user = req.params.user_id;
        const newProject = await Project.createUserProject(user, req.body);
        logEvent(req, res);
        return res.send({
            project: newProject
        })
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
});

router.delete('/:user_id/project/:project_id', async (req, res) => {
    try {
        const user = req.params.user_id;
        const project = req.params.project_id;
        const deleteProject = await Project.deleteUserProject(project);
        logEvent(req, res);
        return res.send(deleteProject)
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
})

router.delete('/:user_id/projects', async (req, res) => {
    try {
        const user = req.params.user_id;
        const deleteProjects = await Project.deleteUserProjects(req.body.projects);
        logEvent(req, res);
        return res.send(deleteProjects)
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
})
router.get('/:user_id/school/:school_id', async (req, res) => {
    try {
        const user = req.params.user_id;
        const schoolId = req.params.school_id;
        const school = await Education.getEducation(schoolId);
        if (user != school.userId) {
            const errorMessage = 'Not authorized to view this School!'
            logEvent(req, res, errorMessage);
            return res.status(400).json({
                message: errorMessage
            })
        }
        logEvent(req, res);
        return res.send({
            school: school
        })
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
});

router.get('/:user_id/schools', async (req, res) => {
    try {
        const user = req.params.user_id;
        const schools = await Education.getUserEducations(user);
        logEvent(req, res);
        return res.send({
            schools: schools
        })
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
});

router.post('/:user_id/school', async (req, res) => {
    try {
        const user = req.params.user_id;
        const newSchool = await Education.createUserEducation(user, req.body);
        logEvent(req, res);
        return res.send({
            school: newSchool
        })
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
});

router.delete('/:user_id/school/:school_id', async (req, res) => {
    try {
        const user = req.params.user_id;
        const school = req.params.school_id;
        const deleteSchool = await Education.deleteUserEducation(school);
        logEvent(req, res);
        return res.send(deleteSchool)
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
})

router.get('/:user_id/experience/:experience_id', async (req, res) => {
    try {
        const user = req.params.user_id;
        const experienceId = req.params.experience_id;
        const experience = await Experience.getExperience(experienceId);
        if (user != experience.userId) {
            const errorMessage = 'Not authorized to view this Work Experience'
            logEvent(req, res, errorMessage);
            return res.status(400).json({
                message: errorMessage
            })
        }
        logEvent(req, res);
        return res.send({
            experience: experience
        })
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
});

router.get('/:user_id/experiences', async (req, res) => {
    try {
        const user = req.params.user_id;
        const experiences = await Experience.getUserExperiences(user);
        logEvent(req, res);
        return res.send({
            experiences: experiences
        })
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
});

router.post('/:user_id/experience', async (req, res) => {
    try {
        const user = req.params.user_id;
        const newExperience = await Experience.createUserExperience(user, req.body);
        logEvent(req, res);
        return res.send({
            experience: newExperience
        })
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
});

router.delete('/:user_id/experience/:experience_id', async (req, res) => {
    try {
        const user = req.params.user_id;
        const experience = req.params.experience_id;
        const deleteExperience = await Experience.deleteUserExperience(experience);
        logEvent(req, res);
        return res.send(deleteExperience)
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
})

router.get('/:user_id/profile', async (req, res) => {
    try {
        const user = req.params.user_id;
        const profile = await Profile.getUserProfile(user);
        logEvent(req, res);
        return res.send({
            profile: profile
        })
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
});

router.post('/:user_id/profile', async (req, res) => {
    try {
        const user = req.params.user_id;
        const newProfile = await Profile.createUserProfile(user, req.body);
        logEvent(req, res);
        return res.send({
            profile: newProfile
        });
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
});

router.delete('/:user_id/profile/:profile_id', async (req, res) => {
    try {
        const user = req.params.user_id;
        const profile = req.params.profile_id;
        const deleteProfile = await Profile.deleteUserProfile(profile);
        logEvent(req, res);
        return res.send(deleteProfile)
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
})

router.get('/:user_id/website', async (req, res) => {
    try {
        const user = req.params.user_id;
        const website = await Website.getUserWebsite(user);
        logEvent(req, res);
        return res.send({
            website: website
        })
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
});

router.post('/:user_id/website', async (req, res) => {
    try {
        const user = req.params.user_id;
        const newWebsite = await Website.createUserWebsite(user, req.body);
        logEvent(req, res);
        return res.send({
            website: newWebsite
        })
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
});

router.delete('/:user_id/website/:website_id', async (req, res) => {
    try {
        const user = req.params.user_id;
        const website = req.params.website_id;
        const deleteWebsite = await Website.deleteUserWebsite(website);
        logEvent(req, res);
        return res.send(deleteWebsite)
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
})

router.post('/log/:user_id/event', async (req, res) => {
    try {
        logEvent(req, res);
        res.send('Event Logged')
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }

});

router.get('/:user_id/logout', async (req, res) => {
    try {
        const user = req.params.user_id;
        const deleteSession = await Session.deleteUserSessions(user);
        req.session.destroy();
        logEvent(req, res)
        res.redirect('http://localhost:5000/home');
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
});
module.exports = router;