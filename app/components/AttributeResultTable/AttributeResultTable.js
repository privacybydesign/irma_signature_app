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

export default class AttributeResultTable extends Component {
  generateTableRow = (name, value, status) =>
    (
      <TableRow key={`${name}+${value}+${status}`}>
        <TableRowColumn>{name}</TableRowColumn>
        <TableRowColumn>{value}</TableRowColumn>
        <TableRowColumn>{status}</TableRowColumn>
      </TableRow>
    )

  generateTableBody = (attributes) => (
    (attributes && attributes !== 'null')
      ?
        <TableBody displayRowCheckbox={false}>
          {attributes.map((attribute) => {
            const name = (attribute.name && attribute.name.en) ? attribute.name.en : '';
            const value = (attribute.value && attribute.value.en) ? attribute.value.en : '';
            const status = attribute.status;
            return this.generateTableRow(name, value, status);
          })}
        </TableBody>
      :
        <TableBody />
  )

  render() {
    const { attributes } = this.props;
    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Attribute</TableHeaderColumn>
            <TableHeaderColumn>Value</TableHeaderColumn>
            <TableHeaderColumn>Valid</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        {this.generateTableBody(attributes)}
      </Table>
    );
  }
}

AttributeResultTable.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.object),
};

AttributeResultTable.defaultProps = {
  attributes: [],
};
