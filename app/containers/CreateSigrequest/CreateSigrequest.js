import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

export default class CreateSigrequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributeValue: 'pbdf.pbdf.address',
      sigMessage: '',
      mailBody: '',
      rcptMail: '',
    };
  }

  setAttributeValue = (event, index, attributeValue) => this.setState({ attributeValue });

  handleTextFieldChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    return this.setState({
      [id]: value,
    });
  };

  sendSigrequest = () => {
    console.log('we would be sending this:', this.state);
  }

  render() {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Create a new signature request</h2>
        <TextField
          id="sigMessage"
          hintText="Message to be signed"
          onChange={this.handleTextFieldChange}
          value={this.state.sigMessage}
        />
        <Divider />
        <TextField
          id="mailBody"
          hintText="Mail body"
          onChange={this.handleTextFieldChange}
          value={this.state.mailBody}
        />
        <Divider />
        <TextField
          id="rcptMail"
          hintText="Recipient mail address"
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
          onClick={this.sendSigrequest}
        />
      </div>
    );
  }
}
