const rp = require("request-promise-native");
let site1 = {
  uri: "http://127.0.0.1:3001/activities/",
  method: "GET", // What does this do?
    json:true,
    resolveWithFullResponse: true
   
   };
const delinfoGood = {url: 'http://127.0.0.1:3001/activities/20Vc5D41PfC4Gngf',
                    method: "DELETE",
                    json: true
                   
};
const delinfoGood2 = {url: 'http://127.0.0.1:3001/activities/2zpiR4yq1U9fZz4I',
                    method: "DELETE",
                    json: true
                   
};
const delinfoBad = {url: 'http://127.0.0.1:3001/activities/100',
                    method: "DELETE",
                    json: true
                   
};

rp(site1).then(res => {
    let arr =res.body;
    console.log(`Currently there are ${arr.length} number of activities`)
        
    return rp(delinfoGood);
    }).then(function(error, res, body) {
    console.log("After first good activity deletion");
    return rp(site1);
         }).then(res => {
                    let arr =res.body;
                    console.log(`Currently there are ${arr.length} number of activities`);
                        return rp(delinfoBad);
                    }).then(function(error, res, body) {
                        console.log("After first bad activity deletion");
                        return rp(site1);
                          }).
                       catch(e =>{ 
                       console.log("After first bad activity delete");
                       console.error("Error stack :" + e.message);
                        return rp(site1);
                  }).then(res => {
                    let arr =res.body;
                    console.log(`Currently there are ${arr.length} number of activities`);
                        return rp(delinfoGood2);
                    }).then(function(error, res, body) {
                        console.log("After another good activity deletion");
                        return rp(site1);
                            }).then(res => {
                    let arr =res.body;
                    console.log(`Currently there are ${arr.length} number of activities`);
                       })
    .catch(e => console.error("failure:" + e.message));