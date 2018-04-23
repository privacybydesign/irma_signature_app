import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material UI
import Card, { CardHeader } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

// Icons
import IconButton from 'material-ui/IconButton';
import HelpIcon from 'material-ui-icons/Help';

import RequestSignatureStepper from './../RequestSignatureStepper/RequestSignatureStepper';
import { sendSignatureRequest } from './../../actions';
import { setRequestElectron } from './../../actions/electron';
import { createSigrequestFromInput, generateDate } from './../../utils/requestUtils';


class RequestSignature extends Component {
  handleComplete = (mail, sigRequest) => {
    const mailClientName = 'thunderbird'; // TODO: fix hard-coded thunderbird
    const mailClientPath = this.props.mailClients[mailClientName].path;

    const request = createSigrequestFromInput(mail.from, sigRequest);

    sendSignatureRequest(request, mailClientName, mailClientPath, mail);
    setRequestElectron(request, generateDate(), mail.recipient);
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
          <Divider />
          <RequestSignatureStepper onComplete={this.handleComplete} />
        </Card>
      </div>
    );
  }
}

RequestSignature.propTypes = {
  dispatch: PropTypes.func.isRequired,
  mailClients: PropTypes.objectOf(PropTypes.object),
};

function mapStateToProps(state) {
  const { mail } = state;

  return {
    mailClients: mail.mailClients,
  };
}

export default connect(mapStateToProps)(RequestSignature);
