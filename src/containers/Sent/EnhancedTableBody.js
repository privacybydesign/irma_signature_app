import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import {
  TableCell,
  TableRow,
} from 'material-ui/Table';

class EnhancedTableBody extends Component {
  render() {
    const { requests, checked, handleCheckbox } = this.props;
    return Object.keys(requests)
      .map(el => {
        const request = requests[el];
        if (request.request.from === undefined) {
          return '';
        }
        return (
          <TableRow key={el}>
            <TableCell padding="checkbox">
              <Checkbox checked={checked.indexOf(el) > -1} onChange={handleCheckbox(el)} />
            </TableCell>
            <TableCell style={{ textAlign: 'left', color: '#757575' }}>{request.recipient}</TableCell>
            <TableCell style={{ textAlign: 'left' }}>{request.request.message.substring(0,20)}</TableCell>
            <TableCell style={{ textAlign: 'left' }} numeric>{request.date}</TableCell>
            <TableCell style={{ textAlign: 'left' }} numeric>{request.state}</TableCell>
          </TableRow>
        )
      });
  }
}

EnhancedTableBody.propTypes = {
  requests: PropTypes.objectOf(PropTypes.object).isRequired,
  checked: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleCheckbox: PropTypes.func.isRequired,
};

export default EnhancedTableBody;
