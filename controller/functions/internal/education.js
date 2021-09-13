const Education = require("../../../portfolio-application/models/Education");

async function getAllEducations(){
    const educations = await Education.find();
    return educations;
}
async function getEducation(educationId){
    const education = await Education.find({_id:educationId});
    return education;
}
async function getUserEducations(userId){
    const educations = await Education.find({userId:userId});
    return educations;
}
async function createUserEducation(userId, data){}
async function updateUserEducation(userId, data){}
async function deleteUserEducation(userId){}


module.exports = {
    getAllEducations,
    getEducation,
    getUserEducations,
    createUserEducation,
    updateUserEducation,
    deleteUserEducation
}