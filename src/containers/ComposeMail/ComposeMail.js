import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';

// Icons
import Send from 'material-ui-icons/Send';

class ComposeMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: {},
    };
  }

  render() {
    return (
      <div> 
        TODO: compose mail <br />
        <Button color="primary" onClick={this.props.onComplete} >
          <Send style={{ marginLeft: '0px', marginRight: '10px' }} />
          Send by e-mail
        </Button>
        <Button style={{ float: "right"}} onClick={this.props.onCancel} >
          Back
        </Button>
      </div>
    );
  }
}

ComposeMail.propTypes = {
  onComplete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ComposeMail;
