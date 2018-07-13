import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { Card, CardHeader } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

// Icons
import IconButton from '@material-ui/core/IconButton';

import RequestSignatureStepper from './children/RequestSignatureStepper';

class RequestSignature extends Component {
  onReset = () => {
    this.setState({
      sigrequest: null,
      mail: null,
    });
  }

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
          <RequestSignatureStepper
            sigrequest={this.props.sigrequest}
            mail={this.props.mail}
            onComplete={this.props.onComplete}
            onReset={this.props.onReset}
            onChangeSigrequest={this.props.onChangeSigrequest}
            onChangeMail={this.props.onChangeMail}
            onDiscard={this.props.onDiscard}
            exportRequest={this.props.exportRequest}
          />
        </Card>
      </div>
    );
  }
}

RequestSignature.propTypes = {
  siqrequest: PropTypes.object,
  mail: PropTypes.object,
  onComplete: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onChangeSigrequest: PropTypes.func.isRequired,
  onChangeMail: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  exportRequest: PropTypes.func.isRequired,
};

export default RequestSignature;
