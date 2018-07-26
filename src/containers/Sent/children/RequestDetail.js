import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  TableCell,
  TableRow,
  TableBody,
  Table,
} from '@material-ui/core';

import AttributeResultTable from '../../AttributeResultTable';
import RequestedAttributeTable from './RequestedAttributeTable';

class RequestDetail extends Component {
  render() {
    const { request, attributeInfo } = this.props;
    if (attributeInfo.length === 0)
      return null;

    let attributeDetail;
    if (request.signature !== undefined) {
      attributeDetail = (
        <TableCell>
          <AttributeResultTable
            matched={true}
            attributes={request.signatureResult.disjunctions}
            proofStatus={request.signatureResult.proofStatus}
          />
        </TableCell>
      );
    } else {
      attributeDetail = (
        <TableCell>
          <RequestedAttributeTable
            attributes={request.request.content}
          />
        </TableCell>
      );
    }

    const cellStyle = { color: '#757575' };
    return [
      <Table key="table">
        <TableBody>
          <TableRow>
            <TableCell style={{ ...cellStyle, width: 150 }}>Message</TableCell>
            <TableCell>{request.request.message}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={cellStyle}>Date</TableCell>
            <TableCell>{request.date}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={cellStyle}>Attributes</TableCell>
            { attributeDetail }
          </TableRow>
        </TableBody>
      </Table>,
    ];
  }
}

RequestDetail.propTypes = {
  request: PropTypes.object.isRequired,
  attributeInfo: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  const { attributeSearch } = state;
  return {
    attributeInfo: attributeSearch.attributeResult,
  };
}

export default connect(mapStateToProps)(RequestDetail);
