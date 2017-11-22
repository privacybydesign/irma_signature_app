import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';

import { searchAttributes, addAttribute, removeAttribute } from './../../actions';

class AttributeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFieldValue: '',
      checkboxes: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.searchPending) {
      this.setState({
        checkboxes: this.createCheckboxes(nextProps.searchResult, nextProps.selectedAttributes)
      });
    }
  }

  handleCheckbox = (event) => {
    const { searchResult, dispatch } = this.props;
    if (event.target.checked) {
      const key = event.target.value;
      dispatch(addAttribute(key, searchResult[key]));
    } else {
      dispatch(removeAttribute(event.target.value));
    }
  }

  createCheckboxes = (searchResult, selected) =>
    Object.keys(searchResult)
      .map(key => (
        <Checkbox
          checked={selected.has(key)}
          label={searchResult[key]}
          onCheck={this.handleCheckbox}
          key={key}
          value={key}
        />
      ));

  handleSearchField = (event) => {
    const { dispatch, searchPending } = this.props;
    const searchFieldValue = event.target.value;
    this.setState({
      searchFieldValue,
    });
    if (!searchPending) {
      dispatch(searchAttributes(searchFieldValue));
    }
  };

  render() {
    const { handleClose, openState } = this.props;
    const actions = [
      <FlatButton
        label="Save selected attributes"
        primary
        onClick={handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Select attributes:"
          actions={actions}
          modal={false}
          open={openState}
          onRequestClose={handleClose}
        >
          <TextField
            hintText="Search for attributes..."
            onChange={this.handleSearchField}
            value={this.state.searchFieldValue}
          />
          {this.state.checkboxes}
        </Dialog>
      </div>
    );
  }
}

AttributeSearch.propTypes = {
  dispatch: PropTypes.func.isRequired,
  searchResult: PropTypes.objectOf(PropTypes.string).isRequired,
  openState: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedAttributes: PropTypes.objectOf(PropTypes.string).isRequired,
  searchPending: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { attributes } = state;

  return {
    searchResult: attributes.searchResult,
    searchPending: attributes.searchPending,
    selectedAttributes: attributes.attributes,
  };
}

export default connect(mapStateToProps)(AttributeSearch);
