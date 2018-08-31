import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Prompt, Link } from 'react-router-dom';

import { setDefaultReturnEmail, setDefaultSaveDirectory } from '../../actions';
import { getDefaultSavePath } from '../../actions/electron';

// Material UI
import { withStyles, Card, CardHeader, CardContent, Typography} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Icons
import IconButton from '@material-ui/core/IconButton';
import Save from '@material-ui/icons/Save';
import HelpIcon from '@material-ui/icons/Help';

import LocalInfoBox from '../LocalInfoBox';

const styles = {
  label: {
    textTransform: 'none',
  },
};

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultReturnEmail: props.defaultReturnEmail || '',
      defaultSaveDirectory: props.defaultSaveDirectory || '',
      showHelp: false,
    };
    this.forceLeave = false;
  }

  onHelp = () => {
    this.setState(state => ({showHelp: !state.showHelp}));
  }

  onNavigate = () => {
    if (!this.forceLeave &&
        ((this.state.defaultReturnEmail !== this.props.defaultReturnEmail &&
          !this.state.defaultReturnEmail !== !this.props.defaultReturnEmail) ||
         (this.state.defaultSaveDirectory !== this.props.defaultSaveDirectory &&
          !this.state.defaultSaveDirectory !== !this.props.defaultSaveDirectory)))
      return 'Leaving will discard setting changes, continue?';
    return true;
  }

  onSubmit = () => {
    const { dispatch } = this.props;
    dispatch(setDefaultReturnEmail(this.state.defaultReturnEmail));
    dispatch(setDefaultSaveDirectory(this.state.defaultSaveDirectory));
    this.forceLeave = true;
    this.props.history.push('/');
  }

  onDefaultReturnEmailChange = event => {
    const defaultReturnEmail = event.target.value;
    this.setState({defaultReturnEmail});
  }

  changeDefaultSaveDirectory = () => {
    const openResult = getDefaultSavePath();
    if (openResult && openResult.length > 0 && openResult[0])
      this.setState({defaultSaveDirectory: openResult[0]});

  }

  renderEmailInfoBox = () => {
    return (
      <Typography style={{margin: '1em'}}>
        The e-mail address that you set here will be the pre-filled delivery
        address on the <Link to="/request-signature">`Request a signature' page</Link> of this
        application. For instance, you can put your own e-mail address here,
        so that all your signature requests are returned to you by default.
      </Typography>
    );
  }

  renderContent() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CardContent>
          <CardHeader
            title="Mail settings"
            subheader="Set your default delivery address here."
          />
        </CardContent>
        <CardContent>
          <LocalInfoBox renderMessage={this.renderEmailInfoBox}>
            <TextField
              value={this.state.defaultReturnEmail}
              onChange={this.onDefaultReturnEmailChange}

              label={'Default delivery e-mail address'}
              fullWidth={true}
              />
          </LocalInfoBox>
        </CardContent>
        <CardContent>
          <CardHeader
            title="Storage settings"
            subheader="Change the default directory for save dialogs."
            />
        </CardContent>
        <CardContent>
          <LocalInfoBox text="Here you can select a local directory on your computer. Then, all your signature requests will be stored there.">
            <Button classes={{label: classes.label}} size="small" variant="raised" onClick={this.changeDefaultSaveDirectory}>
              {this.state.defaultSaveDirectory}
            </Button>
          </LocalInfoBox>
        </CardContent>
        <CardContent>
          <Button style={{margin: '1em'}} size="small" variant="raised" color="primary" onClick={this.onSubmit} >
            Store settings
            <Save style={{ fontSize: '20', marginLeft: '10', marginRight: '2' }} />
          </Button>
        </CardContent>
      </React.Fragment>
    );
  }

  renderHelp() {
    return (
      <CardContent>
            <p> On this page you can set some preferred settings for
	    this application. After saving, they will be used
	    throughout. They can be changed again at any later moment.
	    </p>
      </CardContent>
    );
  }

  render() {
    return (
      <div>
        <Prompt message={this.onNavigate} />
        <Card>
          <CardHeader
            action={
              <IconButton onClick={this.onHelp}>
                <HelpIcon />
              </IconButton>
            }
            title="Settings"
          />
          <Divider />
          {this.state.showHelp ? this.renderHelp() : this.renderContent()}
        </Card>
      </div>
    );
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  defaultReturnEmail: PropTypes.string,
  defaultSaveDirectory: PropTypes.string,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { defaultReturnEmail, defaultSaveDirectory } = state.settings;
  return {
    defaultReturnEmail,
    defaultSaveDirectory,
  };
}

export default withStyles(styles)(withRouter(connect(mapStateToProps)(Settings)));
