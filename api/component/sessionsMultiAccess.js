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

          s.sessionsArr = sessions;
          s.sessions    = sessions.join('.');

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
    /**/
    // Join to Sessions
    if (req.isSocket) {
      req.socket.join(req.sessionID);
    };
    /**/

    req.generateEmitToAllRoomsSesion = function (){
      try {
        sessions = req.sessiond.sessionsArr || [req.sessionID];

        req.generateStatus(function(statusData){
          sessions.forEach(function (room){
            sails.io.sockets.in(room).emit("update_status", statusData);
          });
        });
      } catch (err) {
      }
    }

    req.generateStatus = function (cb) {
      var dataReturn = {
      };


      dataReturn.login = (function () {
        return !!(req.sessiond.user && req.sessiond.status);
      })();


      dataReturn.momory = (function() {
        if (dataReturn.login) {
          return req.datad;
        };
      })();

      // callbackToFindUser = function(err, user){
      //   if (err) {
      //     req.badRequest();
      //   } else {
      //     dataReturn.user = user;
      //     cb(dataReturn);
      //   }
      // }

      if (dataReturn.login) {
        dataReturn.user = req.sessiond.user;
      }
      //   User
      //     .findOne(req.sessiond.user.id)
      //     .populate("groups")
      //     .exec(callbackToFindUser);
      // } else {
      // }


      if (dataReturn.login && dataReturn.user) {
        User
          .findOne(dataReturn.user)
          .populate('groups')
          .populate('permissions')
          .exec(function (err, userr){
            if (!err) {
              dataReturn.user = userr.toObject();
              delete dataReturn.user.password;
              delete dataReturn.user.typePassword;
            };
            cb(dataReturn);
          });
      } else {
        cb(dataReturn);
      }

      // cb(dataReturn);

      // // sails.log(sails.io.sockets);

    }

    req.sessiond = {};
    req.datad = {};
    req.getSessiond(function(err, sd){
      if (err) {
        res.serverError();
      } else {

        req.sessiond = sd;
        req.datad    = sd.memory;

        next();
      }
    });
  },

};
