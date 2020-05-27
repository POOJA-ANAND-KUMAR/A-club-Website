const fs = require('fs');
const bcrypt = require('bcryptjs');
var events = require('./events.json');

var users = require('./temp.json');

/*var users =[
{
"firstName": "Melia",
"lastName": "Barker",
"email": "tirrivees1820@outlook.com",
"password": "49OqspUq",
"role": "admin"
},
{
"firstName": "Demetrice",
"lastName": "Parker",
"email": "chihuahua1899@gmail.com",
"password": "'E`Gj3iJ",
"role": "member"
},
{
"firstName": "Ligia",
"lastName": "Hudson",
"email": "umbrate1989@yahoo.com",
"password": "n3pLS4|=",
"role": "member"
}
    ];
    */

let nRounds = 17;
let hashedUsers = [];
let start = new Date(); // timing code

//const myPlaintextPassword = 's0/\/\P4$$w0rD';

console.log(`Starting password hashing with nRounds = ${nRounds}, ${start}`);

// Your code here to process the passwords

/*users.forEach((value,index) =>
              {
                bcrypt.genSalt(nRounds, function(err, salt) {
                                          bcrypt.hash(value.password, salt, function(err, hash) {
                    // Store hash in your password DB.
                   // console.log(`value is ${index} ${hash}`);
                                              var ele = {
                                                  firstName: value.firstName,
                                                  lastName: value.lastName,
                                                  email: value.email,
                                                  password: hash,
                                                  role: value.role
                                                }
                                                  
                                              
                        hashedUsers.push(ele);
                    
                      // console.log(hashedUsers);
                       fs.writeFileSync("clubUsersHash.json", JSON.stringify(hashedUsers, null, 2));                                                   
                                                                 });
                    
                    
                });
});
*/

var salt = bcrypt.genSaltSync(nRounds);
users.forEach((value,index) =>
              {
var hash = bcrypt.hashSync(value.password, salt);
     var ele = {
                firstName: value.firstName,
                lastName: value.lastName,
                email: value.email,
                password: hash,
                role: value.role
                }
                                                  
                                              
                hashedUsers.push(ele);
                    });

let elapsed = new Date() - start; // timing code
console.log(`Finished password hashing, ${elapsed/1000} seconds.`);
fs.writeFileSync("clubUsersHash.json", JSON.stringify(hashedUsers, null, 2));