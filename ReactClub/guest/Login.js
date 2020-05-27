import React from "react";
import ReactDOM from "react-dom";
//import GuestpageContent from "./guestApp.js";
//import MemberpageContent from "./memberApp.js";
//import AdminpageContent from "./adminApp.js";

class Login extends React.Component 
{
  constructor(props) {
        super(props);
       
    }
    
    //previous code
   /* loginbuttonhandler(event)
    {
        console.log(event);
    console.log(event.target)
    console.log("You pressed login button");
     let e = document.getElementById("email");
       
        if(e.value == "admin@email.org")
            {
             console.log(e.value);
            this.props.passedloginFunction("admin");
                
            }
        if(e.value == "member@email.org")
            {
            console.log(e.value);
               
                this.props.passedloginFunction("member");
            }
        if(e.value != "member@email.org" && e.value != "admin@email.org")
            {
            console.log(" G");
             this.props.passedloginFunction("guest");
        }
            
    }*/
    //new code with fetch call
    loginclick()
    {
        let that =this;
        let e = document.getElementById("email");
        let p = document.getElementById("pwd");
        console.log("button pressed");
        let data ={
                    "email": e.value, 
                    "password": p.value
                    }
      
        console.log(data);
    fetch('/login', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) =>
              {
        // console.log('Request status code: ', response.statusText, response.status, response.type);
        return response.json()
        })
        .then(function(response) 
              {
         console.log(response);
               //that.props.name(response);
           that.props.passedloginFunction(response);
           
         })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        });

        
    }
    
    render() {
        
        
    let cont=<>
            <section id="Login_box">
            <div className ="container">
                <div>
                    <h1 className="myfont">LOGIN</h1>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" id="email" name="sample" />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" id="pwd" placeholder="password" />
                </div>
                <div>
                <button onClick={this.loginclick.bind(this)} id="login_button"> Login </button>
                </div>
            </div>
        </section>
        </>;
        
    let cont2=<>
        <p id="par"></p></>;
        
        
        
        return cont2,cont ;
        
       }
    
}
ReactDOM.render(<Login />, document.getElementById("root"));
    export default Login;