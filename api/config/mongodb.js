var User = require('../models/user');
var Folder = require('../models/folder');
var Document = require('../models/document');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shared = require('../shared/shared')

daniel_id = "5bb579be2da1de14b8e0a52a"
testUser_id = "5bbacbdc20ba79681cf8959b"
main_id = "5bb7f6259e71710c04c24b95"
mathe_sub_id = "5bb8004b1f026522e8f83148"
main()

function main() {
  
  //console.log(null==undefined)
  //console.log(null!==undefined)
  console.log(7=='7')

}

function deleteAllDocumentsFromParents(){
  Folder.find({}).then(arr => {
    for (var i = 0; i < arr.length; i++) {
      arr[i].documents = []
      console.log(arr[i].documents)
      arr[i].save().then(success => console.log("success")).catch(e => console.log(e))
    }
  })
}

function addSubfolder(user_id, path) {
  console.log("Path to go: " + path)
  var user = User.findOne({ _id: user_id }).then((user) => {
    if (user) {
      folder = user.folders[0].subfolders[0]
      console.log("folder in line 20 equals:")
      console.log(folder)
      user.folders[0].subfolders[0].name = "test111"
      console.log(folder)
      // folder = folder.subfolders[path[0]]
      // for (var i = 0, len = folder.subfolders.length; i < len; i++) {
      //     folder = folder.subfolders[path[0]]
      //     console.log("current folder is:")
      //     console.log(folder)
      // }
      folder.name = "Test111";
      user.save().then(
        //when the promise resolves
        (newuser) => {
          console.log("changed user: " + newuser)
        },
        (err) => {
          console.log(err.message)
        }
      )
    } else {
      console.log("addSubfolder error: no user found")
    }
  })
}

function searchFolderWithPath(user_id, path) {
  var folder;
  return new Promise((resolve, reject) => {
    var user = User.findOne({ _id: user_id }).then((res) => {
      if (res) {
        folder = res.folders[path[0]]
        //console.log("folder search result: " + res.folders[0] + "\n")
        for (var i = 0, len = folder.subfolders.length; i < len; i++) {
          folder = folder.subfolders[path[0]]
        }
        // console.log("folder in searchFolder: ")
        // console.log(folder)
        return resolve(folder);
      }
    })
  })

}

function createFolder(name, parent_id) {
  folder = new Folder({
    name: name,
    subfolders: [],
    user_id: "5bb579be2da1de14b8e0a52a",
    parent_id: parent_id,
    status: "private",
    lastChange: shared.getTimestamp()
  })

  folder.save().then(
    //when the promise resolves
    (newfolder) => {
      console.log("newfolder successfully created")
    },
    (err) => {
      console.log(err.message)
    }
  )
  return folder;
}
function findAllFolders() {
  Folder.find({}).then((folder) => {
    console.log(folder)
  })
}

function updateFolder(id, name) {
  var f = Folder.findOne({ _id: id }).then((folder) => {
    folder.set({ name: name });

    folder.save().then(
      (newfolder) => {
        console.log(newfolder)
      },
      (err) => {
        console.log(err.message)
      }
    )
  })
}



function addSubfolderInFolderSchema(id) {
  console.log("adding subfolder:")
  var f = Folder.findOne({ _id: id }).then((folder) => {

    f = createFolder("Subfolder", id);

    folder.subfolders.push(f)

    folder.save().then(
      (newfolder) => {
        console.log(newfolder)
      },
      (err) => {
        console.log(err.message)
      }
    )
    findAllFolders();
  })
}

function updateUser() {
  var user = User.findOne({ _id: req.body.user._id }).then((user) => {
    var folder = user.folders.id(req.body.user.folder._id);
    folder.set({ name: req.body.user.folder.name });

    user.save().then(
      (newuser) => {
        res.json({
          folder: newuser,
          message: 'success'
        })
      },
      (err) => {
        res.send(500, err.message)
      }
    )
  })
}
