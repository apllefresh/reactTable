import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactTable from 'react-table'
//const ReactTable = window.ReactTable.default;

class MyTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selected: {}, selectAll: 0, data: makeData() };

    this.toggleRow = this.toggleRow.bind(this);
  }

  toggleRow(firstName) {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[firstName] = !this.state.selected[firstName];
    this.setState({
      selected: newSelected,
      selectAll: 2
    });
  }

  toggleSelectAll() {
    let newSelected = {};

    if (this.state.selectAll === 0) {
      this.state.data.forEach(x => {
        newSelected[x.firstName] = true;
      });
    }

    this.setState({
      selected: newSelected,
      selectAll: this.state.selectAll === 0 ? 1 : 0
    });
  }

  render() {
    const columns = [
      {
        Header: "Name",
        columns: [
          {
            id: "checkbox",
            accessor: "",
            Cell: ({ original }) => {
              return (
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={this.state.selected[original.firstName] === true}
                  onChange={() => this.toggleRow(original.firstName)}
                />
              );
            },
            Header: x => {
              return (
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={this.state.selectAll === 1}
                  ref={input => {
                    if (input) {
                      input.indeterminate = this.state.selectAll === 2;
                    }
                  }}
                  onChange={() => this.toggleSelectAll()}
                />
              );
            },
            sortable: false,
            width: 45
          },
          {
            Header: "First Name",
            accessor: "firstName"
          },
          {
            Header: "Last Name",
            id: "lastName",
            accessor: d => d.lastName
          }
        ]
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age"
          }
        ]
      }
    ];

    return (
      <div>
        <ReactTable
          data={this.state.data}
          columns={columns}
          defaultSorted={[{ id: "firstName", desc: false }]}
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
