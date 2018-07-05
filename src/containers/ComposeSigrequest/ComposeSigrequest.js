import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Icons
import Delete from '@material-ui/icons/Delete';
import Save from '@material-ui/icons/Save';
import Next from '@material-ui/icons/NavigateNext';

import AttributeDropdown from './../AttributeDropdown/AttributeDropdown';

class ComposeSigrequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: props.initialAttributes || {},
      sigMessage: props.initialMessage || '',
      validationForced: false,
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

  validateMessage() {
    return this.state.sigMessage.length !== 0;
  }

  validateAttributes() {
    return Object.keys(this.state.selectedAttributes).length !== 0
  }

  validate() {
    return this.validateMessage() && this.validateAttributes();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedAttributes !== this.state.selectedAttributes) {
      if (this.validateAttributes())
        this.props.onChangeAttributes(this.state.selectedAttributes);
      else
        this.props.onChangeAttributes(null);
    }
    if (prevState.sigMessage !== this.state.sigMessage) {
      if (this.validateMessage())
        this.props.onChangeMessage(this.state.sigMessage);
      else
        this.props.onChangeMessage(null);
    }
  }
  
  forceValidate = (continuation) => () => {
    if (!this.validate()) {
      this.setState({validationForced: true});
      return;
    }
    
    continuation()
  }

  handleSigMessageChange = (event) => {
    this.setState({
      sigMessage: event.target.value,
    });
  }

  render() {
    const { selectedAttributes, sigMessage } = this.state;
    const errorMessage = !this.validateMessage();
    const errorAttributes = !this.validateAttributes();
    return (
      <div>
        <TextField style={{ backgroundColor: '#f5f5f5', border: '1px solid #16a085', padding: '5px 12px', width: 'calc(100% - 34px)' }}
          InputProps={{
            disableUnderline: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          label={errorMessage ? "This field is required" : "Message to be signed"}
          onChange={this.handleSigMessageChange}
          value={sigMessage}
          multiline
          rows="4"
          rowsMax="10"
          required={true}
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
        <Typography style={{ paddingTop: '20px', paddingBottom: '20px', fontSize: '14px', color: 'rgba(0, 0, 0, 0.54)' }}>You can export this request and share it manually or proceed to share it by email.</Typography>
        <Button size="small" style={{ float: "left", marginRight: "20px" }} variant="raised" onClick={this.props.onDiscard} >
          Discard request
            <Delete style={{ fontSize: "20", marginLeft: "10", marginRight: "2" }} />
        </Button>
        <Button size="small" style={{ fontSize: "20" }} variant="raised" onClick={this.forceValidate(this.props.exportRequest)} >
          Export request
            <Save style={{ fontSize: "20", marginLeft: "10", marginRight: "2" }} />
        </Button>
        <Button size="small" style={{ float: "right" }} variant="raised" color="primary" onClick={this.forceValidate(this.props.onComplete)} >
          Next
            <Next style={{ fontSize: "20", marginLeft: "10", marginRight: "2" }} />
        </Button>
      </div>
    );
  }
}

ComposeSigrequest.propTypes = {
  onComplete: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  exportRequest: PropTypes.func.isRequired,
  onChangeAttributes: PropTypes.func.isRequired,
  onChangeMessage: PropTypes.func.isRequired,
  initialAttributes: PropTypes.object,
  initialMessage: PropTypes.string,
  history: PropTypes.object.isRequired,
};

export default withRouter(ComposeSigrequest);
