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

import DetailWindow from './DetailWindow';
import { formatTimestamp } from '../../../utils/requestUtils';

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

// This is really a table row, not a table body
class EnhancedTableBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  onClick = () => {
    this.setState({expanded: true});
  }

  onClose = () => {
    this.setState({expanded: false});
  }

  render() {
    const {request, checked, onCheckbox} = this.props;

    return (
      <React.Fragment>
        <TableRow hover>
          <TableCell padding="checkbox">
            <Checkbox checked={checked} onChange={onCheckbox} />
          </TableCell>
          <TableCell onClick={this.onClick} style={{ paddingLeft: '0', textAlign: 'left', color: '#757575' }}>{request.name}</TableCell>
          <TableCell onClick={this.onClick} style={{ textAlign: 'left' }}>{request.request.message.substring(0, 20)}</TableCell>
          <TableCell onClick={this.onClick} style={{ textAlign: 'left' }} numeric>{formatTimestamp(request.date)}</TableCell>
          <TableCell onClick={this.onClick} style={{ textAlign: 'center' }} numeric>{getIconByState(request.state)}</TableCell>
        </TableRow>
        <DetailWindow
          request={request}
          open={this.state.expanded}
          onClose={this.onClose}
        />
      </React.Fragment>
    );
  }
}

EnhancedTableBody.propTypes = {
  request: PropTypes.object.isRequired,
  checked: PropTypes.bool.isRequired,
  onCheckbox: PropTypes.func.isRequired,
};

export default EnhancedTableBody;
