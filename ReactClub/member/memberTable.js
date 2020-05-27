import React from "react";
import ReactDOM from "react-dom";

class MemberTable extends React.Component 
{
  constructor(props) {
        super(props);
     
      }
    
  
       render()
    {  
       
      
    let h = <>

            
            <th>Events</th>
        <th>Dates</th> 
        </>;
        
        let rows =  this.props.activities.map((listItems,index)=>{
            let p= <tr key= {listItems.addName}>
            <td>{listItems.addName}</td>
            <td>{listItems.addDate}</td>
            </tr>;    
         return p;
            
        });
        
                 
        
         let memberTable = <>
             <h2>Activities</h2>
    <table className="myTable">
   <thead>
       <tr>
        {h}
        </tr>
    </thead>
    <tbody>{rows}</tbody>
    </table>
        </>;
        
       return  memberTable;
       
      
    }
}

  export default MemberTable;