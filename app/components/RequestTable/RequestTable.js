import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export default class RequestTable extends Component {

  generateTableRow = (key, from, name, message, status) =>
    (
      <TableRow key={key}>
        <TableRowColumn>{from}</TableRowColumn>
        <TableRowColumn>{name}</TableRowColumn>
        <TableRowColumn>{message}</TableRowColumn>
        <TableRowColumn>{status}</TableRowColumn>
      </TableRow>
    )

  generateTableBody = (requests) => (
    (requests && requests !== 'null')
      ?
        <TableBody displayRowCheckbox={false}>
          {Object.keys(requests).map((key) => {
            const status = requests[key].state;
            const request = requests[key].request;
            if (!request) {
              return '';
            }
            const from = request.from;
            const name = request.name;
            const message = request.message;
            return this.generateTableRow(key, from, name, message, status);
          })}
        </TableBody>
      :
        <TableBody />
  )

  render() {
    const { requests } = this.props;
    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>From</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Message</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        {this.generateTableBody(requests)}
      </Table>
    );
  }
}

RequestTable.propTypes = {
  requests: PropTypes.objectOf(PropTypes.object),
};

RequestTable.defaultProps = {
  requests: {},
};
