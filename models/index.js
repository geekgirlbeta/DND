"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join("..", 'config', 'config.json'))[env]; // problem??
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};


var model = sequelize.import("user.js");
db[model.name] = model;

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;