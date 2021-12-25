const { getSessionByToken, deleteExpiredSessions } = require('../functions/internal/session');
const { logEvent } = require('../logger');
const { _ } = require('lodash');

async function authorizeToken(req, res, next) {
  const header = req.headers['authorization'] && req.headers['authorization'].split(' ');
  if (!header || header.length !== 2) {
    const errorMessage = 'Invalid authorization header';
    logEvent(req, res, errorMessage);
    return res.status(401).json({
      message: errorMessage
    });
  }
  const result = await getSessionByToken(header[1]);
  console.log(result);
  if (_.isEmpty(result.session)) {
    const errorMessage = "Cannot authorize this request!";
    logEvent(req, res, errorMessage);
    return res.status(400).json({
      message: errorMessage
    })
  };
  const creationDate = result.session.find(session => session.token === header[1]).creation_date;
  const sessionIsExpired = ((new Date(creationDate).getTime() + (1000 * 60 * 60)) - new Date().getTime()) <= 0;
  if (sessionIsExpired) {
    deleteExpiredSessions();
    const errorMessage = 'Session expired';
    logEvent(req, res, errorMessage);
    return res.status(401).json({
      message: errorMessage
    });
  };
  const user = result.session.find(session => session.token === header[1]);
  if(!user) {
    const errorMessage = "This request can not be authorized!";
    logEvent(req, res, errorMessage);
    return res.status(400).json({
      message: errorMessage
    })
  };
  if(!req.url.includes(`/${user.userId}/`)) {
    const errorMessage = "Data not available for this user!";
    logEvent(req, res, errorMessage);
    return res.status(400).json({
      message: errorMessage
    })
  }
  
  setTimeout(deleteExpiredSessions, 12000000);
  next();
}

module.exports = { authorizeToken }