import React from "react";
import ReactDOM from "react-dom";

class ActivityTable extends React.Component 
{
  constructor(props) {
        super(props);
     
      }
     delbuttonhandler(index)
    {
       

        
      this.props.deleteitem(index);
        
        
    }
  
       render()
    {  
       
         //  <td><button onClick={this.delbuttonhandler.bind(this)}>Delete</button></td>
    let h = <>

            <th></th>
            <th>Events</th>
        <th>Dates</th> 
        </>;
        
        let rows =  this.props.activities.map((listItems,index)=>{
            let p= <tr key= {listItems.addName}>
              <td><button onClick={this.delbuttonhandler.bind(this,index)}>Delete</button></td>
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

  export default ActivityTable;