import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { Card, CardHeader } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import ComposeSigrequest from './children/ComposeSigrequest';

class RequestSignature extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardHeader
            action={
              <IconButton>
                {/* <HelpIcon /> */}
              </IconButton>
            }
            title="Request a signature"
          />
          <Divider />
          <ComposeSigrequest
            value={this.props.value}
            onChange={this.props.onChange}
            onDiscard={this.props.onDiscard}
            onSubmit={this.props.onSubmit}
            />
        </Card>
      </div>
    );
  }
}

RequestSignature.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default RequestSignature;
