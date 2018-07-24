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

// Icons
import { green, red, yellow } from '@material-ui/core/colors';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Error from '@material-ui/icons/Error';
import Warning from '@material-ui/icons/Warning';

function getIconByProofStatus(proofStatus) {
  switch (proofStatus) {
    case 'PRESENT':
      return <CheckCircle style={{color: green[500] }} />;
    case 'MISSING': // TODO other icon for missing attributes?
      return <Error style={{color: red[500] }} />;
    case 'INVALID_VALUE':
      return <Error style={{color: red[500] }} />;
    default: // We consider everything else as 'extra, don't know what to do with it'
      return <Warning style={{color: yellow[500] }} />;
  }
}

class AttributeResultTable extends Component {

  getAttributeName(id) {
    // Binary search for the matching element in the attributeResults array
    const { attributeResult } = this.props;
    const N = attributeResult.length;
    let low = 0;
    let high = N;
    while (high - low > 1) {
      let mid = Math.floor((high + low) / 2);
      if (attributeResult[mid].id > id)
        high = mid;
      else
        low = mid;
    }

    // And display result
    if (attributeResult[low].id !== id)
      return `Unknown attribute ${id}`;
    else
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
            valid: getIconByProofStatus(this.props.proofStatus),
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
      valid: getIconByProofStatus(attribute.proofStatus),
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

AttributeResultTable.propTypes = {
  matched: PropTypes.bool.isRequired,
  attributes: PropTypes.arrayOf(PropTypes.object), // Only if there are attributes disclosed
  proofStatus: PropTypes.string, // Only with unmatched requests
  attributeResult: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  const { attributeSearch } = state;

  return {
    attributeResult: attributeSearch.attributeResult,
  };
}


export default connect(mapStateToProps)(AttributeResultTable);
