import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';

import Input, { InputLabel }  from 'material-ui/Input';
import Chip  from 'material-ui/Chip';
import Avatar  from 'material-ui/Avatar';
import TextField  from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';

import { searchAttributes } from './../../actions';

class AttributeDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: new Map(),
    };
  }

  componentWillMount() {
    this.props.dispatch(searchAttributes());
  }

	handleSelect = value => {
    const { attributeResult } = this.props;

    const entry = attributeResult.find(el => (
      el.id === value
    ));

    if (entry !== undefined) {
      this.setState({
        selected: this.state.selected.set(value, {
            issuer: entry.issuer,
            name: entry.name,
            logo: entry.logo,
          })
      });
    }
  };

  handleDelete = (data) => () => {
    const selected = this.state.selected;
    if (selected.delete(data)) {
      this.setState({
        selected
      });
    }
  }

  getChips() {
    if (this.state.selectValue === null) {
      return [];
    }

    const selected = this.state.selected;
//    const logoImg = require( '../../irma_configuration/logo.png'); //relative path to image
    return Array.from(selected).map(([key, value]) => {
      // const logo = `'../../irma_configuration${value.logo.split('go/irma_configuration')[1]}'`;
      const logoString = '../../irma_configuration/pbdf/pbdf/Issues/idin/logo.png';
      console.log(logoString);
      // const logo = require('../../irma_configuration/pbdf/pbdf/Issues/idin/logo.png');
      const logo = require(logoString);
      return (
        <Chip
          label={value.name}
          onDelete={this.handleDelete(key)}
          key={key}
          avatar={
            <Avatar src={logo} />
          }
        />
      )
    });
  }

  getOptions() {
    const { attributeResult } = this.props;
    return attributeResult.map(el => ({
      value: el.id,
      label: el.name,
    }));
  }

  render() {
    const { attributeSearching, attributeResult } = this.props;
    console.log(this.state.selected);
    return (
      attributeSearching || attributeResult.length !== 0
        ?
          <div>
            {this.getChips()}
            <Select
              id="state-select"
              autoFocus
              simpleValue
              clearable
              options={this.getOptions()}
              name="selected-state"
              onChange={this.handleSelect}
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
  // handleAdd: PropTypes.func.isRequired,
  attributeResult: PropTypes.arrayOf(PropTypes.object).isRequired,
  attributeSearching: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { attributeSearch } = state;

  return {
    attributeResult: attributeSearch.attributeResult,
    attributeSearching: attributeSearch.attributeSearching,
  };
}

export default connect(mapStateToProps)(AttributeDropdown);
