import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

import 'react-select/dist/react-select.css';

const styles = () => ({
  img: {
    width: '75%',
    height: '75%',
    textAlign: 'center',
    objectFit: 'cover',
  },
});

class AttributeChip extends Component {
  render() {
    const { onDelete, attribute, classes } = this.props;
    const logoUrl = attribute.logo.substr(0, 3) === 'go/' ? attribute.logo.substr(3) : attribute.logo;
    return (
      <Chip
        style={{margin: '0.5em'}}
        label={`${attribute.name} - ${attribute.credentialName}`}
        onDelete={onDelete}
        avatar={logoUrl ? <Avatar src={logoUrl} classes={{img: classes.img}} /> : null}
      />
    );
  }
}

AttributeChip.propTypes = {
  onDelete: PropTypes.func,
  attribute: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AttributeChip);
