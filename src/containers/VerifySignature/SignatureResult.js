import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI
import Card, { CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import green from 'material-ui/colors/green';
import yellow from 'material-ui/colors/yellow';
import red from 'material-ui/colors/red';

// Icons
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import VerifiedUser from 'material-ui-icons/VerifiedUser';
import Warning from 'material-ui-icons/Warning';
import Error from 'material-ui-icons/Error';

class SignatureResult extends Component {

  getTitle = () => {
    const { proofStatus } = this.props;
    if (proofStatus === 'VALID') {
      return 'The signed message matches your request from September 12, 2016, 11:24. All requested signatures have been returned and are valid. You can check the status in the request history.';
    } else {
      return 'This request is NOT valid!';
    }
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
    const { message } = this.props;
    return (
        <Card style={{ marginTop: '30px' }}>
          <CardHeader
            action={
              <IconButton>
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
};

export default SignatureResult;
