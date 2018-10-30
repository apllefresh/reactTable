import React, { Component } from 'react';
import './App.css';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class MyTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: makeData(), columns : getColumns(), options : getOptions(), inputList : getInputs(), filterList : getFilters() };
     //this.hideInput = this.hideInput.bind(this,this.id);
      this.state.filter = '';
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
    this.setState({options:  newOptions  });
     this.setState({input: this.reLoad() });  
  };

  hideInput = function(e) {
     // console.log(e );
  
        var newOptions = [];
      for (var i = this.state.inputList.length - 1; i >= 0; i--) {
          if (this.state.inputList[i].value === e) 
              {
                this.state.inputList[i].view = 0;
                this.state.filterList[i].value = '';
              }
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

     changeInput = function (e)  
     {
        var _filter='';
        for (var i = this.state.filterList.length - 1; i >= 0; i--) 
        {
          if (this.state.filterList[i].key === e.id) this.state.filterList[i].value = e.value;
          if (this.state.filterList[i].value.trim().length > 0)  
            {
              if (_filter.length >= 1) _filter = _filter + ' and ';
                _filter = _filter + this.state.filterList[i].key + ' like "%' + this.state.filterList[i].value+'%" ';
              
            }
        }
        console.log(_filter);
        this.setState({filter: _filter});
     }

  reLoad = function ()  
  {
      var t =[];
      for (var i = this.state.inputList.length - 1; i >= 0; i--) {
        if (this.state.inputList[i].view === 1)
          {
            this.setState({idd : i.toString()})    ;
            var ttt = 
                        <div>
                          <input type="text" id={this.state.inputList[i].value} placeholder={this.state.inputList[i].value} onChange={(e)=>this.changeInput(e.target)} />
                          <button onClick={(i)=>{this.hideInput(i.target.id)}} id={this.state.inputList[i].value}>X</button>
                        </div>;
            t.push(ttt);
          } 
      }
      //console.log(t);

        return (
            <div>
              {t.map(function(tt, index)
                {
                     return ( 
                            <div key={ index }>
                              {tt}
                            </div>)
              })}
            </div>);
              
  }
  
 
  render() {
    return (
      
      <div>
       <div>
       {this.state.input}
        </div>
      <Dropdown options={this.state.options} onChange={this.handleChange} placeholder="Select an option" />
        <ReactTable    data={this.state.data}    columns={this.state.columns}   />
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
            id: "id",
            show: false
      },
      {
            Header: "First Name",
            accessor: "firstName",
            type : "text"
      },
      {
            Header: "Last Name",
            accessor: "lastName",
            type : "select",
            options : [ {label : "1", value : "2"}]
      },
      {
        Header: "Info",
        accessor: "age",
        type : "checkbox"
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
              view : 0,
              type : col[i].type,
              options : col[i].options
          };
        newInputs.push(transformed);
        }
  }

  return newInputs;

}

function getFilters() {

  var newInputs = [];
  var col = getColumns();
  for (var i = 0; i < col.length; i++) {
      if (col[i].Header !== "id") 
      {
          var transformed = {
              key: col[i].accessor,
              value : ''
              
          };
        newInputs.push(transformed);
        }
  }

  return newInputs;

}