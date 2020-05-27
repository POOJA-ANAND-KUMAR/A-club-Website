const DataStore = require('nedb');
const db = new DataStore({filename: __dirname + '/activitiesDB', autoload: true});
var events = require('./events.json');

// We let NeDB create _id property for us.

db.ensureIndex({ fieldName: 'name', unique: true }, function (err) {
});

db.insert(events, function(err, newDocs) {
  if(err) {
     console.log("Something went wrong when writing");
     console.log(err);
  } else {
    console.log("Added " + newDocs.length + " activities");
  }
});
