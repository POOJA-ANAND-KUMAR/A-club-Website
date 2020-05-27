import React from "react";
import ReactDOM from "react-dom";
import snorkell from "../../images/snorkl-index.png";
import HomeContent from "./Home.js";
import AboutContent from "./About.js";
import Login from "./Login.js";
import Tours from "./Tours.js";

class GuestpageContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show:"home"}; 
         // this.passedFunction = this.passedFunction;
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
    activitiesHandler(event) {
    this.setState({show: "activities"});
  }
    membershipHandler(event) {
    this.setState({show: "membership"});
  }
    tidesHandler(event) {
    this.setState({show: "tides"});
  }
    loginHandler(event) {
    this.setState({show: "login"});
  }

render() {
 
    let contents =null;
    let stat =<nav>
    <ul>
      <li onClick={this.homeHandler.bind(this)}>Home</li>
      <li onClick={this.aboutHandler.bind(this)}>About</li>
      <li onClick={this.activitiesHandler.bind(this)}>Activities</li>
      <li onClick={this.membershipHandler.bind(this)}>Membership</li>
      <li onClick={this.tidesHandler.bind(this)}>Tides</li>
      <li onClick={this.loginHandler.bind(this)}>Login</li>
    </ul>
</nav>;
    
    switch (this.state.show)
    {
     case "home":
      contents = <HomeContent />;
      break;
     case "about":
      contents = <AboutContent />;
      break;
      case "login":
    contents= <Login passedloginFunction= {this.props.passedloginFunction} name={this.props.name} />; 
      break;
      case "activities":
      contents = <Tours />;
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
ReactDOM.render(<GuestpageContent />, document.getElementById("root"));
export default GuestpageContent;
 