import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import { detectMailClients, saveSignatureRequest, sendSignatureRequest } from './../../actions';
import MailClientPicker from './../../components/MailClientPicker/MailClientPicker';

class CreateSigrequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributeValue: 'pbdf.pbdf.address',
      sigMessage: '',
      mailBody: '',
      mailSubject: '',
      rcptMail: '',
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


  setAttributeValue = (event, index, attributeValue) => this.setState({ attributeValue });

  handleTextFieldChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    return this.setState({
      [id]: value,
    });
  };

  openMailDialog = () => {
    if (!this.validate()) {
      return;
    }
    this.setState({ mailClientDialogOpen: true });
  };

  closeMailDialog = () => {
    this.setState({ mailClientDialogOpen: false });
  };

  handleSubmit = (selectedMailClient) => {
    if (!this.validate()) {
      return;
    }

    this.closeMailDialog();

    if (selectedMailClient === 'save') {
      console.log('Save not implemented yet!');
      return;
    }
    const sigRequest = this.mapStateToSigrequest();

    saveSignatureRequest(sigRequest);

    sendSignatureRequest(
      null,
      selectedMailClient,
      this.props.mailClients.get(selectedMailClient).path,
      {
        body: this.state.mailBody,
        destination: this.state.rcptMail,
        subject: this.state.mailSubject,
      },
    );
  }

  validate = () => {
    const error = (
      this.state.sigMessage === '' ||
      this.state.rcptMail === '' ||
      this.state.mailSubject === '' ||
      this.state.mailBody === ''
    );
    this.setState({
      error,
    });
    return !error;
  }

  mapStateToSigrequest = () => (
    {
      message: this.state.sigMessage,
      messageType: 'STRING',
      content: [
        {
          label: 'TODO',
          attributes: [this.state.attributeValue],
        }
      ],
    }
  );

  render() {
    const errorText = 'This field is required';
    return (
      <div style={{ padding: '20px' }}>
        <h2>Create a new signature request</h2>
        <TextField
          id="sigMessage"
          hintText="Message to be signed"
          errorText={(this.state.error && this.state.sigMessage === '' ? errorText : '')}
          onChange={this.handleTextFieldChange}
          value={this.state.sigMessage}
        />
        <Divider />
        <TextField
          id="mailBody"
          hintText="Mail body"
          errorText={(this.state.error && this.state.mailBody === '' ? errorText : '')}
          onChange={this.handleTextFieldChange}
          value={this.state.mailBody}
        />
        <Divider />
        <TextField
          id="mailSubject"
          hintText="Mail subject"
          errorText={(this.state.error && this.state.mailSubject === '' ? errorText : '')}
          onChange={this.handleTextFieldChange}
          value={this.state.mailSubject}
        />
        <Divider />
        <TextField
          id="rcptMail"
          hintText="Recipient mail address"
          errorText={(this.state.error && this.state.rcptMail === '' ? errorText : '')}
          onChange={this.handleTextFieldChange}
          value={this.state.rcptMail}
        />
        <Divider />
        <SelectField
          floatingLabelText="Select attribute"
          value={this.state.attributeValue}
          onChange={this.setAttributeValue}
        >
          <MenuItem value="pbdf.pbdf.address" primaryText="Address" />
          <MenuItem value="pbdf.pbdf.city" primaryText="City" />
          <MenuItem value="pbdf.pbdf.familyname" primaryText="Name" />
        </SelectField>
        <Divider />
        <FlatButton
          label="Send signature request"
          fullWidth
          onClick={this.openMailDialog}
          disabled={!this.props.mailClientsDetected}
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
};

function mapStateToProps(state) {
  const { mail } = state;

  return {
    mailClientsDetected: mail.mailClientsDetected,
    mailClients: mail.mailClients,
  };
}

export default connect(mapStateToProps)(CreateSigrequest);
