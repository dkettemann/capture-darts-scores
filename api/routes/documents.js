var router = require('express').Router();
var User = require('../models/user');
var Folder = require('../models/folder');
var Document = require('../models/document');
var mongoose = require('mongoose');
var fs = require('fs');
var dir = './uploads';
var multer = require('multer');
var shared = require('../shared/shared')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("req.body:")
    console.log(req.body)
    console.log("directory:")
    console.log(process.cwd())
    fs.access(dir, function(err) {
      if (err && err.code === 'ENOENT') {
        console.log("dir not found")
        // fs.mkdir(myDir); //Create dir in case not found
      }
    });
    console.log("File is:")
    console.log(file)
    console.log(req.body.user_name)
    let path = `./uploads/${req.body.user_name}`; //
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
})

const fileFilter = (req, file, cb) => {
  console.log('fileFilter: file.mimetype')
  console.log(file.mimetype)
  cb(null, true)
}

var upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 500 },
  fileFilter: fileFilter
})

router.post('/upload', upload.single('file'), (req, res) => {
  console.log('FileUpload:')
  console.log('FileUpload: req.body.user_id')
  console.log(req.body.user_id)
  console.log(req.body)

  //console.log(req.file)
  if (req.file == undefined) {
    console.log("FileUpload Error: file is undefined")
     res.send({
      error: "not accepted file type"
    }) 
    
    return;
  }
  try {
    User.findById(req.body.user_id).exec().then(user => {

      if (user == null) {
        console.log('FileUpload: ' + user + " == undefined")
        res.status(500).json({
          error: 'err',
          hint: "user not found"
        })
        return
      }

      if (!fs.existsSync(dir + '/' + user.user_name)) {
        fs.mkdirSync(dir + '/' + user.user_name);
      }


      /* console.log('FileUpload: file is:')
      console.log(req.file)
      console.log('app path (./) is:')
      var path = require('path');
      console.log(path.dirname(require.main.filename))
      console.log(process.cwd()) */

      var path = req.file.path.replace(/\\/g, "/");
      //var path = file.path.replace(/\\/g, "/");
      console.log('FileUpload: path:');
      console.log(path);

      let filetype = req.file.mimetype.split('/')
      console.log("FileUpload: filetype:");
      console.log(filetype[filetype.length - 1]);

      
      document = new Document({
        user_id: mongoose.Types.ObjectId(req.body.user_id),
        name: req.body.name,
        kind: filetype[filetype.length - 1],
        src_path: path,
        lastChange: shared.getTimestamp(),
        status: req.body.status
      })
      if (req.body.path) document.path = req.body.path;

      console.log('req.body.parent_id')
      console.log(req.body.parent_id)
      if (!req.body.parent_id) {
        console.log("no parent_id")
        user.documents.push(document._id);
        user.save().catch(err => {
          console.log(err)
          res.json({
            error: err
          })
        })
      } else if (req.body.parent_id != undefined) {
        document.parent_id = mongoose.Types.ObjectId(req.body.parent_id)
        Folder.findById(req.body.parent_id).then(folder => {
          if (folder == null) {
            console.log(folder + "!= null")
            res.status(200).json({
              error: "parent folder could not be found",
              message: "error"
            })
            return;
          } else {
            console.log("parent folder found:")
            console.log(folder)
            folder.documents.push(document._id)
            folder.save().then(folder => {
              if (folder != undefined) {
                console.log("parent folder changed:")
                console.log(folder)
              } else {
                console.log(folder)
              }
            }).catch(error => {
              console.log(error)
            })
          }
        })
      }
      document.save().then(document => {
        console.log(document)
        res.status(200).json({
          document: document,
          message: "success"
        })
      })
    })
  } catch (e) {
    console.log('Error in upload:')
    console.log(e)
    res.json({
      error: err
    })
  }
});


router.post('/deletepdf', (req, res) => {
  console.log("DeletePDF: user_id: " + req.body.user_id)

  try {
    User.findById(req.body.user_id).exec().then(user => {

      if (user == null) {

        console.log("DeletePDF: user == undefined")
        res.status(500).json({
          error: err,
          hint: "user not found"
        })
        return
      }

      if (!fs.existsSync(dir + '/' + user.user_name)) {
        fs.mkdirSync(dir + '/' + user.user_name);
      }


      console.log("DeletePDF: req.body.parent_id" + req.body.parent_id)
      if (req.body.parent_id == undefined) {
        console.log("DeletePDF: no parent_id")
        var array = user.documents
        for (let i = 0; i < array.length; i++) {
          const element = array[i];
          if (element._id == req.body._id) {
            user.documents.splice(i, 1)
            break;
          }
        }
        user.save().then(() => {
          console.log("DeletePDF: user successfully saved")
        }).catch(err => {
          console.log("DeletePDF Error:")
          console.log(err)
          res.json({
            error: err
          })
        })
        res.json({
          message: "success"
        })
      } else if (req.body.parent_id != undefined) {
        document.parent_id = mongoose.Types.ObjectId(req.body.parent_id)
        Folder.findById(req.body.parent_id).then(folder => {
          if (folder == null) {
            console.log("DeletePDF: folder not found")
            res.status(200).json({
              error: "parent folder could not be found",
              message: "error"
            })
            return;
          } else {
            console.log("DeletePDF: parent folder found")
            var array = folder.documents
            for (let i = 0; i < array.length; i++) {
              const element = array[i];
              if (element._id == req.body._id) {
                folder.documents.splice(i, 1)
                break;
              }
            }
            folder.save().then(folder => {
              if (folder != undefined) {
                console.log("DeletePDF: parent folder changed")
                console.log(folder)
              } else {
                console.log("DeletePDF Error:")
                console.log(folder)
              }
            }).catch(error => {
              console.log(error)
            })
          }
        })
      } else {
        //TODO@Daniel: do something
      }
    })
  } catch (e) {
    console.log('Error in deletePDF:')
    console.log(e)
    res.json({
      error: err
    })
  }
});

router.post('/creategdoc', (req, res) => {

  try {
    User.findById(req.body.document.user_id).exec().then(user => {
      console.log(user)
      console.log(req.body.document)

      if (user == null) {
        console.log(user + " == undefined")
        res.status(200).json({
          message: 'error',
          hint: "user not found"
        })
        next()
      }


      document = new Document({
        user_id: mongoose.Types.ObjectId(req.body.document.user_id),
        name: req.body.document.name,
        link: req.body.document.link,
        kind: "gdoc",
        lastChange: shared.getTimestamp(),
        status: req.body.document.status
      })
      if (req.body.document.path) document.path = req.body.document.path;

      if (req.body.document.parent_id == "") {
        user.documents.push(document._id);
        user.save().catch(err => {
          console.log(err)
          res.json({
            error: err
          })
        })
      }

      if (req.body.document.parent_id != "") {
        Folder.findById(req.body.document.parent_id).then(folder => {
          if (folder == null) {
            console.log(folder + "!= null")
            next();
          }
          folder.documents.push(document._id)
        })
      }
      document.save().then(document => {
        console.log(document)
        res.status(200).json({
          document: document,
          message: "success"
        })
      })
    })
  } catch (e) {
    console.log('Error in createGdoc:')
    console.log(e)
  }
});

module.exports = router;