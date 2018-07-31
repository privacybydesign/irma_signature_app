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
    return (
      <React.Fragment>
        <div style={{float:'right'}}>
          <IconButton 
            buttonRef={(ref)=>{this.anchorEl=ref;}}
            onClick={()=>{this.setState({open:true});}}
            >
            <HelpIcon/>
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
            onClose={()=>{this.setState({open:false});}}
          >
            <Typography style={{margin:'1em'}}>{this.props.text}</Typography>
          </Popover>
        </div>
        <div style={{overflow:'auto'}}>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

LocalInfoBox.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.object,
};

export default LocalInfoBox
