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

    this.state = { data: makeData(), columns : getColumns(), options : getOptions() };
    
  }

  
  render() {
    
    return (
      <div>
      <Dropdown options={this.state.options}  placeholder="Select an option" />
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
            Header: "First Name",
            accessor: "firstName"
      },
      {
            Header: "Last Name",
            id: "lastName",
            accessor: d => d.lastName
      },
      {
        Header: "Info",
        accessor: "age"
      }
    ];
}

function getOptions() {
  var t = this.props.columns.map((Header,accessor)=>
    label = Header,
    value = accessor
  )

  return [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'two' },
      { value: 'three', label: 'three' },

    ];
}