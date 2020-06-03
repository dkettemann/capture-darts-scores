var db = require('../config/db.js');

/**
 * Used to share any functions across the application
 * could be divided into multiple parts later
 * 
 * should maybe include a headerSent method to prevent
 */

module.exports = {
  getTimestamp: function () {
    var d = new Date();
    d.setHours(d.getHours());
    return d;
  },

  log: function (message) {
    var d = new Date();
    d.setHours(d.getHours());
    var date = d.toString().substr(0, 24)
    console.log(date + " " + this.user + " " + this.method + ": " + message)
    return true;
  },

  error: function (message) {
    var d = new Date();
    d.setHours(d.getHours());
    var date = d.toString().substr(0, 24)
    console.error(date + " " + this.user + " !!ERROR!! in: " + this.method + ": " + message)
    return true;
  },

  userNotFound: function (res, req, user) {
    var req = req;
    var ld = {
      method: "userNotFound()",
      user: req.body.user_id,
      log: this.log
    }
    if (user == undefined) {
      ld.log("user not found")
      res.status(401).send({ error: 'user not found' });
      return true;
    }
    return false;
  },

  folderNotFound: function (res, folder) {
    if (folder == null) {
      console.log("folder is null")
      res.send({ error: 'folder not found' });
      return true;
    }
    return false;
  },

  storeChatMessage: function (data) {

  }
};