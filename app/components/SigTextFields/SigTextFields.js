import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

export default class SigTextFields extends Component {

  render() {
    const {
      onChange,
      sigMessageValue,
      subjectValue,
      bodyValue,
      destValue,
      error,
      fromValue,
      nameValue,
    } = this.props;
    const errorText = 'This field is required';

    return (
      <div>
        <TextField
          id="sigMessage"
          hintText="Message to be signed"
          errorText={(error && sigMessageValue === '' ? errorText : '')}
          onChange={onChange}
          multiLine
          fullWidth
          value={sigMessageValue}
        />
        <Divider />
        <TextField
          id="subject"
          hintText="Mail subject"
          onChange={onChange}
          fullWidth
          value={subjectValue}
        />
        <Divider />
        <TextField
          id="body"
          hintText="Mail body"
          onChange={onChange}
          fullWidth
          value={bodyValue}
        />
        <Divider />
        <TextField
          id="dest"
          hintText="Recipient mail address"
          onChange={onChange}
          fullWidth
          value={destValue}
        />
        <Divider />
        <TextField
          id="from"
          hintText="Your e-mail address"
          errorText={(error && fromValue === '' ? errorText : '')}
          onChange={onChange}
          fullWidth
          value={fromValue}
        />
        <Divider />
        <TextField
          id="name"
          hintText="Your name"
          errorText={(error && nameValue === '' ? errorText : '')}
          onChange={onChange}
          fullWidth
          value={nameValue}
        />
        <Divider />
      </div>
    );
  }
}

SigTextFields.propTypes = {
  onChange: PropTypes.func.isRequired,
  sigMessageValue: PropTypes.string.isRequired,
  subjectValue: PropTypes.string.isRequired,
  bodyValue: PropTypes.string.isRequired,
  destValue: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  fromValue: PropTypes.string.isRequired,
  nameValue: PropTypes.string.isRequired,
};
