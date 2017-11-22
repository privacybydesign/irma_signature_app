import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Snackbar from 'material-ui/Snackbar';

import { removeAttribute } from './../../actions';
import AttributeSearch from './../AttributeSearch/AttributeSearch';

class SigrequestField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sigMessage: '',
      body: '',
      subject: '',
      dest: '',
      error: false,
      attributeSearchDialogOpen: false,
      chips: [],
      snackbarOpen: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      chips: this.createChips(nextProps.selectedAttributes),
    });
  }

  handleTextFieldChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    return this.setState({
      [id]: value,
    });
  };

  openAttributeSearchDialog = () => {
    this.setState({ attributeSearchDialogOpen: true });
  };


  closeAttributeSearchDialog = () => {
    this.setState({ attributeSearchDialogOpen: false });
  };

  handleSelectAttributes = () => {
    this.openAttributeSearchDialog();
  }

  handleChipDelete = (key) => {
    const { dispatch } = this.props;
    dispatch(removeAttribute(key));
  };

  handleSubmit = () => {
    const { onSubmit } = this.props;
    if (this.validate()) {
      onSubmit(this.state);
    } else if (this.props.selectedAttributes.size < 1) {
      this.openSnackbar();
    }
  }

  createChips = (attributes) => {
    const result = [];
    attributes.forEach((value, key) => {
      result.push(
        <Chip
          // Key is always unique/constant here so safe to use as index
          key={key} // eslint-disable-line react/no-array-index-key
          onRequestDelete={(chip) => this.handleChipDelete(key, chip)}
        >
          {value}
        </Chip>
      );
    });
    return result;
  }

  openSnackbar = () => {
    this.setState({
      snackbarOpen: true,
    });
  }

  closeSnackbar = () => {
    this.setState({
      snackbarOpen: false,
    });
  }

  validate = () => {
    const error = (
      this.state.sigMessage === '' ||
      this.props.selectedAttributes.size < 1
    );
    this.setState({
      error,
    });
    return !error;
  }

  render() {
    const { disabled } = this.props;
    const errorText = 'This field is required';
    return (
      <div>
        <TextField
          id="sigMessage"
          hintText="Message to be signed"
          errorText={(this.state.error && this.state.sigMessage === '' ? errorText : '')}
          onChange={this.handleTextFieldChange}
          multiLine
          fullWidth
          value={this.state.sigMessage}
        />
        <Divider />
        <TextField
          id="subject"
          hintText="Mail subject"
          onChange={this.handleTextFieldChange}
          fullWidth
          value={this.state.subject}
        />
        <Divider />
        <TextField
          id="body"
          hintText="Mail body"
          onChange={this.handleTextFieldChange}
          fullWidth
          value={this.state.body}
        />
        <Divider />
        <TextField
          id="dest"
          hintText="Recipient mail address"
          onChange={this.handleTextFieldChange}
          fullWidth
          value={this.state.dest}
        />
        <Divider />
        <FlatButton
          label="Select attributes"
          onClick={this.handleSelectAttributes}
        />
        <AttributeSearch
          openState={this.state.attributeSearchDialogOpen}
          handleClose={this.closeAttributeSearchDialog}
        />
        {this.state.chips}
        <RaisedButton
          label="Send signature request"
          onClick={this.handleSubmit}
          disabled={disabled}
          primary
        />
        <Snackbar
          open={this.state.snackbarOpen}
          message="You should select at least one attribute"
          autoHideDuration={4000}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }
}

SigrequestField.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  selectedAttributes: PropTypes.objectOf(PropTypes.string).isRequired,
};

function mapStateToProps(state) {
  const { attributes } = state;

  return {
    selectedAttributes: attributes.attributes,
  };
}

export default connect(mapStateToProps)(SigrequestField);
