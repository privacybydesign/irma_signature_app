import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';

// Icons
import Delete from '@material-ui/icons/Delete';
import Save from '@material-ui/icons/Save';

import AttributeDropdown from './AttributeDropdown';
import LocalInfoBox from '../../LocalInfoBox';

class ComposeSigrequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validationForced: false,
    };
  }

  validateFull(value) {
    const { name, message, attributes } = value;

    return {
      errorName: !name,
      errorMessage: !message,
      errorAttributes: !attributes || attributes.length === 0,
    };
  }

  validate(value) {
    const { errorName, errorMessage, errorAttributes } = this.validateFull(value);
    return errorName || errorMessage || errorAttributes;
  }

  onChangeName = event => {
    const name = event.target.value;
    this.props.onChange({
      ...this.props.value,
      name,
    });
  }

  onChangeMessage = event => {
    const message = event.target.value;
    this.props.onChange({
      ...this.props.value,
      message,
    });
  }

  onChangeFrom = event => {
    const from = event.target.value;
    this.props.onChange({
      ...this.props.value,
      from,
    });
  }

  addAttribute = (id, value) => {
    this.props.onChange({
      ...this.props.value,
      attributes: {
        ...this.props.value.attributes,
        [id]: value,
      },
    });
  }

  removeAttribute = (id) => {
    this.props.onChange({
      ...this.props.value,
      attributes: (
        Object.keys(this.props.value.attributes)
          .reduce((acc, val) => {
            if (val !== id)
              acc[val] = this.props.value.attributes[val];
            return acc;
          }, {})),
    });
  }

  onSubmit = () => {
    if (this.validate(this.props.value)) {
      this.setState((state) => ({...state, validationForced: true}));
      return;
    }

    this.props.onSubmit();
  }

  render() {
    const { validationForced } = this.state;
    const { value } = this.props;
    const { errorName, errorMessage, errorAttributes } = this.validateFull(value);
    return (
      <CardContent>
        <LocalInfoBox text="Lorem ipsum">
          <TextField
            value={value.name || ''}
            onChange={this.onChangeName}

            label={errorName && validationForced ? 'This field is required' : 'Name:'}
            placeholder={'Name of the signature request'}
            error={errorName && validationForced}
            required
            fullWidth
            margin="normal"
            />
        </LocalInfoBox>
        <LocalInfoBox text="Lorem ipsum">
          <TextField
            className="tfLabel" style={{ backgroundColor: '#f5f5f5', border: '1px solid #16a085', padding: '5px 12px' }}
            InputProps={{
              disableUnderline: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            label={errorMessage && validationForced ? 'This field is required' : 'Message to be signed'}
            onChange={this.onChangeMessage}
            value={value.message || ''}
            multiline
            rows="4"
            rowsMax="16"
            required
            fullWidth
            margin="normal"
            error={errorMessage && validationForced}
          />
        </LocalInfoBox>
        {(errorAttributes && validationForced ? <Typography style={{ paddingTop: '20px', fontSize: '14px', color: 'red', paddingBottom: '6px' }}>You should select at least one attribute!</Typography> : '')}
        <LocalInfoBox text="Lorem ipsum">
          <AttributeDropdown
            selectedAttributes={value.attributes || {}}
            addAttribute={this.addAttribute}
            removeAttribute={this.removeAttribute}
          />
        </LocalInfoBox>
        <LocalInfoBox text="Lorem ipsum">
          <TextField
            value={value.from || ''}
            onChange={this.onChangeFrom}

            label={'Return signed message to:'}
            placeholder={'Email address where you want to receive the signed message.'}
            fullWidth
            margin="normal"
            />
        </LocalInfoBox>
        <Button size="small" style={{ marginLeft: '2px', marginRight: '20px' }} variant="raised" onClick={this.props.onDiscard} >
          Discard request
          <Delete style={{ fontSize: '20', marginLeft: '10', marginRight: '2' }} />
        </Button>
        <Button size="small" style={{ float: 'right', marginRight: '2px' }} variant="raised" color="primary" onClick={this.onSubmit} >
          Export request
          <Save style={{ fontSize: '20', marginLeft: '10', marginRight: '2' }} />
        </Button>
      </CardContent>
    );
  }
}

ComposeSigrequest.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ComposeSigrequest;
