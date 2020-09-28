const db = require("./connection");
const { v4: uuidv4 } = require('uuid');
const { createEntityFact } = require("../utility/modelFactory");
//  db => model , authentication

// create user in db
const createUser = createEntityFact("user");

const getById = function(id, selectionobj) {
    // get user in db
    return new Promise(function(resolve, reject) {
        db.query(`SELECT * from user WHERE uid="${id}"`, function(err, result) {
            if (err) {

                reject(err);
            } else {
                resolve(result[0])
            }
        })
    })
}

const getAll = function() {
    // get user in db
    return new Promise(function(resolve, reject) {
        db.query(`SELECT * from user`, function(err, result) {
            if (err) {

                reject(err);
            } else {
                resolve(result)
            }
        })
    })
}

const updateById = function(uid, updateObj) {
    // update 
    let updateStr = "";
    for (let key in updateObj) {
        updateStr += `${key} = "${updateObj[key]}",`
    }

    updateStr = updateStr.substring(0, updateStr.length - 1);

    var query = `UPDATE user SET ${updateStr} WHERE uid="${uid}"`
    return new Promise(function(resolve, reject) {
        db.query(query, function(err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

const deleteById = function(id) {
    // delete  user in db
    return new Promise(function(resolve, reject) {
        db.query(` DELETE  from user WHERE uid="${id}"`, function(err, result) {
            if (err) {

                reject(err);
            } else {
                resolve()
            }
        })
    })
}

module.exports.create = createUser
module.exports.getById = getById
module.exports.getAll = getAll
module.exports.updateById = updateById
module.exports.deleteById = deleteById