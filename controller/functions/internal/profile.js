const Profile = require("../../../portfolio-application/models/Profile");
const { getWebsite } = require('./website');

async function getUserProfile(userId){
    const profile = await Profile.find({userId:userId});
    return profile;
}
async function createUserProfile(userId, data){
    const website = getWebsite(userId);
    if(website){
        const profile = await Profile.create({
            phoneNumber: data.phoneNumber,
            picture: data.picture,
            address: data.address,
            websiteId: website._id,
            userId:userId
        })
        return profile;
    }else{
        const profile = await Profile.create({
            phoneNumber: data.phoneNumber,
            picture: data.picture,
            address: data.address,
            userId:userId
        })
        return profile;
    }
}

async function updateUserProfile(userId, data){}
async function deleteUserProfile(userId){}


module.exports = {
    getUserProfile,
    createUserProfile,
    updateUserProfile,
    deleteUserProfile
}