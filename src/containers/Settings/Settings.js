import React, { Component } from 'react';

// Material UI
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

// Icons
import IconButton from '@material-ui/core/IconButton';

class Settings extends Component {
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
        </Card>
      </div>
    );
  }
}

export default Settings;
