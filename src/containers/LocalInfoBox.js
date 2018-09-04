import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import HelpIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';

class LocalInfoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const vertStyle = this.props.vertAdjust ? {top: this.props.vertAdjust} : {};
    return (
      <div style={{display: 'flex'}}>
        <div style={{flexGrow: '100', display: 'inline-flex'}}>
          <div style={{width: '100%'}}>
            {this.props.children}
          </div>
        </div>
        <div style={{...vertStyle, display: 'inline-flex', position: 'relative', left: '16px'}}>
          <IconButton
            buttonRef={(ref) => {
 this.anchorEl=ref;
}}
            onClick={() => {
this.setState({open: true});
}}
            tabIndex={-1}
            >
            <HelpIcon />
          </IconButton>
          <Popover
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={this.state.open}
            anchorEl={this.anchorEl}
            onClose={() => {
 this.setState({open: false});
}}
          >
            <div style={{maxWidth: '30em'}}>
              { this.props.renderMessage ? this.props.renderMessage() : <Typography style={{margin: '1em'}}>{this.props.text}</Typography> }
            </div>
          </Popover>
        </div>
      </div>
    );
  }
}

LocalInfoBox.propTypes = {
  renderMessage: PropTypes.func,
  text: PropTypes.string,
  vertAdjust: PropTypes.string,
  children: PropTypes.object,
};

export default LocalInfoBox;
