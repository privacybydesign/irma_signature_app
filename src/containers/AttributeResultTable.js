import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import flatten from 'flatten';

// Material UI
import {
Table,
TableBody,
TableCell,
TableHead,
TableRow,
} from '@material-ui/core';

class AttributeResultTable extends Component {

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

  genUnmatchedTableData = () => {
    const credentialList = this.props.attributes;

    if (credentialList === null)
      return [];


    // TODO: make this less complicated
    return flatten(
      credentialList.map(credential => (
        Object.keys(credential.attributes)
          .map(attributeId => ({
            key: attributeId,
            name: this.getAttributeName(attributeId), // TODO convert to name
            value: credential.attributes[attributeId],
          }))
      ))
    );
  }

  genMatchedTableData = () => {
    const { attributes } = this.props;
    return attributes.map(attribute => ({
      key: attribute.disclosedId,
      name: this.getAttributeName(attribute.disclosedId), // TODO use attribute name or label?
      value: attribute.disclosedValue,
    }));
  }

  genTableBody = () => {
    const { matched } = this.props;

    if (this.props.attributes === undefined)
      return <TableBody><TableRow /></TableBody>;


    const tableData = (matched ? this.genMatchedTableData() : this.genUnmatchedTableData());

    return (
      <TableBody>
        {tableData
          .map(el => (
            <TableRow key={el.key} >
              <TableCell>{el.name}</TableCell>
              <TableCell style={{fontWeight: 'bold'}}>{el.value}</TableCell>
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
          </TableRow>
        </TableHead>
        {this.genTableBody()}
      </Table>
    );
  }
}

AttributeResultTable.propTypes = {
  matched: PropTypes.bool.isRequired,
  attributes: PropTypes.arrayOf(PropTypes.object), // Only if there are attributes disclosed
  attributeResult: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  const { attributeSearch } = state;

  return {
    attributeResult: attributeSearch.attributeResult,
  };
}


export default connect(mapStateToProps)(AttributeResultTable);
