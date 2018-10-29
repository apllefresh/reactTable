import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
//const ReactTable = window.ReactTable.default;

class MyTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: makeData(), columns : getColumns(), options : getOptions(), inputList : getInputs() };
     
  }

  
  handleChange = (event) => {
      for (var i = this.state.inputList.length - 1; i >= 0; i--) {
        if (this.state.inputList[i].value === event.value) 
          this.state.inputList[i].view = 1;
          //this.setState({ inputList[i].view: 1 });
      }
       this.setState({options: 
        this.state.options.filter(item => item.value !== event.value)  });
    this.reLoad();
  };

  close = (event) => {
      console.log(event);
      //this.setState({options: this.state.options.push(argument)  });   
      this.reLoad();  
    }

  reLoad = function ()  
  {
    this.setState({input: <div></div>});
    
    for (var i = this.state.inputList.length - 1; i >= 0; i--) 
    {
        if (this.state.inputList[i].view === 1)
        {
            this.setState({input: 
            <div>
            {this.state.input}
            <div>
                  <input type="text" value={this.state.inputList[i].label} />
                  <button onClick={this.close} value={this.state.inputList[i].value}
                  id={this.state.inputList[i].value}  >X</button>
              </div> </div>});
          }
    }     
    
     
     this.render();
  }
  
    
 

  render() {
    return (
      <div>
       {this.state.input}
      <Dropdown options={this.state.options} onChange={this.handleChange} placeholder="Select an option" />
        <ReactTable
          data={this.state.data}
           columns={this.state.columns}
        />
      </div>
    );
  }
}


export default MyTable;



function makeData() {
  return [
    {
      firstName: "judge",
      lastName: "babies",
      age: 16,
      j : 25
    },
    {
      
      lastName: "babies",
      age: 16
    },
    {
      firstName: "judge",
      lastName: "babies",
      age: 16
    },
    {
      firstName: "judge",
      lastName: "babies",
      age: 16
    },
    {
      firstName: "judge",
      lastName: "babies",
      age: 16
    },
  ];
}


function getColumns() {
  return [

      {
            Header: "id",
            accessor: d => d.id,
            id: "id"
      },
      {
            Header: "First Name",
            accessor: "firstName"
      },
      {
            Header: "Last Name",
            accessor: "lastName"
            
      },
      {
        Header: "Info",
        accessor: "age"
      }
    ];
}

function getOptions() {

  var newColors = [];
  var col = getColumns();
  for (var i = 0; i < col.length; i++) {
      if (col[i].Header !== "id") 
      {
          var transformed = {
              label: col[i].Header ,
              value: col[i].accessor 
          };
        newColors.push(transformed);
        }
  }

  return newColors;

}

function getInputs() {

  var newInputs = [];
  var col = getColumns();
  for (var i = 0; i < col.length; i++) {
      if (col[i].Header !== "id") 
      {
          var transformed = {
              label: col[i].Header ,
              value: col[i].accessor,
              view : 0
          };
        newInputs.push(transformed);
        }
  }

  return newInputs;

}