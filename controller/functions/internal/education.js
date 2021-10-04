const Education = require("../../../models/Education");

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
async function createUserEducation(userId, data){
    const education = await Education.create({
        schoolTitle: data.schoolTitle,
        studyField: data.studyField,
        degree: data.degree,
        city: data.city,
        state: data.state,
        start_date: data.start_date,
        end_date: data.end_date,
        userId: userId
    })
    return education;
}
async function updateUserEducation(userId, data){}
async function deleteUserEducation(educationId){
    try{
        const education = await Education.deleteOne({_id:educationId})
        return education
    }
    catch(err){return err}
}


module.exports = {
    getAllEducations,
    getEducation,
    getUserEducations,
    createUserEducation,
    updateUserEducation,
    deleteUserEducation
}