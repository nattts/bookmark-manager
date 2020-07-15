const { Connection } = require('../db/connection.js');
const config = require('./envs.js');

let collection;

const DB_URI = 'mongodb://mongo:27017/bookmark-manager';
collection = config.development.collection;

exports.initDB = async () => await new Connection().dbConnect(DB_URI, collection);