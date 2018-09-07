import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core';
import AttributeResultTable from '../../AttributeResultTable';
import RequestedAttributeTable from './RequestedAttributeTable';

import CloseIcon from '@material-ui/icons/Close';

import { formatTimestamp } from '../../../utils/requestUtils';

class DetailWindow extends Component {
  render() {
    const {
      request,
      attributeInfo,
      open,
      onClose,
    } = this.props;
    if (attributeInfo.length === 0)
      return null;

    let attributeDetail;
    if (request.signature !== undefined) {
      attributeDetail = (
        <AttributeResultTable
          matched={true}
          attributes={request.signatureResult.disjunctions}
          proofStatus={request.signatureResult.proofStatus}
        />
      );
    } else {
      attributeDetail = (
        <RequestedAttributeTable
          attributes={request.request.content}
        />
      );
    }

    const cellStyle = { color: '#757575' };
    return (
      <Modal open={open} onClose={onClose}>
        <Card style={{position: 'fixed', bottom: '12.5vh', top: '12.5vh', left: '12.5vw', right: '12.5vw', overflowY: 'auto'}}>
          <CardHeader
            action={
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            }
            title="Request details"
          />
          <CardContent>
            <Table key="table">
              <TableBody>
                <TableRow>
                  <TableCell style={{ ...cellStyle, width: 150 }}>Message</TableCell>
                  <TableCell>{request.request.message}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={cellStyle}>Date</TableCell>
                  <TableCell>{formatTimestamp(request.date)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Typography variant="subheading" style={{marginTop: '1em'}}>
              Requested attributes:
            </Typography>
            { attributeDetail }
          </CardContent>
        </Card>
      </Modal>
    );
  }
}

DetailWindow.propTypes = {
  request: PropTypes.object.isRequired,
  attributeInfo: PropTypes.arrayOf(PropTypes.object).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { attributeSearch } = state;
  return {
    attributeInfo: attributeSearch.attributeResult,
  };
}

export default connect(mapStateToProps)(DetailWindow);
