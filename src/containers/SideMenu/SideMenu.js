import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

// Icons
import BorderColorIcon from 'material-ui-icons/BorderColor';
import VisibilityIcon from 'material-ui-icons/Visibility';
import SettingsIcon from 'material-ui-icons/Settings';
import InfoIcon from 'material-ui-icons/Info';
import ListIcon from 'material-ui-icons/List';

export default class SideMenu extends React.Component {

  render() {
    const style = {
      height: 'calc(100vh - 60px - 24px)',
      paddingTop: 60,
      borderRight: '1px solid rgba(0, 0, 0, 0.12)',
      backgroundColor: 'white',
    };
    const linkStyle = {
      color: 'inherit',
      textDecoration: 'none',
    }

    return (
      <div style={style} >
        <Link to="/request-signature" style={linkStyle}>
          <ListItem button>
            <ListItemIcon>
              <BorderColorIcon />
            </ListItemIcon>
            <ListItemText primary="Request a signature" />
          </ListItem>
        </Link>
        <Divider />
        <Link to="/verify-signature" style={linkStyle}>
          <ListItem button>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText primary="Verify a signature" />
          </ListItem>
        </Link>
        <Divider />
        <Link to="/sent" style={linkStyle}>
          <ListItem button>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="View request history" />
          </ListItem>
        </Link>
        <Divider />
        <Link to="/settings" style={linkStyle}>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </Link>
        <Divider />
        <Link to="/about" style={linkStyle}>
          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
        </Link>
        <Divider />
      </div>
    );
  }
}
