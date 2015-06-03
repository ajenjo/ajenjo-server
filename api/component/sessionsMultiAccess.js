/*******************************************************************************
* Multi access.                                                                *
*******************************************************************************/
module.exports = {

  setupSessionConfig: function (req, res, next) {
    req.sessiondAnido = function (sessionIDRemote, cb) {
      Sessions.getAsession(req.sessionID, function(err,s) {
        if (err) {

          cb(err);

        } else {
          var sessions;

          if (s.sessions) {
            sessions = s.sessions.split('.');
          } else {
            sessions = [];
          }

          sails.log(sessions);

          if (sessions.indexOf(sessionIDRemote) == -1) {
            sessions.push(sessionIDRemote);
          };
          if (sessions.indexOf(req.sessionID) == -1) {
            sessions.push(req.sessionID);
          };

          s.sessions = sessions.join('.');

          s.browser = req.header("User-Agent");

          s.ip = (function(){
            var ip = (req.headers['x-real-ip'] ||
              (req.connection || {}).remoteAddress ||
              (req.socket || {}).remoteAddress ||
              ((req.connection || {}).socket || {}).remoteAddress ||
              null);
            return ip;
          })();

          s.$save(function(err,s){
            cb(err, s);
          });
        }
      });
    };
    req.getSessiond = function (cb) {
      Sessions.getAsession(req.sessionID,function(err,s) {
        if (err) {
          cb(err);
        } else {
          cb(null, s);
        }
      });
    };
    next();
  },

  forsetGetSessionData: function (req, res, next) {
    req.sessiond = {};
    req.datad = {};
    req.getSessiond(function(err, sd){
      if (err) {
        res.serverError();
      } else {
        req.sessiond = sd;
        // req.datad    = sd.memory;

        next();
      }
    });
  },

};
