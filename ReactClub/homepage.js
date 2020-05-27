import React from "react";
import ReactDOM from "react-dom";
import snorkell from "../images/snorkl-index.png";

 
function HomepageContent()
{
// Use in JSX
let sImage = <img src={snorkell} alt="Snorkel Away" sizes="(max-width: 200px) 200px, 200px" />;


  let cont=<>
      <nav>
    <ul >
      <li>Home</li>
      <li><a href="about.html">About </a> </li>
      <li><a href="activities.html">Activities</a> </li>
      <li><a href="membership.html">Membership</a> </li>
      <li><a href="tides.html">Tides</a> </li>
        <li><a href="login.html">Login</a></li>
    </ul>
</nav>
<main>
    <h1>The Snorkelling Club</h1>
    {sImage}
    <p>Snorkeling (British and Commonwealth English spelling: snorkelling) is the practice of swimming on or through a body of water while equipped with a diving mask, a shaped breathing tube called a snorkel, and usually swimfins.</p> 
    <p>In cooler waters, a wetsuit may also be worn. Use of this equipment allows the snorkeler to observe underwater attractions for extended periods with relatively little effort and to breathe while face-down at the surface.</p>
    <p>Snorkeling is a popular recreational activity, particularly at tropical resort locations. The primary appeal is the opportunity to observe underwater life in a natural setting without the complicated equipment and training required for scuba diving. It appeals to all ages because of how little effort there is, and without the exhaled bubbles of scuba-diving equipment. It is the basis of the two surface disciplines of the underwater sport of finswimming.</p>
    <p>Snorkeling is also used by scuba divers when on the surface, in underwater sports such as underwater hockey and underwater rugby, and as part of water-based searches conducted by search and rescue teams.</p>
    </main>
    
    </>;
    
    return cont;
    
    }
export default HomepageContent;
 