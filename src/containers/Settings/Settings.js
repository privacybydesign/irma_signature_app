import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material UI
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

// Icons
import IconButton from 'material-ui/IconButton';
import HelpIcon from 'material-ui-icons/Help';

import { getPreferredMailClient, setPreferredMailClient } from '../../actions';

import MailClientControl from './MailClientControl';

class Settings extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getPreferredMailClient());
  }

  updateMailClient = (value) => {
    setPreferredMailClient(value);
  }

  render() {
    return (
      <div>
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
              title="Mail client settings"
              subheader="Choose your default mailclient here."
            />
          </CardContent>
            <MailClientControl
              mailClients={this.props.mailClients}
              handleChange={this.updateMailClient}
              selectedClient={this.props.preferredMailClient}
            />
        </Card>
      </div>
    );
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  mailClients: PropTypes.objectOf(PropTypes.object),
};

function mapStateToProps(state) {
  const { mail } = state;

  return {
    mailClients: mail.mailClients,
    preferredMailClient: mail.preferredMailClient,
  };
}

export default connect(mapStateToProps)(Settings);
