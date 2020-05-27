import React from "react";
import ReactDOM from "react-dom";
import events from "../activities"; 
import MemberTable from "./memberTable.js"; 

class MemberActivity extends React.Component 
{
  constructor(props) {
        super(props);
     
       
       this.state = {
           activities:[ ]
             }
    
        
          };
      
  
   
    
    
    componentDidMount()
    {
         let that =this;
        fetch('http://127.0.0.1:3001/activities', {
            method: 'GET',
        }).then((response) =>
              {
                return response.json()
        }).then(function(response) 
              {
              console.log(response);
             response.forEach((value) =>
                             {
                  let newacti= that.state.activities.concat({addName:value.name , addDate:value.dates});
                  that.setState({activities :newacti});
                 
             });
         })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        });

     
    }
    
   
    
    render()
    {  let n,d ="";
        let intro = <><h2 className="myfont">Club Activities</h2>
          <p>Welcome to my exciting Activities-page</p>
    </>;
       
        
       let contents ="";
      
      contents = <MemberTable activities={this.state.activities} />; 
   
        
        
       return <section id="Activities_box">{intro}{contents}</section>;
        }
        }
      

    ReactDOM.render(<MemberActivity />, document.getElementById("root"));
    export default MemberActivity;