const User = require("../../../portfolio-application/models/User");

// FUNCTIONS
async function getAllUsers(){
    const user = await User.find()
    return user
}
async function getUser(userId){
    const user = await User.find({_id:userId})
    return user
}

async function getUserRole(userId){
    const admin = await User.findOne({_id:userId});
    return admin.role;
}

module.exports={
    getUser,
    getUserRole,
    getAllUsers
}