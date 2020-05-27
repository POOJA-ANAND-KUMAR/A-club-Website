import React from "react";
import ReactDOM from "react-dom";
import snorkell from "../../images/snorkl-index.png";
import HomeContent from "../guest/Home.js";
import AboutContent from "../guest/About.js";
import Login from "../guest/Login.js";
import AdminActivity from "./AdminActivity.js"

class AdminpageContent extends React.Component 
{
    constructor(props) {
        super(props);
        this.state = {show:"home"}; 
         //this.passedFunction = this.passedFunction;
        // We will have "user" and "admin" roles too.
    }
   

    homeHandler(event) {
        console.log(event);
    console.log(event.target);
    console.log("You pressed home");
    this.setState({show: "home"});
  }
     aboutHandler(event) {
    this.setState({show: "about"});
  }
    editactivitiesHandler(event) {
    this.setState({show: "edit-activities"});
  }
    membershipHandler(event) {
    this.setState({show: "membership"});
  }
    tidesHandler(event) {
    this.setState({show: "tides"});
  }
 /*   logoutHandler(event) {
          this.props.passedlogoutFunction("guest");
    //this.setState({show: "logout"});
  }
    */
    
     logoutHandler(event) {
         let that =this;
        fetch('/logout', {
            method: 'GET',
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        });

       that.props.passedlogoutFunction("guest");   
    }
    
   
    render() {
     let x = this.props.n;
    let contents =null;
    let stat =<nav>
    <ul>
      <li onClick={this.homeHandler.bind(this)}>Home</li>
      <li onClick={this.aboutHandler.bind(this)}>About</li>
      <li onClick={this.editactivitiesHandler.bind(this)}>Edit Activities</li>
      <li onClick={this.membershipHandler.bind(this)}>Members Only</li>
      <li onClick={this.tidesHandler.bind(this)}>Tides</li>
      <li onClick={this.logoutHandler.bind(this)}>Logout</li>
    </ul>
    <h4>{this.props.n} : {this.props.r} </h4>
</nav>;
    
    switch (this.state.show)
    {
     case "home":
      contents = <HomeContent />;
      break;
     case "about":
      contents = <AboutContent />;
      break;
     case "edit-activities": 
      contents =<AdminActivity />;
      break;
   
    default:
      contents = <h2>This content is not yet added!!</h2>;
      break;
    }
    return(
    <div>{stat}{contents}</div>
    );
}
    }
ReactDOM.render(<AdminpageContent />, document.getElementById("root"));
export default AdminpageContent;
    
 