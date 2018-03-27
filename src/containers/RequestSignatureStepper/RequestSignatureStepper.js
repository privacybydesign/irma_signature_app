import React, { Component } from 'react';

import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Button from 'material-ui/Button';

import ComposeSigrequest from './../ComposeSigrequest/ComposeSigrequest';
import ComposeMail from './../ComposeMail/ComposeMail';

class RequestSignatureStepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
      sigrequest: {},
    };
  }

  handleNewSigrequest = (sigrequest) => {
    console.log('new sigrequest: ', sigrequest);
    this.setState({
      sigrequest,
    });
    this.handleNext();
  }

  handleComposeFinised = (mail) => {
    console.log('new mail: ', mail);
    this.handleNext();
  }
  
  handleComposeCancelled = () => {
    // Clear sigrequest in state TODO: needed?
    this.setState({
      sigrequest: {},
    });
    this.handlePrev();
  }
	
  handleNext = () => {
    const {stepIndex} = this.state;

    this.setState({
      stepIndex: stepIndex + 1,
    });
  }

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  render() {
    const { stepIndex, sigrequest } = this.state;

    return (
      <div> 
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Compose request</StepLabel>
            <StepContent>
              <ComposeSigrequest onComplete={this.handleNewSigrequest} />
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Send request</StepLabel>
            <StepContent>
              <ComposeMail sigrequest={sigrequest} onComplete={this.handleComposeFinised} onCancel={this.handleComposeCancelled} />
            </StepContent>
          </Step>
        </Stepper>
        {stepIndex === 2
          ?
            <div>
              Your email application has opened with an email. Send the mail to share the signature request.<br />
              <Button style={{ float: "right"}} onClick={this.handlePrev}>
                Back
              </Button>
            </div>
          : ''}
      </div>
    );
  }
}

export default RequestSignatureStepper;
