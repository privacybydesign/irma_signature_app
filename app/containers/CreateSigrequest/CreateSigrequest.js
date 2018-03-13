import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import bigInt from 'big-integer';

import { setSignatureRequest, detectMailClients, saveSignatureRequest, sendSignatureRequest } from './../../actions';
import getSignatureSavePath from './../../utils/electron';
import MailClientPicker from './../../components/MailClientPicker/MailClientPicker';
import SigrequestField from './../SigrequestField/SigrequestField';

// TODO: move?
function generateNonce() {
  return bigInt.randBetween(bigInt.zero, bigInt('1e80')).toString();
}

class CreateSigrequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: {},
      error: false,
      mailClientDialogOpen: false,
    };
  }

  componentWillMount() {
    const { dispatch, mailClientsDetected, mailClients } = this.props;
    console.log('mail clients: ', mailClients);
    if (!mailClientsDetected) {
      dispatch(detectMailClients());
    }
  }

  openMailDialog = () => {
    this.setState({ mailClientDialogOpen: true });
  };

  closeMailDialog = () => {
    this.setState({ mailClientDialogOpen: false });
  };

  saveSigrequestData = (mail) => {
    this.setState({ mail });
    this.openMailDialog();
  };

  handleSubmit = (selectedMailClient) => {
    this.closeMailDialog();
    const sigRequest = this.mapStateToSigrequest();
    const { dispatch } = this.props;

    dispatch(setSignatureRequest(sigRequest));

    if (selectedMailClient === 'save') {
      const path = getSignatureSavePath();
      return saveSignatureRequest(sigRequest, path);
    }

    saveSignatureRequest(sigRequest);

    sendSignatureRequest(
      null,
      selectedMailClient,
      this.props.mailClients.get(selectedMailClient).path,
      {
        body: this.state.mail.body,
        destination: this.state.mail.dest,
        subject: this.state.mail.subject,
      },
    );
  }

  mapStateToSigrequest = () => (
    {
      message: this.state.mail.sigMessage,
      messageType: 'STRING',
      content: this.createContent(this.props.selectedAttributes),
      nonce: generateNonce(),
      context: 0,
      from: this.state.mail.from,
      name: this.state.mail.name,
    }
  );

  createContent = (attributes) => {
    const content = [];
    attributes.forEach((value, key) => (
      content.push({
        label: value,
        attributes: [key],
      })
    ));
    return content;
  }

  render() {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Create a new signature request</h2>
        <SigrequestField
          disabled={!this.props.mailClientsDetected}
          onSubmit={this.saveSigrequestData}
          error={this.state.error}
        />
        <MailClientPicker
          handleClose={this.closeMailDialog}
          handleSelect={this.handleSubmit}
          openState={this.state.mailClientDialogOpen}
          mailClients={this.props.mailClients}
        />
      </div>
    );
  }
}

CreateSigrequest.propTypes = {
  dispatch: PropTypes.func.isRequired,
  mailClientsDetected: PropTypes.bool.isRequired,
  mailClients: PropTypes.objectOf(PropTypes.string).isRequired,
  selectedAttributes: PropTypes.objectOf(PropTypes.string).isRequired,
};

function mapStateToProps(state) {
  const { mail, attributes } = state;

  return {
    mailClientsDetected: mail.mailClientsDetected,
    mailClients: mail.mailClients,
    selectedAttributes: attributes.attributes,
  };
}

export default connect(mapStateToProps)(CreateSigrequest);
