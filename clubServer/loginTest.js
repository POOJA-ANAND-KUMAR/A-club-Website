
const rp = require("request-promise-native");
//const cookie = require('cookie');
const cookieJar = rp.jar();

let goodemailpassword = {
  uri: "http://127.0.0.1:3001/login",
  method: "POST", 
    json:true,
    body: {"email": "tirrivees1820@outlook.com", "password": "49OqspUq"},
    jar: cookieJar,
    resolveWithFullResponse: true
   
   };
let activitysite = {
    url: 'http://127.0.0.1:3001/activities',
    method: "GET",
    json: true,
    jar: cookieJar,
    resolveWithFullResponse: true
};

let bademail = {
    uri: "http://127.0.0.1:3001/login",
    method: "POST", 
    json:true,
    jar: cookieJar,
    body: {"email": "blahblah@outlook.com", "password": "doesntmatter"},
    resolveWithFullResponse: true
   
   };
let goodemailbadpassword = {
   uri: "http://127.0.0.1:3001/login",
    method: "POST", // What does this do?
    json:true,
     jar: cookieJar,
    body: {"email": "tirrivees1820@outlook.com", "password": "badpassword"},
    resolveWithFullResponse: true
   
   };
let logout ={
    uri: "http://127.0.0.1:3001/logout",
    method: "GET", // What does this do?
    jar: cookieJar,
    json:true,
    resolveWithFullResponse: true
    
}





/*async function inOrder() {
    let res = await rp(goodemailpassword);
    console.log("Good login result");
    console.log(res.body);
    
    try {
    res = await rp(bademail);
    }
    catch (e) {
    console.log("Bad email login result");
    console.error("Status code error : " + e.message);
    }
    
    try {
    res = await rp(goodemailbadpassword);
    }
    catch (e) {
    console.log("Bad password login result");
    console.error("Status code error : " + e.message);
    }
}

inOrder().catch(e => console.error("Status code error : " + e.message));
*/

async function goodLogin()
{ 
    //test 1
        console.log("Login test 1: Good login");
        let res = await rp(activitysite);
        console.log("Called activities");
        var cookie_string = cookieJar.getCookieString(activitysite.url);
        console.log(`cookies : ${cookie_string}`);
    
        console.log("After Good login");
        res = await rp(goodemailpassword);
        var cookie_string = cookieJar.getCookieString(goodemailpassword.uri);
       console.log(`cookies : ${cookie_string}`);
    
        console.log("After Logout");
        res = await rp(logout);
        var cookie_string = cookieJar.getCookieString(logout.uri);
        console.log(`cookies : ${cookie_string}`);
    
    //test 2
        console.log("Login test 2: Bad Email");
        res = await rp(activitysite);
        console.log("Called activities");
        var cookie_string = cookieJar.getCookieString(activitysite.url);
       console.log(`cookies : ${cookie_string}`);
    try{
       
        res = await rp(bademail);
        
    }
    
catch (e) {
        console.log("Bad email login error");
        console.error("Status code error : " + e.message);
        console.log("After login test 2");
        var cookie_string = cookieJar.getCookieString(bademail.uri);
        console.log(`cookies : ${cookie_string}`);
    }
    
    
    //test 3
        console.log("Login test 3: Bad password");
        res = await rp(activitysite);
        console.log("Called activities");
        var cookie_string = cookieJar.getCookieString(activitysite.url);
       console.log(`cookies : ${cookie_string}`);
        
   try{
       
       res = await rp(goodemailbadpassword);
        
    }
    
catch (e) {
        console.log("Bad password login error");
        console.error("Status code error : " + e.message);
        console.log("After login test 3");
        var cookie_string = cookieJar.getCookieString(goodemailbadpassword.uri);
       console.log(`cookies : ${cookie_string}`);
    }
    
 
}
        
goodLogin().catch(e => console.error("error : " + e.message));






/* using promises
r(goodpassword).then(res => {
    let arr =res.body;
  // console.log(`${res.body}`);
    console.log(arr);
    
   
}).catch(e => console.error("failure: WAS" + e.message));
*/