import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI
import {
Card,
CardContent,
} from '@material-ui/core';

import { blue } from '@material-ui/core/colors';
import Pending from '@material-ui/icons/HourglassEmpty';

class ProcessingIndicator extends Component {
  render() {
    if (!this.props.show)
      return null;

    return (
      <Card style={{ marginTop: '30px' }}>
        <CardContent>
          <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            <Pending style={{fontSize: 40, color: blue[500] }} />
          </div>
        </CardContent>
      </Card>
    );
  }
}

ProcessingIndicator.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default ProcessingIndicator;
