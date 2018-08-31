import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';

// Icons
import Delete from '@material-ui/icons/Delete';
import Save from '@material-ui/icons/Save';
import Launch from '@material-ui/icons/Launch';

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
      this.setState({validationForced: true});
      return;
    }

    this.props.onSubmit();
  }

  onDrag = () => {
    if (this.validate(this.props.value)) {
      this.setState({validationForced: true});
      return;
    }

    this.props.onDrag();
  }

  render() {
    const { validationForced } = this.state;
    const { value } = this.props;
    const { errorName, errorMessage, errorAttributes } = this.validateFull(value);
    return (
      <CardContent>
        <LocalInfoBox text="In this field you write a self-chosen name for the signature request that you are producing. It will be used as name of the file in which this signature request is stored. It will also be used in the history overview of all earlier signature requests. This name is not be part of what will be signed." vertAdjust="27px">
          <TextField
            value={value.name || ''}
            onChange={this.onChangeName}

            label={errorName && validationForced ? 'This field is required' : 'Name:'}
            placeholder={'Name of the signature request'}
            error={errorName && validationForced}
            required
            fullWidth
            autoFocus
            margin="normal"
            />
        </LocalInfoBox>
        <LocalInfoBox text="This is the exact message that you wish to be signed. 
        You can only use plain text to formulate this message. 
        Please note that the intended signer can not change this message.
        Note that the time of signing is automatically added in the signature and need not be part of this message field." vertAdjust="3em">
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
        <LocalInfoBox text="Here you select one or more attributes of the intended signer, such as name, (e-mail) address, or profession, etc. 
        These attributes need to be valid for the intended signer at the moment the signature is created. 
        Ultimately, when this signature has been created and is then verified, the validity of these attributes is checked and shown.
        " vertAdjust="-6px">
          <AttributeDropdown
            selectedAttributes={value.attributes || {}}
            addAttribute={this.addAttribute}
            removeAttribute={this.removeAttribute}
          />
        </LocalInfoBox>
        <LocalInfoBox text="In this field you write the e-mail address to which the signed message can be delivered. 
        Typically, this is your own e-mail address.  
        The signer can send the message after signing it in the IRMA app on her/his phone.
        For convenience, you can set a default address for this field in the settings section.
        This delivery address is not part of the message that will be signed." vertAdjust="25px"> 
          <TextField
            value={value.from || ''}
            onChange={this.onChangeFrom}

            label={'Deliver signed message to:'}
            placeholder={'Email address where you wish the signed message to be delivered.'}
            fullWidth
            margin="normal"
            />
        </LocalInfoBox>
        <div style={{ float: 'right', marginRight: '48px' }}>
          <Button size="small" variant="raised" style={{ marginRight: '20px' }} onClick={this.onDrag}>
            Drag request
            <Launch style={{ fontSize: '20', marginLeft: '10', marginRight: '2' }} />
          </Button>
          <Button size="small" variant="raised" color="primary" onClick={this.onSubmit}>
            Export request
            <Save style={{ fontSize: '20', marginLeft: '10', marginRight: '2' }} />
          </Button>
        </div>
        <Button size="small" style={{ marginLeft: '2px', marginRight: '20px' }} variant="raised" onClick={this.props.onDiscard} >
          Discard request
          <Delete style={{ fontSize: '20', marginLeft: '10', marginRight: '2' }} />
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
  onDrag: PropTypes.func.isRequired,
};

export default ComposeSigrequest;
