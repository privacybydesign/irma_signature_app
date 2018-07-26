import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material UI
import {
Table,
TableBody,
TableCell,
TableHead,
TableRow,
} from '@material-ui/core';

// Icons
import { blue } from '@material-ui/core/colors';
import Pending from '@material-ui/icons/HourglassEmpty';

class RequestedAttributeTable extends Component {
  getAttributeName(id) {
    // Binary search for the matching element in the attributeResults array
    const { attributeResult } = this.props;
    const N = attributeResult.length;
    let low = 0;
    let high = N;
    while (high - low > 1) {
      const mid = Math.floor((high + low) / 2);
      if (attributeResult[mid].id > id)
        high = mid;
      else
        low = mid;
    }

    // And display result
    if (attributeResult[low].id !== id)
      return `Unknown attribute ${id}`;
    return `${attributeResult[low].name} - ${attributeResult[low].credentialName}`;
  }

  genTableData = () => {
    const { attributes } = this.props;

    if (attributes === null)
      return [];

    return attributes.map((el, index) => ({
      key: index,
      name: this.getAttributeName(el.attributes[0]),
      value: '',
      valid: <Pending style={{color: blue[500] }} />,
    }));
  }

  genTableBody = () => {
    if (this.props.attributes === undefined)
      return <TableBody><TableRow /></TableBody>;

    const tableData = this.genTableData();

    return (
      <TableBody>
        {tableData
          .map(el => (
            <TableRow key={el.key} >
              <TableCell>{el.name}</TableCell>
              <TableCell>{el.value}</TableCell>
              <TableCell>{el.valid}</TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    );
  }

  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Attribute</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Valid?</TableCell>
          </TableRow>
        </TableHead>
        {this.genTableBody()}
      </Table>
    );
  }
}

RequestedAttributeTable.propTypes = {
  attributes: PropTypes.array.isRequired,
  attributeResult: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  const { attributeSearch } = state;

  return {
    attributeResult: attributeSearch.attributeResult,
  };
}


export default connect(mapStateToProps)(RequestedAttributeTable);
