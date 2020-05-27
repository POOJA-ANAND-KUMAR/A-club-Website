const rp = require("request-promise-native");
const cookieJar = rp.jar();

let userInterface = 
        {
        uri: "http://127.0.0.1:3001/users",
        method: "GET", 
        json:true,
        jar: cookieJar,
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

async function uI()
{
        //login as admin
        console.log("Get users test 1:Admin Login");
        let res = await rp(adminUser);
        var cookie_string = cookieJar.getCookieString(adminUser.uri);
        console.log(`Admin login,cookies : ${cookie_string}`);
    
       //no of users returned
        res = await rp(userInterface);
        let a =res.body;
        console.log(`The number of users : ${a.length} `);
         
        console.log("");
        //logout
        res = await rp(logout);
        var cookie_string = cookieJar.getCookieString(logout.uri);
        console.log(`After Logout,cookies : ${cookie_string}`);
        console.log("");
    
        console.log("Get users test 1:Member Login");
        res = await rp(memberUser);
        var cookie_string = cookieJar.getCookieString(memberUser.uri);
        console.log(`Member login,cookies : ${cookie_string}`);
    
    try{
        res = await rp(userInterface);
       }
        catch(e)
        {
        console.log("member get users error");
        console.error("Status code error : " + e.message);
        console.log("");
        }
       
        res = await rp(logout);
        var cookie_string = cookieJar.getCookieString(logout.uri);
        console.log(`After Logout,cookies : ${cookie_string}`);
        console.log("");
    
        
        console.log("Guest get users test 3:Guest");
        try{
        res = await rp(userInterface);
       }
        catch(e)
        {
        console.log("guest get users error");
        console.error("Status code error : " + e.message);
        console.log("");
        }
       //cookies for uI guest
        //res = await rp(userInterface);
        var cookie_string = cookieJar.getCookieString(userInterface.uri);
        console.log(`Guest get users test 3,cookies : ${cookie_string}`);
    
}

uI().catch(e => console.error("error : " + e.message));