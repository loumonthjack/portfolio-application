const Profile = require("../../../models/Profile");
const {
    getUserWebsite
} = require('./website');

async function getUserProfile(userId) {
    const profile = await Profile.find({
        userId: userId
    });
    return profile;
}
async function createUserProfile(userId, data) {
    const profile = await Profile.create({
        phoneNumber: data.phoneNumber,
        picture: data.picture,
        address: data.address,
        userId: userId
    })
    return profile;
}

async function updateUserProfile(userId, data) {}
async function deleteUserProfile(profileId) {
    try {
        const profile = await Profile.deleteOne({
            _id: profileId
        });
        return profile
    } catch (err) {
        return err
    }
}


module.exports = {
    getUserProfile,
    createUserProfile,
    updateUserProfile,
    deleteUserProfile
}