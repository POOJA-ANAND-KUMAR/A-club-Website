var express = require('express');
var app = express();
const session = require('express-session');
var bodyParser = require('body-parser');
var users = require('./clubUsersHash.json');
var bcrypt = require('bcryptjs');
var events = require('./events.json');
let sendUsers = [];
const DataStore = require('nedb');
const db = new DataStore({filename: __dirname + '/activitiesDB', autoload: true});
var Ajv = require('ajv');

var schema = require('./mySchema.json');

const cookieName = "AF9778"; // Session ID cookie name, use this to delete cookies too.

var jsonParser = bodyParser.json({ limit: '1KB' });

app.use(session({
    secret: 'Club development',
    resave: false,
    saveUninitialized: false,
    name: cookieName // Sets the name of the cookie used by the session middleware
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const setUpSessionMiddleware = function (req, res, next) {
    console.log(`session id: ${req.session.id}`);
  if (!req.session.user) {
		req.session.user = {role: "guest"};
	};
    /*if (req.session.user.role === "member") {
		req.session.user = {role: "member"};
	} 
    if (req.session.user.role === "admin") {
		req.session.user = {role: "admin"};
	} */
	next();
};

app.use(setUpSessionMiddleware);

function checkAdminMiddleware(req, res, next) {
	if (req.session.user.role !== "admin") {
        console.log(req.session.user.role);
		res.status(401).json({error: "Not permitted"});
	} else {
		next();
	}
};

app.get('/users',checkAdminMiddleware, jsonParser ,function (req, res) {
    sendUsers=[];
    users.forEach((value) =>
                  {
        var ele = {
                firstName: value.firstName,
                lastName: value.lastName,
                email: value.email,
                role: value.role
                }
        sendUsers.push(ele);
    });
    res.send(sendUsers);
});




app.get('/', function (req, res) {
    res.send('Hello Website Development!');
});


app.get('/activities', function (req, res) {
    //res.json(events); // Turns JS arrays and objects into JSON
    db.find({}, function(err, docs) {
    if (err) {
        console.log("something is wrong");
       res.status(404).send({error: "Resource not found"});
        
    } else {
        console.log("We found " + docs.length + " documents");
        //console.log(docs);
        res.json(docs);
    }
    });
   
    
});


app.post('/activities',checkAdminMiddleware,jsonParser, function(req,res) {
   
    console.log(`path /activities received: ${JSON.stringify(req.body)}`);
    //events.push(req.body); // Adding to our server side array
    //res.json(events); // returning our server side array via JSON
    
    db.insert(req.body, function(err, newDocs) {
  if(err) {
     console.log("Something went wrong when writing");
     console.log(err);
     res.status(404).send({error: err});
  } else {
    console.log("Added " + newDocs.length + " activities");
     res.json(newDocs); 
  }
      });
    
});

app.post('/login', jsonParser, function(req,res) {
    
   
    
    let email = req.body.email;
	let password = req.body.password;
	// Find user
	let auser = users.find(function (user) {
		return user.email === email
	});
	if (!auser) {// Not found
		res.status(401).json({error: true, message: "User/Password error"});
		return;
	}
	let verified = bcrypt.compareSync(password, auser.password); // compare normal pwd with hashed pwd
	if (verified) {
        
        // Upgrade in priveledge, should generate new session id
		// Save old session information if any, create a new session
		let oldInfo = req.session.user;
		req.session.regenerate(function (err) {
			if (err) {
				console.log(err);
			}
			
            let newUserInfo = Object.assign(oldInfo, auser);
			delete newUserInfo.password;
			req.session.user = newUserInfo;
             
			
            res.json(newUserInfo);
        
       /* var userinfo = {
                firstName: auser.firstName,
                lastName: auser.lastName,
                email: auser.email,
                role: auser.role
                }
			res.json(userinfo);
            */
		});
    }
	 else {
		res.status(401).json({error: true, message: "User/Password error"});
	}
    });

app.get('/logout', function (req, res) {
    let options = req.session.cookie;
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        res.clearCookie(cookieName, options); // the cookie name and options
        res.json({message:""});
    })
});


/*app.delete('/activities/:i', express.json(), function(req,res) {
    let i = req.params.i;
 console.log(`trying to delete activity ${i}`);
    if (i>=events.length)
        {
            console.log(`Bad activity deletion on index  ${i}`);
            res.status(400).send({error:'true' , message : 'bad Index!'});
    
        }
    else
        {
            events.splice(i,1);  
            res.json(events);
        }
});*/

app.delete('/activities/:_id', express.json(), function(req,res) {
    let i = req.params._id;
 console.log(`trying to delete activity ${i}`);
   
    db.remove({ _id: i }, {}, function (err, numRemoved) {
  // numRemoved = 1
        if(err)
            {
            console.log(`Bad activity deletion on index  ${i}`);
            res.status(400).send({error:'true' , message : 'bad Index!'});
            }
        else{
            console.log(`Removed ${numRemoved} documents`);
        }
        });
    db.find({}, function(err, docs) {
    if (err) {
        console.log("something is wrong");
       res.status(404).send({error: "Resource not found"});
        
    } else {
        console.log("After deletion we found " + docs.length + " documents");
        //console.log(docs);
        res.json(docs);
    }
    });
    
    });


app.post('/applicants',jsonParser, function(req,res) {
   
    console.log(`path /applicants received: ${JSON.stringify(req.body)}`);
    console.log(req.body);
     var ajv = new Ajv(); 
   console.log(schema);
var validate = ajv.compile(schema);
var valid = validate(req.body);
     console.log(req.body);
if (!valid) 
        {console.log(validate.errors);
		res.status(400).json({error: validate.errors});
	} else {
		 res.status(200).send({"message":"Application was received"});
	}
    
});
       


app.use(function activityErrors(err, req, res, next) {
    console.log("Had an error");
    res.status(400).send({error:'true' , message : 'bad activity!'});
    console.log(JSON.stringify(err));
   
    return;
   
});

host = '127.0.0.1';
port = '3001';

app.listen(port, host, function () {
console.log(`Tour server listening on IPv4: ${host}:${port}`);
});