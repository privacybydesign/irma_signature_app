import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip  from '@material-ui/core/Chip';
import Avatar  from '@material-ui/core/Avatar';

import 'react-select/dist/react-select.css';

class AttributeChip extends Component {
  render() {
    const { onDelete, attribute } = this.props;
    const logoUrl = attribute.logo.substr(0, 3) === "go/" ? attribute.logo.substr(3) : attribute.logo;
    return (
      <Chip
        label={`${attribute.name} - ${attribute.credentialName}`}
        onDelete={onDelete}
        avatar={logoUrl ? <Avatar src={logoUrl} /> : null}
      />
    )
  }
}

AttributeChip.propTypes = {
  onDelete: PropTypes.func,
  attribute: PropTypes.object.isRequired,
};

export default AttributeChip;
