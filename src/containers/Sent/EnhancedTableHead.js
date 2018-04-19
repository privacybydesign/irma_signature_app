import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Checkbox from 'material-ui/Checkbox';
import {
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';

class EnhancedTableHead extends Component {
  render() {
    return (
      <TableHead >
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox onChange={this.props.handleSelect} />
          </TableCell>
          <TableCell padding="none">Recipient</TableCell>
          <TableCell>Message</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Verified</TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  handleSelect: PropTypes.func.isRequired,
};

export default EnhancedTableHead;
