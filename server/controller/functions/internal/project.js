const Project = require("../../../models/Project");
const {
    getUserWebsite
} = require('./website');
const {
    getUserRole
} = require('./user')

async function getAllProjects() {
    const userType = getUserRole(userId);
    if (userType == 'super') {
        const projects = await Project.find()
        return projects
    } else {
        return null
    }
}

async function getProject(projectId) {
    const project = await Project.find({
        _id: projectId
    });
    return project
}

async function getUserProjects(userId) {
    const projects = await Project.find({
        userId: userId
    });
    return projects

}

async function createUserProject(userId, data) {
    const { title, description, image, source, visit } = data;
    const project = await Project.create({
        title,
        description,
        image,
        source,
        visit,
        userId
    });
    return project;
}

async function deleteUserProject(projectId) {
    try {
        const project = await Project.deleteOne({
            _id: projectId
        });
        return project
    } catch (err) {
        return err
    }
}
async function deleteUserProjects(projects) {
    try {
        
        return Project.deleteMany({
            _id: projects
        });
    
    } catch (err) {
        return err
    }
}
async function updateUserProject(userId, data) {}

module.exports = {
    getAllProjects,
    getProject,
    getUserProjects,
    createUserProject,
    deleteUserProject,
    deleteUserProjects,
    updateUserProject
}