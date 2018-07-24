import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI
import {
Card,
CardHeader,
CardContent,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

// Subcomponent
import AttributeResultTable from '../../AttributeResultTable';

class AttributeResult extends Component {
  render() {
    const { matched, attributes, proofStatus } = this.props;
    return (
      <Card style={{ marginTop: '30px' }}>
        <CardHeader
          title="Attributes" /> <Divider />
        <CardContent style={{ paddingTop: '0px' }}>
          <AttributeResultTable
            matched = { matched }
            attributes = { attributes }
            proofStatus = { proofStatus }
          />
        </CardContent>
      </Card>
    );
  }
}

AttributeResult.propTypes = {
  matched: PropTypes.bool.isRequired,
  attributes: PropTypes.arrayOf(PropTypes.object), // Only if there are attributes disclosed
  proofStatus: PropTypes.string, // Only with unmatched requests
};


export default AttributeResult;
