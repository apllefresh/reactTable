import React, { Component } from 'react';
import './App.css';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class MyTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: makeData(), columns : getColumns(), options : getOptions(), inputList : getInputs() };
     this.hideInput = this.hideInput.bind(this);
  }

  
  handleChange = (event) => {
      var newOptions = [];
      for (var i = this.state.inputList.length - 1; i >= 0; i--) {
        if (this.state.inputList[i].value === event.value) 
          this.state.inputList[i].view = 1;
          if (this.state.inputList[i].view === 0)
          {
          var newOption = {
              label : this.state.inputList[i].label,
              value : this.state.inputList[i].value,
          };
          newOptions.push(newOption);
        }
      }
      var index = this.state.inputList.indexOf(event.value);
      
    this.setState({options:  newOptions  });
     this.setState({input: this.reLoad() });  
  };

  hideInput = () => {
       var newOptions = [];
      for (var i = this.state.inputList.length - 1; i >= 0; i--) {
          if (this.state.inputList[i].view === 0)
          {
          var newOption = {
              label : this.state.inputList[i].label,
              value : this.state.inputList[i].value,
                   };
          newOptions.push(newOption);
        }
      }
      
      this.setState({options:  newOptions  });

       this.setState({input: this.reLoad() });  
    }

  reLoad = function ()  
  {
      return (
        <div onClick={()=> this.hideInput() }>
      {this.state.inputList.map(function(name, index){
                     if (name.view === 1)
                    return ( 
                        <div key={ index }>
                          <input type="text" value={name.value} key={ index } />
                          <button onClick={()=> name.view = 0 } id={name.value} key={ index } >X</button>
                        </div>)
                  })}
          </div>
          )
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