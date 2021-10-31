const { getSessionByToken, deleteExpiredSessions } = require('../functions/internal/session');
const { logEvent } = require('../logger');

function authorizeToken(req, res, next) {
    const header = req.headers['authorization'] && req.headers['authorization'].split(' ');
    if (header) {
      getSessionByToken(header[1]).then(result => {
        if (result.session.length < 1) {
          const errorMessage = "Cannot authorize this request!";
          logEvent(req, res, errorMessage);
          res.status(400).json({
            message: errorMessage
          })
        };
        if (req.url.includes(result.session[0].userId)) {
          next();
        } else {
          const errorMessage = "Cannot access user data"
          logEvent(req, res, errorMessage);
          res.status(400).json({
            message: errorMessage
          })
        }
      })
    } else {
      const errorMessage = "Not Authorized. Try Logging In.."
      logEvent(req, res, errorMessage);
      res.status(400).json({
        message: errorMessage
      })
    }
    setTimeout(deleteExpiredSessions, 12000000);
  }

module.exports = { authorizeToken }