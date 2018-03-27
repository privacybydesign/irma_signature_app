import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

// Icons
import Delete from 'material-ui-icons/Delete';
import Download from 'material-ui-icons/FileDownload';

class ComposeSigrequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sigrequest: {},
    };
  }

  handleNext = () => {
    this.props.onComplete({sig: 'bla'});
  }

  onDiscard = () => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div> 
        <TextField
          label="Message to be signed"
          multiline
          placeholder="The message that needs a signature."
          rows="4"
          rowsMax="10"
          fullWidth
          margin="normal"
        />
        <Typography style={{ paddingTop: '20px', fontSize: '14px', color: 'rgba(0, 0, 0, 0.54)', paddingBottom: '6px' }}>You can export this request and share it manually or proceed to share it by email.</Typography>
          <Button onClick={this.handleNext} >
            Next
          </Button>
          <Button style={{ float: "right"}} onClick={this.onDiscard} >
            <Delete style={{ marginLeft: '0px', marginRight: '10px' }} />
            Discard request
           </Button>
          <Button style={{ float: "right"}} >
            <Download style={{ marginLeft: '0px', marginRight: '10px' }} />
            Export request
          </Button>
      </div>
    );
  }
}

ComposeSigrequest.propTypes = {
  onComplete: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(ComposeSigrequest);
