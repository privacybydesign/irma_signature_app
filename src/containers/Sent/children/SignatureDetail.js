import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  TableRow,
  TableBody,
  Table,
  Typography,
} from '@material-ui/core';

class SignatureDetail extends Component {
  render() {
    return <div>{JSON.stringify(this.props.request.signatureResult)}</div>;
  }
}

SignatureDetail.propTypes = {
  request: PropTypes.object.isRequired,
};

export default SignatureDetail;
