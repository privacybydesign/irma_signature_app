import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  TableCell,
  TableRow,
  TableBody,
  Table,
  Typography,
} from '@material-ui/core';

import AttributeChip from '../../AttributeChip';
import AttributeResultTable from '../../AttributeResultTable';

class RequestDetail extends Component {
  render() {
    const { request, attributeInfo } = this.props;
    if (attributeInfo.length === 0)
      return null;
    
    let attributeDetail;
    if (request.signature !== undefined)
      attributeDetail = (
        <TableCell>
          <AttributeResultTable
            matched={true}
            attributes={request.signatureResult.disjunctions}
            proofStatus={request.signatureResult.proofStatus}
          />
        </TableCell>
      );
    else
      attributeDetail = (
        <TableCell>
          {request.request.content.map(el =>
            <AttributeChip key={el.attributes[0]} attribute={attributeInfo.find(i => i.id === el.attributes[0])} />
          )}
        </TableCell>
      );

    const cellStyle = { color: '#757575' };
    return [
      <Typography key="title" variant="title" style={{ marginTop: 20 }}>
        Request Details
      </Typography>,
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
      </Table>
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
