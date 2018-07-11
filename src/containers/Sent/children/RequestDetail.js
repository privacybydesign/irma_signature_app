import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  TableCell,
  TableRow,
  TableBody,
  Table,
} from '@material-ui/core';

import AttributeChip from '../../AttributeChip';

class RequestDetail extends Component {
  render() {
    const {request, attributeInfo} = this.props;
    if (attributeInfo.length === 0)
      return null;

    const labelColor = '#757575';
    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell style={{ color: labelColor, width: 150, }}>Message</TableCell>
            <TableCell>{request.request.message}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ color: labelColor }}>Date</TableCell>
            <TableCell>{request.date}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ color: labelColor }}>Attributes</TableCell>
            <TableCell>{request.request.content.map(el =>
              <AttributeChip key={el.attributes[0]} attribute={attributeInfo.find(i =>  i.id === el.attributes[0])} />
            )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
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
