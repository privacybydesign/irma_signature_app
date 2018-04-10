import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card, { CardHeader } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

// Icons
import IconButton from 'material-ui/IconButton';
import HelpIcon from 'material-ui-icons/Help';

import RequestSignatureStepper from './../RequestSignatureStepper/RequestSignatureStepper';
import { sendSignatureRequest } from './../../actions';

import { createSigrequestFromInput } from './../../utils/requestUtils';

class RequestSignature extends Component {
  handleComplete = (mail, sigrequest) => {
    const mailClientName = 'thunderbird'; // TODO: fix hard-coded thunderbird
    const mailClientPath = this.props.mailClients[mailClientName].path;

    sendSignatureRequest(createSigrequestFromInput(mail, sigrequest), mailClientName, mailClientPath, mail);
  }

  render() {
    return (
      <div style={{ paddingLeft: '10px' }}>
        <Card>
          <CardHeader
            action={
              <IconButton>
                <HelpIcon />
              </IconButton>
            }
            title="Create a signature request"
          // subheader="Signature requests are shared via email. Fill in the information below to create a signature request email."
          />
        </Card>
        <Divider />
        <RequestSignatureStepper onComplete={this.handleComplete} />
      </div>
    );
  }
}

RequestSignature.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { mail } = state;

  return {
    mailClients: mail.mailClients,
  };
}

export default connect(mapStateToProps)(RequestSignature);
