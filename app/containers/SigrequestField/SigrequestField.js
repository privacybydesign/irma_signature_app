import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';

import { removeAttribute } from './../../actions';
import SigTextFields from './../../components/SigTextFields/SigTextFields';
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
    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
      //  display: 'flex',
        flexWrap: 'wrap',
        padding: '0px 0px 20px 0px',
      },
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
          style={this.styles.chip}
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
    return (
      <div>
        <SigTextFields
          onChange={this.handleTextFieldChange}
          sigMessageValue={this.state.sigMessage}
          subjectValue={this.state.subject}
          bodyValue={this.state.body}
          destValue={this.state.dest}
          error={this.state.error}
        />
        <div style={{ padding: '20px 0px 0px 0px' }}>
          <RaisedButton
            label="Add attributes"
            onClick={this.handleSelectAttributes}
            secondary
          />
        </div>
        {this.state.chips.length !== 0 ? <div><Divider /><h4>Signer&apos;s attributes:</h4></div> : ''}
        <div style={this.styles.wrapper}>
          {this.state.chips}
        </div>
        {this.state.chips.length !== 0 ? <Divider /> : ''}
        <RaisedButton
          label="Send signature request"
          onClick={this.handleSubmit}
          disabled={disabled}
          primary
        />
        <AttributeSearch
          openState={this.state.attributeSearchDialogOpen}
          handleClose={this.closeAttributeSearchDialog}
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
  return {
    selectedAttributes: state.attributes.attributes,
  };
}

export default connect(mapStateToProps)(SigrequestField);
