import React from "react";
import ReactDOM from "react-dom";
import events from "../activities"; 


class Tours extends React.Component 
{
  constructor(props) {
        super(props);
       
    }
    render()
    {  
        
        let stat =  <>
            <h2 className="myfont">Club Activities</h2>
          <p>Welcome to my exciting Activities-page</p>
        </>;
   
        let h = <>
            <th>Events</th>
        <th>Dates</th> 
        </>;
        
        
        let rows = events.map(s => 
                              (
            <tr key = {s.name}>
            <td>{s.name}</td>
            <td>{s.dates}</td>
              </tr>
            ));
                 
        
         let memberTable = 
    <table className="myTable">
   <thead>
       <tr>
        {h}
        </tr>
    </thead>
    <tbody>{rows}</tbody>
    </table>
       
        
       return <section id="Activities_box">{stat}{memberTable}</section>;
        }
        }
      

    ReactDOM.render(<Tours />, document.getElementById("root"));
    export default Tours;