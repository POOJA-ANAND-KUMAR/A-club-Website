import React from "react";
import ReactDOM from "react-dom";
import GuestpageContent from "./guest/guestApp.js";
import MemberpageContent from "./member/memberApp.js";
import AdminpageContent from "./admin/adminApp.js";



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role:"guest",
            n:"",
            r:""
                     }; 
        this.passedloginFunction = this.passedloginFunction.bind(this);
        // We will have "user" and "admin" roles too.
    }
    
    passedloginFunction(nrole,user_info)
    {  
       this.setState({n :nrole.firstName});
       this.setState({r :nrole.role}); 
        
        
        if(nrole.role == "admin"){
            console.log("setting admin state");
            this.setState({role :"admin"}); 
        }
        else if(nrole.role == "member") {
            console.log("setting member state");
            this.setState({role :"member"});
        }
        else 
        {
                console.log("setting guest state");
                this.setState({role :"guest"});
         }
       
    }
  
    
    passedlogoutFunction(nrole,user_info)
    {
        if(nrole)
        this.setState({role :"guest"});
    }
    
   /*name(s)
    {
     n = s.firstName + s.role;
        console.log("name function");
        console.log(n);
    }*/
    
    // Renders component based on current state and props
    render() {
        let contents = null;
        
    switch (this.state.role) {
    case "guest":
      contents = <GuestpageContent passedloginFunction={this.passedloginFunction.bind(this)} />;
      break;
    case "member":
      contents = <MemberpageContent passedlogoutFunction={this.passedlogoutFunction.bind(this)} n={this.state.n} r={this.state.r} />;
      break;
    case "admin":
      contents = <AdminpageContent passedlogoutFunction={this.passedlogoutFunction.bind(this)}  n={this.state.n} r={this.state.r} />;
      break;
    
    default:
      contents = <h2>Warning something went wrong!!!</h2>;
  }
        return <div>{contents}
             </div>;
    }
}
ReactDOM.render(<App />, document.getElementById("root"));