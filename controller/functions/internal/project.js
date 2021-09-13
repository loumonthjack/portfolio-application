const Project = require("../../../portfolio-application/models/Project");
const { getWebsite } = require('./website');
const { getUserRole } = require('./user')

async function getAllProjects(){
    const userType = getUserRole(userId);
    if(userType == 'super'){
        const projects = await Project.find()
        return projects
    }else{
        return null
    }
}

async function getProject(projectId){
    const project = await Project.find({_id:projectId});
    return project
}

async function getUserProjects(userId){
    const projects = await Project.find({userId:userId});
    const userType = getUserRole(userId);
    if(userType == 'basic'){
        return {
            projects: [
                projects[0] && projects[0], 
                projects[1] && projects[1], 
                projects[2] && projects[2], 
                projects[3] && projects[3], 
                projects[4] && projects[4]
            ]
        }
    }
    else if(userType == 'plus'){
        return {
            projects: [
                projects[0] && projects[0], 
                projects[1] && projects[1], 
                projects[2] && projects[2], 
                projects[3] && projects[3], 
                projects[4] && projects[4],
                projects[5] && projects[5], 
                projects[6] && projects[6], 
                projects[7] && projects[7], 
                projects[8] && projects[8], 
                projects[9] && projects[9]
            ]
        }
    }
    else if(userType == 'premium'){
        return {
            projects: projects
        }
    }
}

async function createUserProject(userId, data){
    const website = getWebsite(userId);
    if(website){
        const project = await Project.create({
            title: data.title,
            description: data.description,
            image: data.image,
            source: data.source,
            visit: data.visit,
            websiteId: website._id,
            userId: userId
        });
        return project;
    }else{
        const project = await Project.create({
            title: data.title,
            description: data.description,
            image: data.image,
            source: data.source,
            visit: data.visit,
            userId: userId
        });
        return project;
    }
}

async function deleteUserProject(userId){}
async function updateUserProject(userId, data){}

module.exports = {
    getAllProjects,
    getProject,
    getUserProjects,
    createUserProject,
    deleteUserProject,
    updateUserProject
}