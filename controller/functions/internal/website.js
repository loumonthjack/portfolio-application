const Website = require("../../../portfolio-application/models/Website")
const { getUserEducations } = require('./education');
const { getUserExperiences } = require('./experience');
const { getUserProfile } = require('./profile');
const { getUserProjects } = require('./project');
const { getUserRole } = require('./user')

async function getWebsite(userId){
    const website = await Website.find({userId:userId});
    const userType = getUserRole(userId);

    if(userType == 'basic'){
        return null
    }
    else if(userType == 'plus'){
        return {
            website: {
                s3Url: website.s3Url,
                userId: userId
            }
        }
    }
    else if(userType == 'premium'){
        return website
    }
}
async function getWebsiteByUrl(requestUrl){
    try{
        if(requestUrl.includes('s3')){
            const website = await Website.findOne({ s3Url:requestUrl});
            const profile = await getUserProfile(website.userId);
            const projects = await getUserProjects(website.userId);
            const schools = await getUserEducations(website.userId);
            const experiences = await getUserExperiences(website.userId);
            return projects, schools, experiences, profile;
        }else{
            const website = await Website.findOne({aliasUrl:requestUrl});
            const profile = await getUserProfile(website.userId);
            const projects = await getUserProjects(website.userId);
            const schools = await getUserEducations(website.userId);
            const experiences = await getUserExperiences(website.userId);
            return projects, schools, experiences, profile;
        }
    }catch(err){ return err }
    
}
async function createUserWebsite(userId, data){
        if(userType == "premium" || "plus"){
            let website = await Website.create({
                s3Url: `http://${userId}.s3-website-us-west-2.amazonaws.com`,
                aliasUrl: data.aliasUrl,
                userId: userId
            });
            return website;
        }
}
async function deleteUserWebsite(userId){}
async function updateUserWebsite(userId, data){}

module.exports={
    createUserWebsite,
    getWebsite,
    deleteUserWebsite,
    updateUserWebsite,
    getWebsiteByUrl
}