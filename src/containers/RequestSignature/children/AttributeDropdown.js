import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import 'react-select/dist/react-select.css';

class AttributeDropdown extends Component {
  handleSelect = value => {
    const { attributeResult } = this.props;

    const entry = attributeResult.find(el => (
      el.id === value
    ));

    if (entry !== undefined) {
      this.props.addAttribute(value, {
        issuer: entry.issuer,
        name: entry.name,
        credentialName: entry.credentialName,
        logo: entry.logo,
      });
    }
  };

  handleRemove = id => () => {
    this.props.removeAttribute(id);
  };

  getOptions() {
    const { attributeResult } = this.props;
    return attributeResult.map(el => ({
      value: el.id,
      label: `${el.name}   -   ${el.credentialName}`,
    }));
  }

  renderChips() {
    const { selectedAttributes } = this.props;
    return Object.keys(selectedAttributes).map((key) => {
      const value = selectedAttributes[key];
      const logoUrl = value.logo.substr(3); // Removes the leading go/
      return (
        <Chip
          label={`${value.name} - ${value.credentialName}`}
          onDelete={this.handleRemove(key)}
          key={key}
          avatar={logoUrl ? <Avatar src={logoUrl} /> : null}
        />
      );
    });
  }

  render() {
    return (
      <div>
        { this.renderChips() }
        <Select
          multiple
          id="state-select"
          autoFocus
          simpleValue
          clearable
          options={this.getOptions()}
          name="selected-state"
          onChange={this.handleSelect}
          placeholder="Select signature attributes"
          searchable
        />
      </div>
    );
  }
}

AttributeDropdown.propTypes = {
  attributeResult: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedAttributes: PropTypes.objectOf(PropTypes.object).isRequired,
  addAttribute: PropTypes.func.isRequired,
  removeAttribute: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { attributeSearch } = state;

  return {
    attributeResult: attributeSearch.attributeResult,
  };
}

export default connect(mapStateToProps)(AttributeDropdown);
