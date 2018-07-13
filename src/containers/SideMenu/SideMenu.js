import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

// Icons
import BorderColorIcon from '@material-ui/icons/BorderColor';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import ListIcon from '@material-ui/icons/List';

export default class SideMenu extends React.Component {

  render() {
    const style = {
      width: 250,
      flexShrink: 0,
      borderRight: '0px solid rgba(0, 0, 0, 0.12)',
      backgroundColor: 'white',
    };
    const itemStyle = {
      paddingLeft: 6,
      paddingRight: 6,
    };
    const iconStyle = {
      paddingLeft: 18,
    };
    const linkStyle = {
      color: 'inherit',
      textDecoration: 'none',
    };

    return (
      <div style={style} >
        <Link to="/request-signature" style={linkStyle}>
          <ListItem style={iconStyle} button>
            <ListItemIcon>
              <BorderColorIcon />
            </ListItemIcon>
            <ListItemText style={itemStyle} primary="Request a signature" />
          </ListItem>
        </Link>
        <Divider />
        <Link to="/verify-signature" style={linkStyle}>
          <ListItem style={iconStyle} button>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText style={itemStyle} primary="Verify a signature" />
          </ListItem>
        </Link>
        <Divider />
        <Link to="/sent" style={linkStyle}>
          <ListItem style={iconStyle} button>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText style={itemStyle} primary="View request history" />
          </ListItem>
        </Link>
        <Divider />
        <Link to="/settings" style={linkStyle}>
          <ListItem style={iconStyle} button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText style={itemStyle} primary="Settings" />
          </ListItem>
        </Link>
        <Divider />
        <Link to="/about" style={linkStyle}>
          <ListItem style={iconStyle} button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText style={itemStyle} primary="About" />
          </ListItem>
        </Link>
        <Divider />
      </div>
    );
  }
}
