// GET PROJECTS, EDUCATIONS, EXPERIENCES, PROFILE --> ROUTES
const express = require("express");
const router = express.Router();
const Project = require('./../../functions/internal/project');
const Experience = require('./../../functions/internal/experience');
const Education = require('./../../functions/internal/education');
const Profile = require('./../../functions/internal/profile');
const Website = require('./../../functions/internal/website');
const {
    getPriceById
} = require('./../../functions/internal/price')
const {
    getUserPayments
} = require('./../../functions/internal/payment')
const {
    logEvent
} = require("./../../logger");
const {
    updateUserRole,
    getUser
} = require("../../functions/internal/user");
const { deleteUserSessions } = require("../../functions/internal/session");
const {
    _
} = require('lodash')

const updateAccess = (req, res, next) => {
    const userId = req.params.user_id;
    getUser(userId).then(user => {
        if (user.role == 'basic') // upgrade access
            getUserPayments(user.id).then(userPayments => {
                const noPayments = _.isEmpty(userPayments);
                if (noPayments == true) {
                    return
                }
                const lastPayment = userPayments.slice(-1)[0]
                lastPayment && getPriceById(lastPayment.priceId).then(payment => {
                    const lastPaymentDate = lastPayment.payment_date.getTime();
                    const today = new Date().getTime();
                    const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
                    const expiration = diffDays(today, lastPaymentDate);
                    const monthExpired = (expiration > 31);
                    const yearExpired = (expiration > 366);
                    if (payment.type == "monthly") {
                        (monthExpired == false) && updateUserRole(user.id, payment.access).then(result => {
                            return
                        });
                    } else if (payment.type == "yearly") {
                        (yearExpired == false) && updateUserRole(user.id, payment.access).then(result => {
                            return
                        });
                    };
                });
            });
        else // downgrade access
            getUserPayments(userId).then(userPayments => {
                const noPayments = _.isEmpty(userPayments);
                if (noPayments == true) {
                    return
                }
                const lastPayment = userPayments.slice(-1)[0];
                lastPayment && getPriceById(lastPayment.priceId).then(payment => {
                    const lastPaymentDate = lastPayment.payment_date.getTime();
                    const today = new Date().getTime();
                    const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
                    const expiration = diffDays(today, lastPaymentDate);
                    const monthExpired = (expiration > 31);
                    const yearExpired = (expiration > 366);
                    if (payment.type == "monthly") {
                        (monthExpired == true) && updateUserRole(user.id, 'basic').then(result => {
                            return
                        })
                    } else if (payment.type == "yearly") {
                        (yearExpired == true) && updateUserRole(user.id, 'basic').then(result => {
                            return
                        })
                    }
                });
            });
    });
    next()
}

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

router.get('/project/:project_id', async (req, res) => {
    try {
        const projectId = req.params.project_id;
        const project = await Project.getProject(projectId);
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
router.get('/school/:school_id', async (req, res) => {
    try {
        const schoolId = req.params.school_id;
        const school = await Education.getEducation(schoolId);
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

router.get('/:user_id/logout',async (req,res) => {
    try{
        const user = req.params.user_id;
        const deleteSession = await deleteUserSessions(user);
        req.session.destroy();
        logEvent(req, res)
        res.redirect('http://localhost:5000/home');
    }catch(err){
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
    });
module.exports = router;