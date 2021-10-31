const User = require("../../../models/User");

// FUNCTIONS
async function getAllUsers() {
    const user = await User.find()
    return user.map(result => {
        return {
            id: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            role: result.role
        }
    })
}
async function getUser(userId) {
    const user = await User.find({
        _id: userId
    })
    return {
        id: user[0].id,
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        email: user[0].email,
        role: user[0].role
    }
}

async function getUserRole(userId) {
    const admin = await User.findOne({
        _id: userId
    });
    return admin;
}

async function updateUserRole(userId, priceAccess) {
    const user = await User.updateOne({
        _id: userId
    }, {
        $set: {
            role: priceAccess
        }
    });
    return user;
}

module.exports = {
    getUser,
    getUserRole,
    getAllUsers,
    updateUserRole
}