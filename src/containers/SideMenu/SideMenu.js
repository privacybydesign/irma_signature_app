import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

// Icons
import BorderColorIcon from 'material-ui-icons/BorderColor';
import VisibilityIcon from 'material-ui-icons/Visibility';
import SendIcon from 'material-ui-icons/Send';
import SettingsIcon from 'material-ui-icons/Settings';
import InfoIcon from 'material-ui-icons/Info';

export default class SideMenu extends React.Component {

  render() {
    const style = {
      height: '100%',
      paddingTop: 60,
    };

    const linkStyle = {
      color: 'inherit',
      textDecoration: 'none',
    }

    return (
      <div style={style}>
        <Link to="/request-signature" style={linkStyle}>
          <ListItem button>
            <ListItemIcon>
              <BorderColorIcon />
            </ListItemIcon>
            <ListItemText primary="Request Signature" />
          </ListItem>
        </Link>
        <Divider />
        <Link to="/verify-signature" style={linkStyle}>
          <ListItem button>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText primary="Verify Signature" />
          </ListItem>
        </Link>
        <Divider />
        <Link to="/sent" style={linkStyle}>
          <ListItem button>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Sent" />
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
