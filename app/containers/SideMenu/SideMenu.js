import React from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconActionCheckCircle from 'material-ui/svg-icons/action/check-circle';
import IconActionNodeAdd from 'material-ui/svg-icons/action/note-add';
import IconHardwareWatch from 'material-ui/svg-icons/hardware/watch';

export default class SideMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: true };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  render() {
    const style = {
      height: '100%',
      margin: 20,
    };

    return (
      <div>
        <Paper style={style}>
          <List>
            <Link to="/">
              <ListItem primaryText="Menu" />
            </Link>
          </List>
          <Divider />
          <List>
            <Link to="/create-sigrequest">
              <ListItem primaryText="Request Signature" leftIcon={<IconActionNodeAdd />} />
            </Link>
            <Link to="/verify-signature">
              <ListItem primaryText="Verify Signature" leftIcon={<IconActionCheckCircle />} />
            </Link>
            <Link to="/pending-signature-requests">
              <ListItem primaryText="Pending Requests" leftIcon={<IconHardwareWatch />} />
            </Link>
          </List>
        </Paper>
      </div>
    );
  }
}
