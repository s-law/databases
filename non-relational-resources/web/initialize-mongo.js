var mongodb = require('mongodb');

var archiveServer = new mongodb.archiveServer('127.0.0.1', 27017, {});
var archiveDb = new mongodb.Db('archive', archiveServer);
var archiveCollection;

archiveDb.open(function(err, p_client) {
  archiveDb.createCollection('archived-pages', function(err, collection) {
    archiveCollection = collection;
    archiveDb.close();
  })
});

exports.aServer = archiveServer;
exports.aDb = archiveDb;
exports.aCollection = archiveCollection;