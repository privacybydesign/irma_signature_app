import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { Card, CardHeader } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { green, red, yellow } from '@material-ui/core/colors';

// Icons
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Warning from '@material-ui/icons/Warning';
import Error from '@material-ui/icons/Error';

class SignatureResult extends Component {

  getTitle = () => {
    const { proofStatus, matched, signatureRequest } = this.props;

    if (proofStatus !== 'VALID')
      return 'This signature is NOT valid!';


    if (matched)
      return `The signature matches your request ${signatureRequest.name} from ${signatureRequest.date}. All requested signatures have been returned and are valid. You can check the status in the request history.`;


    return 'This IRMA signature is valid, but doesn\'t match any of your previous requests. You can view the message and included attributes below:';
  }

  getAvatar = () => {
    const { proofStatus, matched } = this.props;
    if (proofStatus !== 'VALID') {
      return (
        <Avatar aria-label="Match" style={{ margin: 10, color: '#fff', backgroundColor: red[500] }} >
          <Error />
        </Avatar>
      );
    }

    if (matched) {
      return (
        <Avatar aria-label="Match" style={{ margin: 10, color: '#fff', backgroundColor: green[500] }} >
          <VerifiedUser />
        </Avatar>
      );
    }

    return (
      <Avatar aria-label="Match" style={{ margin: 10, color: '#fff', backgroundColor: yellow[500] }} >
        <Warning />
      </Avatar>
    );
  }

  render() {
    const { message, onClose } = this.props;
    return (
      <Card style={{ marginTop: '30px' }}>
        <CardHeader
          action={
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
            }
          avatar={this.getAvatar()}
          title={this.getTitle()}
          subheader={`Message: ${message}`}
          />
      </Card>
    );
  }
}

SignatureResult.propTypes = {
  proofStatus: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  matched: PropTypes.bool.isRequired,
  signatureRequest: PropTypes.shape({
    date: PropTypes.string,
    recipient: PropTypes.string,
    request: PropTypes.object,
    state: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default SignatureResult;
