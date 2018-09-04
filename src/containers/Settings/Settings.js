import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Prompt, Link } from 'react-router-dom';

import { setDefaultReturnEmail, setDefaultSaveDirectory } from '../../actions';
import { getDefaultSavePath } from '../../actions/electron';

// Material UI
import { Card, CardHeader, CardContent, Typography} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Icons
import IconButton from '@material-ui/core/IconButton';
import Save from '@material-ui/icons/Save';
import HelpIcon from '@material-ui/icons/Info';

import LocalInfoBox from '../LocalInfoBox';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultReturnEmail: props.defaultReturnEmail || '',
      defaultSaveDirectory: props.defaultSaveDirectory || '',
      showHelp: false,
    };
    this.forceLeave = false;
    this.ref = React.createRef();
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
    this.ref.current.blur();
  }

  renderEmailInfoBox = () => {
    return (
      <Typography style={{margin: '1em'}}>
        The e-mail address that you set here will be the pre-filled delivery
        address on the <Link to="/request-signature">&lsquo;Request a signature&rsquo; page</Link> of this
        application. For instance, you can put your own e-mail address here,
        so that all your signature requests are returned to you by default.
      </Typography>
    );
  }

  renderContent() {
    return (
      <CardContent>
        <LocalInfoBox renderMessage={this.renderEmailInfoBox}>
          <TextField
            value={this.state.defaultReturnEmail}
            onChange={this.onDefaultReturnEmailChange}

            label={'Default delivery e-mail address'}
            fullWidth={true}
            />
        </LocalInfoBox>
        <LocalInfoBox text="Here you can select a local directory on your computer. Then, all your signature requests will be stored there.">
          <TextField
            value={this.state.defaultSaveDirectory}
            label={'Default storage directory'}
            fullWidth={true}
            onClick={this.changeDefaultSaveDirectory}
            inputRef={this.ref}
          />
        </LocalInfoBox>
        <Button style={{margin: '1em'}} size="small" variant="raised" color="primary" onClick={this.onSubmit} >
          Store settings
          <Save style={{ fontSize: '20', marginLeft: '10', marginRight: '2' }} />
        </Button>
      </CardContent>
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
};

function mapStateToProps(state) {
  const { defaultReturnEmail, defaultSaveDirectory } = state.settings;
  return {
    defaultReturnEmail,
    defaultSaveDirectory,
  };
}

export default withRouter(connect(mapStateToProps)(Settings));
