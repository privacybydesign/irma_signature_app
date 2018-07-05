import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Stepper, Step, StepLabel, StepContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import ComposeSigrequest from './ComposeSigrequest';
import ComposeMail from './ComposeMail';
import Typography from '@material-ui/core/Typography';

// Icons
import Done from '@material-ui/icons/Done';
import Back from '@material-ui/icons/NavigateBefore';

class RequestSignatureStepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
    };
  }

  handleComposeFinished = () => {
    this.props.onComplete();
    this.handleNext();
  }

  handleNext = () => {
    const { stepIndex } = this.state;

    this.setState({
      stepIndex: stepIndex + 1,
    });
  }

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }

  handleReset = () => {
    this.setState({
      stepIndex: 0,
    });

    this.props.onReset();
  };

  render() {
    const { stepIndex } = this.state;

    return (
      <div>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Compose request</StepLabel>
            <StepContent>
              <ComposeSigrequest
                initialSigrequest={this.props.sigrequest}
                onComplete={this.handleNext}
                onDiscard={this.onDiscard}
                exportRequest={this.props.exportRequest}
                onChange={this.props.onChangeSigrequest}
              />
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Compose mail</StepLabel>
            <StepContent>
              <ComposeMail
                initialMail={this.props.mail}
                onComplete={this.handleComposeFinished}
                onCancel={this.handlePrev}
                onChange={this.props.onChangeMail}
              />
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Send mail</StepLabel>
            <StepContent>
              <Typography style={{ paddingTop: '20px', paddingBottom: '20px', fontSize: '14px', color: 'rgba(0, 0, 0, 0.54)' }}>Your email application has opened with an email. The signature request is included as an attachment. Send the mail to share the signature request.<br /></Typography>
              <Button size="small" variant="raised" style={{ marginLeft: '0px', marginRight: '10px' }} onClick={this.handlePrev} >
                <Back style={{ fontSize: "20", marginLeft: "2", marginRight: "10" }} />
                Back
              </Button>
              <Button size="small" variant="raised" color="primary" style={{ float: "right" }} onClick={this.handleReset}>
                Done
                <Done style={{ fontSize: "20", marginLeft: "10", marginRight: "2" }} />
              </Button>
            </StepContent>
          </Step>
        </Stepper>
      </div>
    );
  }
}

RequestSignatureStepper.propTypes = {
  sigrequest: PropTypes.object,
  mail: PropTypes.object,
  onComplete: PropTypes.func.isRequired,
  onChangeSigrequest: PropTypes.func.isRequired,
  onChangeMail: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  exportRequest: PropTypes.func.isRequired,
};

export default RequestSignatureStepper;
