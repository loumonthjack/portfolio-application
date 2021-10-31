const Website = require("../../../models/Website")
const {
    getUserRole
} = require('./user')

async function getUserWebsite(userId) {
    const website = await Website.find({
        userId: userId
    });
    return website[0]
}
async function getWebsiteByUrl(requestUrl) {
    try {
        if (requestUrl.includes('s3')) {
            const getWebsite = await Website.find({
                s3Url: requestUrl
            });
            const website = getWebsite[0]
            const profile = await getUserProfile(website.userId);
            const projects = await getUserProjects(website.userId);
            const schools = await getUserEducations(website.userId);
            const experiences = await getUserExperiences(website.userId);
            return {
                portfolio: [projects, schools, experiences, profile]
            };
        } else {
            const getWebsite = await Website.findOne({
                aliasUrl: requestUrl
            });
            const website = getWebsite[0]
            const profile = await getUserProfile(website.userId);
            const projects = await getUserProjects(website.userId);
            const schools = await getUserEducations(website.userId);
            const experiences = await getUserExperiences(website.userId);
            return {
                portfolio: [projects, schools, experiences, profile]
            };
        }
    } catch (err) {
        return err
    }

}
async function createUserWebsite(userId, data) {
    const userType = getUserRole(userId)
    if (userType == "plus") {
        const website = await Website.create({
            s3Url: `http://${userId}.s3-website-us-west-2.amazonaws.com`,
            userId: userId
        });
        return website;
    } else if (userType == "premium") {
        const website = await Website.create({
            s3Url: `http://${userId}.s3-website-us-west-2.amazonaws.com`,
            aliasUrl: data.aliasUrl,
            userId: userId
        });
        return website;
    } else {
        return {
            message: "Website cannot be created for Basic Users! Please Upgrade account!"
        }
    }
}
async function deleteUserWebsite(userId) {}
async function updateUserWebsite(userId, data) {}

module.exports = {
    createUserWebsite,
    getUserWebsite,
    deleteUserWebsite,
    updateUserWebsite,
    getWebsiteByUrl
}