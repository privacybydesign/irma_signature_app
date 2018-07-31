import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import {
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

class EnhancedTableHead extends Component {
  render() {
    return (
      <TableHead >
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox checked={this.props.checked} onChange={this.props.handleSelect} />
          </TableCell>
          <TableCell padding="none">Name</TableCell>
          <TableCell>Message</TableCell>
          <TableCell>Date</TableCell>
          <TableCell style={{textAlign: 'center'}}>Verified</TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default EnhancedTableHead;
