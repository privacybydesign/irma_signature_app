import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import {
  TableCell,
  TableRow,
} from '@material-ui/core';

// Icons
import { green, red, blue } from '@material-ui/core/colors';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Error from '@material-ui/icons/Error';
import Pending from '@material-ui/icons/HourglassEmpty';

function getIconByState(state) {
  switch (state) {
    case 'PENDING':
      return <Pending style={{color: blue[500] }} />;
    case 'VALID':
      return <CheckCircle style={{color: green[500] }} />;
    default: // We consider everything else as 'invalid', this includes: EXPIRED, INVALID_CRYPTO, UNMATCHED_REQUEST, MISSING_ATTRIBUTES
      return <Error style={{color: red[500] }} />;
  }
}

class EnhancedTableBody extends Component {
  render() {
    const {request, checked, onCheckbox} = this.props;
    return (
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox checked={checked} onChange={onCheckbox} />
        </TableCell>
        <TableCell style={{ paddingLeft: '0', textAlign: 'left', color: '#757575' }}>{request.recipient}</TableCell>
        <TableCell style={{ textAlign: 'left' }}>{request.request.message.substring(0, 20)}</TableCell>
        <TableCell style={{ textAlign: 'left' }} numeric>{request.date}</TableCell>
        <TableCell style={{ textAlign: 'center' }} numeric>{getIconByState(request.state)}</TableCell>
      </TableRow>
    );
  }
}

EnhancedTableBody.propTypes = {
  request: PropTypes.object.isRequired,
  checked: PropTypes.bool.isRequired,
  onCheckbox: PropTypes.func.isRequired,
};

export default EnhancedTableBody;
