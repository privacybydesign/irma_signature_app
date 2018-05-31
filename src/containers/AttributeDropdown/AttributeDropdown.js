import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import Chip  from 'material-ui/Chip';
import Avatar  from 'material-ui/Avatar';

import { searchAttributes } from './../../actions';

import 'react-select/dist/react-select.css';

import logo from '../../irma_configuration/pbdf/pbdf/Issues/idin/logo.png'; // TODO: make dynamic import?

class AttributeDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chips: [],
    };
  }

  componentWillMount() {
    this.props.dispatch(searchAttributes());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      chips: this.getChips(nextProps.selectedAttributes),
    });
  }

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

  getChips(selectedAttributes) {
    return Object.keys(selectedAttributes).map((key) => {
      const value = selectedAttributes[key];
      return (
        <Chip
          label={`${value.name} - ${value.credentialName}`}
          onDelete={this.handleRemove(key)}
          key={key}
          avatar={(value.credentialName === 'iDIN') ?  <Avatar src={logo} /> : null}
        />
      )
    });
  }

  getOptions() {
    const { attributeResult } = this.props;
    return attributeResult.map(el => ({
      value: el.id,
      label: `${el.name}   -   ${el.credentialName}`
    }));
  }

  render() {
    const { attributeSearching, attributeResult } = this.props;
    return (
      attributeSearching || attributeResult.length !== 0
        ?
          <div>
            {this.state.chips}
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
        :
          <div>
            TODO: show spinner!
          </div>
    );
  }
}

AttributeDropdown.propTypes = {
  dispatch: PropTypes.func.isRequired,
  attributeResult: PropTypes.arrayOf(PropTypes.object).isRequired,
  attributeSearching: PropTypes.bool.isRequired,
  selectedAttributes: PropTypes.objectOf(PropTypes.object).isRequired,
  addAttribute: PropTypes.func.isRequired,
  removeAttribute: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { attributeSearch } = state;

  return {
    attributeResult: attributeSearch.attributeResult,
    attributeSearching: attributeSearch.attributeSearching,
  };
}

export default connect(mapStateToProps)(AttributeDropdown);
