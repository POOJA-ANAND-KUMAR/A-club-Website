const rp = require("request-promise-native");
const cookieJar = rp.jar();

let show = 
        {
        uri: "http://127.0.0.1:3001/activities",
        method: "GET", 
        json:true,
        resolveWithFullResponse: true
};

const add = 
            {
                  url: 'http://127.0.0.1:3001/activities',
                  method: "POST",
                  json: true,
                  jar: cookieJar,
                  body: {name: "Snorrrrkel Gold ", dates: "Anyme"},
                  resolveWithFullResponse: true
             
};
let adminUser = 
           {
                    uri: "http://127.0.0.1:3001/login",
                    method: "POST", 
                    json:true,
                    body: {"email": "tirrivees1820@outlook.com", "password": "49OqspUq"},
                    jar: cookieJar,
                    resolveWithFullResponse: true
   
};
let memberUser = 
           {
                    uri: "http://127.0.0.1:3001/login",
                    method: "POST", 
                    json:true,
                    body: {"email": "chihuahua1899@gmail.com", "password": "'E`Gj3iJ"},
                    jar: cookieJar,
                    resolveWithFullResponse: true
   
};
let guestUser = 
           {
                    uri: "http://127.0.0.1:3001/login",
                    method: "POST", 
                    json:true,
                   body: {"email": "blahblah@outlook.com", "password": "doesntmatter"},
                    jar: cookieJar,
                    resolveWithFullResponse: true
   
};



let logout =
           {
                    uri: "http://127.0.0.1:3001/logout",
                    method: "GET", // What does this do?
                    jar: cookieJar,
                    json:true,
                    resolveWithFullResponse: true
    
};



async function addact()
{
    
       console.log("Add activity test 1: Admin login");
        let res = await rp(adminUser);
        var cookie_string = cookieJar.getCookieString(adminUser.uri);
        console.log(`Admin login,cookies : ${cookie_string}`);
    
        //check the number of activities
        res = await rp(show);
        let arr =res.body;
        console.log(`The number of activities : ${arr.length} `);
     
       //Add a activity, show number of activities and cookies
        res = await rp(add);
        let ar =res.body;
        console.log(`After add number of activities : ${ar.length} `);
        var cookie_string = cookieJar.getCookieString(add.url);
        console.log(`cookies : ${cookie_string}`);
        
       //logout
        res = await rp(logout);
        var cookie_string = cookieJar.getCookieString(logout.uri);
        console.log(`After Logout,cookies : ${cookie_string}`);
    
        //memberlogin
        console.log("Add activity test 2: Member login");
        res = await rp(memberUser);
        var cookie_string = cookieJar.getCookieString(memberUser.uri);
        console.log(`Member login,cookies : ${cookie_string}`);
     
         res = await rp(show);
         arr =res.body;
        console.log(`The number of activities : ${arr.length} `);
      
    try
        {
            res = await rp(add);
            }
    catch(e)
        {
            console.log("Member add activity error:");
            console.error("Status code error : " + e.message);
            
            }
        res = await rp(show);
         arr =res.body;
        console.log(`The number of activities : ${arr.length} `);
    
        res = await rp(logout);
        var cookie_string = cookieJar.getCookieString(logout.uri);
        console.log(`After Logout,cookies : ${cookie_string}`);
       
        //guest
         console.log("Add activity test 3: Guest");
         res = await rp(show);
         arr =res.body;
         console.log(`The number of activities : ${arr.length} `);
    
    try
        {
             res = await rp(add);
        
    }
    
    catch(e)
        {
            console.log("Bad password login error:");
            console.error("Status code error : " + e.message);
        }
            
            console.log("After activities test 3:");
            res = await rp(show);
            var cookie_string = cookieJar.getCookieString(show.uri);
            console.log(`cookies : ${cookie_string}`);
            
    
        
      
    }
addact().catch(e => console.error("error : " + e.message));