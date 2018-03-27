import React, { Component } from 'react';
import Card, { CardHeader } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

// Icons
import IconButton from 'material-ui/IconButton';
import HelpIcon from 'material-ui-icons/Help';

import RequestSignatureStepper from './../RequestSignatureStepper/RequestSignatureStepper';

class RequestSignature extends Component {

  render() {

    return (
      <div style={{ paddingLeft: '10px' }}>
        <Card>
          <CardHeader
            action={
              <IconButton>
                <HelpIcon />
              </IconButton>
            }
            title="Create a signature request"
          // subheader="Signature requests are shared via email. Fill in the information below to create a signature request email."
          />
        </Card>
        <Divider />
        <RequestSignatureStepper />
      </div>
    );
  }
}

export default RequestSignature;
