const rp = require("request-promise-native");
var data = require('./goodSchema1.json')
const goodSchema1 = {
                    uri: "http://127.0.0.1:3001/applicants",
                    method: "POST", // What does this do?
                    json:true,
                    body: data, 
                    resolveWithFullResponse: true
                    
   
   };
const goodSchema2 = {
                    url: 'http://127.0.0.1:3001/applicants',
                    method: "POST",
                    json: true,
                    body:{
                        "firstName": "POOJA Anand KUMAR",
                        "Email": "my_mail@gmail.com",
                        "Password": "123PASSWORD321",
                        "Snorkel license number":"12345678910",
                        "Skill-Level": "Advanced",
                        "Comments":"Blah ,nothing to say!"
                        },
                    resolveWithFullResponse: true
                   
};
const badpasswordSchema = {url: 'http://127.0.0.1:3001/applicants',
                    method: "POST",
                    json: true,
                           body:{
                               "firstName": "POOJA Anand KUMAR",
                               "Email": "my_mail@gmail.com",
                               "Password": "123PASSWORD3211234567",
                               "Snorkel license number":"12345678910",
                               "Skill-Level": "Advanced",
                                "Comments":"Blah ,nothing to say!"
                                },
                    resolveWithFullResponse: true
                   
};
const badskilllevelSchema2 = {url: 'http://127.0.0.1:3001/applicants',
                    method: "POST",
                    json: true,
                              body:{
                                  "firstName": "POOJA",
                                  "Email": "my_mail@gmail.com",
                                  "Password": "123PASSWORD",
                                  "Snorkel license number":"12345678910snl",
                                  "Skill-Level": "none",
                                    "Comments":"Blah ,nothing to say!"
                    },
                    resolveWithFullResponse: true
                   
};

async function checkSchema()
{
    
       console.log("Test 1: Good Schema");
        let res = await rp(goodSchema1);
        console.log("Application result :");
        console.log(res.body);
    
     console.log("Test 2:Another Good Schema");
        res = await rp(goodSchema2);
         console.log("Application result :");
         console.log(res.body);
   
    console.log("Test 3:Bad Schema1");     
   try{
       res = await rp(badpasswordSchema);
        }
    catch(e)
    {   
        console.log("Application result :");
         console.error("error : " + e.message);
        }
     console.log("Test 4:Bad Schema2");     
    try{
        res = await rp(badskilllevelSchema2);
        }
      catch(e)
      {
          console.log("Application result :"); 
          console.error("error : " + e.message);
        
        }      
    }
checkSchema().catch(e => console.error("error : " + e.message));
