import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Prompt } from 'react-router-dom';

import { setDefaultReturnEmail } from '../../actions';

// Material UI
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Icons
import IconButton from '@material-ui/core/IconButton';
import Save from '@material-ui/icons/Save';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultReturnEmail: props.defaultReturnEmail || '',
    };
    this.forceLeave = false;
  }

  onNavigate = () => {
    if (!this.forceLeave && this.state.defaultReturnEmail !== this.props.defaultReturnEmail)
      return 'Leaving will discard setting changes, continue?';
    return true;
  }

  onSubmit = () => {
    const { dispatch } = this.props;
    dispatch(setDefaultReturnEmail(this.state.defaultReturnEmail));
    this.forceLeave = true;
    this.props.history.push('/');
  }

  onDefaultReturnEmailChange = event => {
    const defaultReturnEmail = event.target.value;
    this.setState({defaultReturnEmail});
  }

  render() {
    return (
      <div>
        <Prompt message={this.onNavigate} />
        <Card>
          <CardHeader
            action={
              <IconButton>
                {/* <HelpIcon /> */}
              </IconButton>
            }
            title="Settings"
          />
          <Divider />
          <CardContent>
            <CardHeader
              title="Mail settings"
              subheader="Set your default return address here."
            />
          </CardContent>
          <CardContent>
            <TextField
              value={this.state.defaultReturnEmail}
              onChange={this.onDefaultReturnEmailChange}

              label={'Default return email address'}
              fullWidth={true}
              />
            <Button style={{margin: '1em'}} size="small" variant="raised" color="primary" onClick={this.onSubmit} >
              Store settings
              <Save style={{ fontSize: '20', marginLeft: '10', marginRight: '2' }} />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  defaultReturnEmail: PropTypes.string,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { defaultReturnEmail } = state.settings;
  return {
    defaultReturnEmail,
  };
}

export default withRouter(connect(mapStateToProps)(Settings));
