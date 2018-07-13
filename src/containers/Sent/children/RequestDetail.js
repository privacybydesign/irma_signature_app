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
import { verifySignature } from './../../../actions';
import SignatureDetail from './SignatureDetail';

class RequestDetail extends Component {
  constructor(props) {
    super(props);
    const { request, requests, dispatch } = this.props;
    if (request.signature !== undefined)
      dispatch(verifySignature(request.signature, requests));

  }

  render() {
    const { request, attributeInfo, verifyResult } = this.props;
    if (attributeInfo.length === 0)
      return null;

    let signatureDetail;
    if (request.signature !== undefined && verifyResult !== undefined && verifyResult.signature !== '')
      signatureDetail = <SignatureDetail request={request} verifyResult={verifyResult} />;

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
            <TableCell>{request.request.content.map(el =>
              <AttributeChip key={el.attributes[0]} attribute={attributeInfo.find(i => i.id === el.attributes[0])} />
            )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>,
      signatureDetail !== undefined ? signatureDetail : null,
    ];
  }
}

RequestDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  request: PropTypes.object.isRequired,
  requests: PropTypes.arrayOf(PropTypes.object).isRequired,
  attributeInfo: PropTypes.arrayOf(PropTypes.object).isRequired,
  verifyResult: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  const { attributeSearch, signatureVerify, storage } = state;
  const verifyResult = ownProps.request.signature !== undefined
    ? signatureVerify.verifications[ownProps.request.signature] : undefined;
  return {
    attributeInfo: attributeSearch.attributeResult,
    verifyResult,
    requests: storage.requests,
  };
}

export default connect(mapStateToProps)(RequestDetail);
