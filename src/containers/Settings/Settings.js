import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material UI
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';

// Icons
import IconButton from 'material-ui/IconButton';
import HelpIcon from 'material-ui-icons/Help';

import { getPreferredMailClient, setPreferredMailClient } from '../../actions';

class MailClientControl extends Component {
  render() {
    const { mailClients, selectedClient, handleChange } = this.props;
    return (
      <CardContent style={{ paddingLeft: '30px' }}>
        <FormControl>
          <FormLabel>Mail Client</FormLabel>
          <RadioGroup
            value={selectedClient}
            onChange={event => handleChange(event.target.value)}
          >
            {Object.keys(mailClients).map(client =>
              <FormControlLabel
                key={client}
                value={client}
                control={<Radio />}
                label={mailClients[client].description}
              />
             )
            }
          </RadioGroup>
        </FormControl>
      </CardContent>
    );
  }
}

MailClientControl.propTypes = {
  handleChange: PropTypes.func.isRequired,
  mailClients: PropTypes.objectOf(PropTypes.object),
  selectedClient: PropTypes.string.isRequired,
}

class Settings  extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getPreferredMailClient());
  }

  updateMailClient = (value) => {
    setPreferredMailClient(value);
  }

  render() {
    console.log(this.props);
    return (
      <div style={{ paddingLeft: '10px' }}>
        <Card>
          <CardHeader
            action={
              <IconButton>
                <HelpIcon />
              </IconButton>
            }
            title="Settings"
          />
        </Card>
        <Divider />
        <Card>
          <CardHeader
            title="Mail client settings"
            subheader="Choose your default mailclient here."
          />
          <CardContent style={{ paddingLeft: '30px' }}>
            <MailClientControl
              mailClients={this.props.mailClients}
              handleChange={this.updateMailClient}
              selectedClient={this.props.preferredMailClient}
            />
          </CardContent>
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
