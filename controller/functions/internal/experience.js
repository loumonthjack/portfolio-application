const Experience = require('../../../models/Experience');
const { getUserWebsite } = require('./website');

async function getAllExperiences(){
    const experiences = await Experience.find();
    return experiences
}
async function getExperience(experienceId){
    const experience = await Experience.find({_id:experienceId});
    return experience;
}

async function getUserExperiences(userId){
    const experiences = await Experience.find({userId:userId});
    return experiences;
}

async function createUserExperience(userId, data){
        const experience = await Experience.create({
            jobTitle: data.jobTitle,
            employer: data.employer,
            city: data.city,
            state: data.state,
            start_date: data.start_date,
            end_date: data.end_date,
            userId: userId
        })
        return experience;
}

async function updateUserExperience(userId, data){}
async function deleteUserExperience(experienceId){
    try{
        const experience = await Experience.deleteOne({_id:experienceId});
        return experience
    }catch(err){return err}
}


module.exports = {
    getAllExperiences,
    getExperience,
    getUserExperiences,
    createUserExperience,
    deleteUserExperience,
    updateUserExperience
}