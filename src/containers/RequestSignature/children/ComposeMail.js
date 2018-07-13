import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

// Icons
import Send from '@material-ui/icons/Send';
import Back from '@material-ui/icons/NavigateBefore';

class ComposeMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: props.initialMail || {
        from: '',
        recipient: '',
        subject: '',
        body: '',
      },
      validationForced: false,
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
    return !error;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.mail !== this.state.mail)
      this.props.onChange(this.state.mail);

  }

  handleSend = () => {
    if (!this.validate()) {
      this.setState({validationForced: true});
      return;
    }

    this.props.onComplete();
  }

  render() {
    const { mail, validationForced } = this.state;
    const { mailClientAvailable } = this.props;
    const error = !this.validate() && validationForced;
    return (
      <div>
        <div style={{ minWidth: '100%', maxWidth: '500px' }}>
          <TextField
            required
            id="recipient"
            value={mail.recipient}
            onChange={this.handleTextFieldChange}
            label={error ? 'This field is required' : 'To:'}
            placeholder={'Email address of the signer'}
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
            className="tfLabel" style={{ backgroundColor: '#f5f5f5', border: '1px solid #16a085', marginTop: '30px', padding: '5px 12px'}}
            InputProps={{
              disableUnderline: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
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

          <Typography style={{ paddingTop: '20px', paddingBottom: '20px', fontSize: '14px', color: 'rgba(0, 0, 0, 0.54)' }}>You can change your preferred mail client in the settings.</Typography>
          {(mailClientAvailable) ? '' : <div style={{ color: 'red' }}><br />You do not have any mail client installed, please install a mail client first.</div>}
        </div>
        <Button size="small" variant="raised" style={{ marginLeft: '2px', marginRight: '10px' }} onClick={this.props.onCancel} >
          <Back style={{ fontSize: '20', marginLeft: '2', marginRight: '10' }} />
          Back
        </Button>
        <Button disabled={!mailClientAvailable} variant="raised" color="primary" style={{ float: 'right', marginRight: '2px' }} onClick={this.handleSend} >
          Send by e-mail
          <Send style={{ fontSize: '20', marginLeft: '10', marginRight: '2' }} />
        </Button>
      </div>
    );
  }
}

ComposeMail.propTypes = {
  initialMail: PropTypes.object,
  onComplete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  mailClientAvailable: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { mail } = state;

  return {
    mailClientAvailable: Object.keys(mail.mailClients).length > 0,
  };
}

export default connect(mapStateToProps)(ComposeMail);
