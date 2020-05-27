import React from "react";
import ReactDOM from "react-dom";
import events from "../activities"; 
import ActivityTable from "./ActivityTable.js"; 

class AdminActivity extends React.Component 
{
  constructor(props) {
        super(props);
     
       
       this.state = {
           activities:[ ],
           
             }
      this.onRemoveItem = this.onRemoveItem.bind(this);
        
          };
      
      
   /*   addEventDate(q) {
    this.setState({addDate: this.state.addDate.concat(q)});
    // Show the quiz so we can see it
    this.setState({actions: "add"});
  }
       addEventName(r) {
    this.setState({addName: this.state.addName.concat(r)});
    // Show the quiz so we can see it
    this.setState({actions: "add"});
  }
     */
     
   // }
   
    addbuttonhandler(event)
    { let that=this;
         console.log("You pressed add");
      
        let  namecont= document.getElementById("acti");
        let datecont= document.getElementById("dati");
       let  n = namecont.value;
        let  d = datecont.value;
       
        
      // let newact= this.state.activities.concat({addName:n , addDate:d});
      //this.setState({activities :newact});
        // this.setState({actions:"add"});
      
        let data ={
                    "name":n,
                    "dates":d
            
                  };
         fetch('/activities', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) =>
              {
                return response.json()
        }).then((response) =>
              {
              console.log(response);
                  let newacti= that.state.activities.concat({addName:response.name , addDate:response.dates,addid:response._id});
                 that.setState({activities :newacti});
                 
             
         }).catch((error) => {
            console.error('There has been a problem with your fetch operation while sending the new event to the server:', error);
        });
        
    }
    
    componentDidMount()
    {
         let that =this;
        
        
        fetch('/activities', {
            method: 'GET',
        }).then((response) =>
              {
                return response.json()
        }).then(function(response) 
              {
              console.log(response);
             response.forEach((value) =>
                             {
                  let newacti= that.state.activities.concat({addName:value.name , addDate:value.dates, addid:value._id});
                  that.setState({activities :newacti});
                 
             });
         })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        });
        
        

     
    }
    
    onRemoveItem(i)
   { 
       let that =this;
    let _id="";
       console.log("You pressed del");
       console.log(i);
     
     let list = this.state.activities.filter((item, j) => i !== j);
    
       this.setState({activities :list});
    this.state.activities.filter((item, j) =>{ 
        if(i==j)
            {
                console.log(item);
                
                _id=item.addid;
                console.log(_id);
            }
       
    });
     
        fetch('/activities/' +_id, {
            method: 'delete'
           
        }).then((response) =>
              {
        return response.json()
        })
        .then(function(response) 
              {
               console.log(response);
            response.forEach((value) =>
                             {
                console.log(value);
                 
                            });
            
         }).catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        });
        
  }
    
    render()
    {  let n,d ="";
        let intro = <><h2 className="myfont">Club Activities</h2>
          <p>Welcome to my exciting Activities-page</p>
    </>;
       
        let stat =  <>
            <div id="add_activity">
            <label>Name</label>
        <input type="text" id="acti"/>
        <label>Date(s)</label>
        <input type="text" id="dati"/>
        <button onClick={this.addbuttonhandler.bind(this)} id="edit-addb">Add</button>
            
        </div>
        </>;

       let contents ="";
      
      contents = <ActivityTable activities={this.state.activities} deleteitem={this.onRemoveItem.bind(this)} />; 
   /*  
    switch (this.state.actions)
    {
             // contents = <ActivityTable name={this.state.addName} date={this.state.addDate}/>;
     case "add":
    
     contents = <ActivityTable activities={this.state.activities} deleteitem={this.onRemoveItem.bind(this)} />;     
            
     break;
     case "del":
      contents = <ActivityTable activities={this.state.activities} deleteitem={this.onRemoveItem.bind(this)}/>;
      break;
    
      //default:
        //contents = <ActivityTable />;
     // contents = <h2>This content is not yet added!!</h2>;
      break;
    }
    */
    
        
        
       return <section id="Activities_box">{intro}{stat}{contents}</section>;
        }
        }
      

    ReactDOM.render(<AdminActivity />, document.getElementById("root"));
    export default AdminActivity;