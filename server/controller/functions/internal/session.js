const Session = require("../../../models/Session");

async function getAllSessions(){
    const sessions = await Session.find()
    return sessions
}

function diff_minutes(dt2, dt1) 
 {
  let diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff)); 
 }

async function deleteExpiredSessions(){
    const sessions = await Session.find()
    const today = new Date()
    const expiredSessions = sessions.map(result => {
        const sessionTime = diff_minutes(today, result.creation_date);
        if(sessionTime > 60){ return result}
    })
    const deleteSessions = await Session.deleteMany({_id: expiredSessions});
    console.log(deleteSessions)
    return deleteSessions
}

async function deleteAllSessions(){
    const sessions = await Session.find();
    const removeAllSessions = Session.deleteMany({_id: sessions})
    return removeAllSessions;
}

// FUNCTIONS
async function getUserSession(userId) {
    const session = await Session.find({
        userId: userId
    })
    return session
}

async function getSessionByToken(token){
    const session = await Session.find({
        token: token
    })
    return {
        session: session
    }
}

async function deleteUserSessions(userId) {
    const session = await Session.deleteMany({ 
        userId: userId
    });
    return session;
}

async function createUserSession(userId, token) {
    const sessions = await getUserSession(userId);
    if(sessions.length >= 1){
        const deleteSess = await deleteUserSessions(userId);
        const session  = Session.create({
            token: token,
            userId: userId
        })
        return session
    }else{
        const session  = Session.create({
            token: token,
            userId: userId
        })
        return session
    }
}

module.exports = {
    getAllSessions,
    getUserSession,
    getSessionByToken,
    deleteExpiredSessions,
    deleteAllSessions,
    deleteUserSessions,
    createUserSession
}