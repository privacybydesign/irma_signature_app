import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

// Icons
import Send from 'material-ui-icons/Send';

class ComposeMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: {
        from: '',
        recipient: '',
        subject: '',
        body: '',
      },
      error: false,
    };
  }

  handleTextFieldChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    this.setState((prevState) => ({
      mail: {
        ...prevState.mail,
        [id]: value,
      },
    }));
  }

  validate = () => {
    const { mail } = this.state;
    const error = mail.from.length === 0 && mail.recipient.length === 0;
    this.setState({
      error
    });

    return !error;
  }

  handleSend = () => {
    if (!this.validate()) {
      return;
    }

    this.props.onComplete(this.state.mail);
  }

  render() {
    const { mail, error } = this.state;
    const { mailClientAvailable } = this.props;
    return (
      <div>
        <div style={{ minWidth: '50%', maxWidth: '500px' }}>
          <TextField
            required
            id="from"
            value={mail.from}
            onChange={this.handleTextFieldChange}
            label={error ? "This field is required" : "From:"}
            placeholder={"Email address where you want to receive the signature (TODO: move to options)"}
            error={error}
            fullWidth
            margin="normal"
          />
          <TextField
            required
            id="recipient"
            value={mail.recipient}
            onChange={this.handleTextFieldChange}
            label={error ? "This field is required" : "To:"}
            placeholder={"Email address of the signer"}
            error={error}
            fullWidth
            margin="normal"
          />
          <TextField
            id="subject"
            label="Subject:"
            value={mail.subject}
            onChange={this.handleTextFieldChange}
            placeholder="Email subject line"
            fullWidth
            margin="normal"
          />
          <TextField
            id="body"
            label="Mail body"
            value={mail.body}
            onChange={this.handleTextFieldChange}
            multiline
            placeholder="Optional accompanying text (this part will appear in the email body and it will not be signed by the recipient)."
            rows="4"
            rowsMax="10"
            fullWidth
            margin="normal"
          />
          You can change your preferred mail client in the settings.
          {(mailClientAvailable) ? '' : <div style={{ color: 'red' }}><br />You do not have any mail client installed, please install a mail client first.</div>}
        </div>
        <Button disabled={!mailClientAvailable} color="primary" onClick={this.handleSend} >
          <Send style={{ marginLeft: '0px', marginRight: '10px' }} />
          Send by e-mail
        </Button>
        <Button style={{ float: "right"}} onClick={this.props.onCancel} >
          Back
        </Button>
      </div>
    );
  }
}

ComposeMail.propTypes = {
  onComplete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  mailClientAvailable: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { mail } = state;

  return {
    mailClientAvailable: Object.keys(mail.mailClients).length > 0,
  };
}

export default connect(mapStateToProps)(ComposeMail);
