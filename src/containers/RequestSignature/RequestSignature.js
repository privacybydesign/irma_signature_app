import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';

import ComposeSigrequest from './children/ComposeSigrequest';

class RequestSignature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHelp: false,
    };
  }

  onHelp = () => {
    this.setState(state => ({showHelp: !state.showHelp}));
  }

  renderContent() {
    return (
      <ComposeSigrequest
        value={this.props.value}
        onChange={this.props.onChange}
        onDiscard={this.props.onDiscard}
        onSubmit={this.props.onSubmit}
        />
    );
  }

  renderHelp() {
    return (
      <CardContent>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ornare magna magna, dignissim aliquet nunc interdum non. Nullam at bibendum turpis. Aenean interdum, orci ac egestas ultrices, odio eros dapibus ipsum, vel pulvinar magna enim at nulla. Nam ac pulvinar libero, nec feugiat mi. Mauris luctus neque non aliquet tempor. Mauris vulputate velit nisl, vel cursus est tempor non. In hac habitasse platea dictumst.
        </p>

        <p>
          Duis interdum venenatis nibh non suscipit. Aenean at nisi lobortis leo lobortis vehicula quis aliquet nisi. Nulla feugiat elit dapibus luctus faucibus. Suspendisse potenti. Pellentesque a lorem mattis, imperdiet arcu ullamcorper, congue elit. Praesent quis lacus nibh. Duis ac est magna. Duis ante mi, sodales et libero pellentesque, egestas pellentesque ligula. Praesent tellus tellus, hendrerit quis lacus malesuada, consectetur placerat risus. Pellentesque arcu ligula, sollicitudin eget fermentum sit amet, elementum sit amet justo. Morbi ut egestas nulla, in vulputate magna.
        </p>
      </CardContent>
    );
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader
            action={
              <IconButton onClick={this.onHelp}>
                <HelpIcon />
              </IconButton>
            }
            title="Request a signature"
          />
          <Divider />
          {this.state.showHelp ? this.renderHelp() : this.renderContent()}
        </Card>
      </div>
    );
  }
}

RequestSignature.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default RequestSignature;
