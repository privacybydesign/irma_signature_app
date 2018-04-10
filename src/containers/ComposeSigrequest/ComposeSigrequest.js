import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

// Icons
import Delete from 'material-ui-icons/Delete';
import Download from 'material-ui-icons/FileDownload';

import AttributeDropdown from './../AttributeDropdown/AttributeDropdown';

class ComposeSigrequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: {},
      errorAttributes: false,
      errorMessage: false,
      sigMessage: '',
    };
  }

  addAttribute = (id, value) => {
    this.setState((prevState) => {
      const selected = prevState.selectedAttributes;
      return {
        selectedAttributes: {
          ...selected,
          [id]: value,
        }
      }
    });
  }

  removeAttribute = (id) => {
    this.setState((prevState) => {
      const selected = prevState.selectedAttributes;
      // TODO: better way to delete key from object?
      const newSelected = Object.keys(selected)
        .reduce((acc, val) => {
          if (val !== id) {
            acc[val] = selected[val];
          }
          return acc;
        }, {});
      return {
        selectedAttributes: newSelected,
      };
    });
  }

  validate = () => {
    const errorAttributes = Object.keys(this.state.selectedAttributes).length === 0;
    const errorMessage = this.state.sigMessage.length === 0;

    this.setState({
      errorAttributes,
      errorMessage,
    });

    return !errorAttributes && !errorMessage;
  }

  handleNext = () => {
    if (!this.validate()) {
      return;
    }

    this.props.onComplete({
      sigMessage: this.state.sigMessage,
      attributes: this.state.selectedAttributes,
    });
  }

  handleSigMessageChange = (event) => {
    this.setState({
      sigMessage: event.target.value,
    });
  }

  onDiscard = () => {
    this.props.history.push('/');
  }

  render() {
    const { selectedAttributes, errorAttributes, errorMessage, sigMessage } = this.state;
    return (
      <div>
        <TextField
          label={errorMessage ? "This field is required" : "Message to be signed"}
          onChange={this.handleSigMessageChange}
          value={sigMessage}
          multiline
          placeholder="The message that needs a signature."
          rows="4"
          rowsMax="10"
          fullWidth
          margin="normal"
          error={errorMessage}
        />
        {(errorAttributes ? <Typography style={{ paddingTop: '20px', fontSize: '14px', color: 'red', paddingBottom: '6px' }}>You should select at least one attribute!</Typography> : '')}
        <AttributeDropdown
          selectedAttributes={selectedAttributes}
          addAttribute={this.addAttribute}
          removeAttribute={this.removeAttribute}
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
