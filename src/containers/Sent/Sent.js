import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material UI
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

// Icons
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';

import { removeRequests } from './../../actions';
import EnhancedTableHead from './children/EnhancedTableHead.js';
import EnhancedTableBody from './children/EnhancedTableBody.js';
import EnhancedTableToolbar from './children/EnhancedTableToolbar.js';

class Sent extends Component {
  constructor(props) {
    super(props);
    const {requests} = props;
    this.state = {
      checked: Object.keys(requests).reduce((res, id) => {
res[id] = false; return res;
}, {}),
      showHelp: false,
    };
  }

  onHelp = () => {
    this.setState(state => ({showHelp: !state.showHelp}));
  }

  componentWillReceiveProps(nextProps) {
    this.setState(state => ({
      checked: Object.keys(nextProps.requests).reduce((res, id) => {
 res[id] = Boolean(state.checked[id]); return res;
}, {}),
    }));
  }

  handleSelectAll = (event, checked) => {
    this.setState((state, props) => ({
      checked: Object.keys(props.requests).reduce((res, id) => {
res[id] = checked; return res;
}, {}),
    }));
  }

  handleCheckbox = id => (event, mark) => {
    this.setState((state) => ({
      checked: {
        ...state.checked,
        [id]: mark,
      },
    }));
  }

  handleDelete = () => {
    const { dispatch } = this.props;
    const { checked } = this.state;
    const toBeDeleted = Object.keys(checked).filter((id) => {
return checked[id];
});
    if (window.confirm('Are you sure you want to delete these requests?'))
      dispatch(removeRequests(toBeDeleted));
  }

  renderBody() {
    const {requests} = this.props;
    const {checked} = this.state;
    return Object.keys(requests).map(id => <EnhancedTableBody key={id} request={requests[id]} checked={checked[id]} onCheckbox={this.handleCheckbox(id)} />);
  }

  renderContent() {
    const { checked } = this.state;
    const numChecked = Object.keys(checked).reduce((res, id) => {
 return res + (checked[id]?1:0);
}, 0);
    return (
      <CardContent style={{ padding: '0px' }}>
        <Table>
          <EnhancedTableHead handleSelect={this.handleSelectAll} checked={numChecked === Object.keys(checked).length && numChecked !== 0} />
          <TableBody>
            {this.renderBody()}
          </TableBody>
        </Table>
        <EnhancedTableToolbar num={numChecked} onDelete={this.handleDelete} />
      </CardContent>
    );
  }

  renderHelp() {
    return (
      <CardContent>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ornare magna magna, dignissim aliquet nunc interdum non. Nullam at bibendum turpis. Aenean interdum, orci ac egestas ultrices, odio eros dapibus ipsum, vel pulvinar magna enim at nulla. Nam ac pulvinar libero, nec feugiat mi. Mauris luctus neque non aliquet tempor. Mauris vulputate velit nisl, vel cursus est tempor non. In hac habitasse platea dictumst.
        </p>

        <p>
          Duis interdum venenatis nibh non suscipit. Aenean at nisi lobortis leo lobortis vehicula quis aliquet nisi. Nulla feugiat elit dapibus luctus faucibus. Suspendisse potenti. Pellentesque a lorem mattis, imperdiet arcu ullamcorper, congue elit. Praesent quis lacus nibh. Duis ac est magna. Duis ante mi, sodales et libero pellentesque, egestas pellentesque ligula. Praesent tellus tellus, hendrerit quis lacus malesuada, consectetur placerat risus. Pellentesque arcu ligula, sollicitudin eget fermentum sit amet, elementum sit amet justo. Morbi ut egestas nulla, in vulputate magna.
        </p>
      </CardContent>
    );
  }

  render() {

    return (
      <div>
        <Card>
          <CardHeader
            action={
              <IconButton onClick={this.onHelp}>
                <HelpIcon />
              </IconButton>
            }
            title="Request History"
          />
          <Divider />
          {this.state.showHelp ? this.renderHelp() : this.renderContent()}
        </Card>
      </div>
    );
  }
}

Sent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  requests: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { storage } = state;

  return {
    ...storage,
  };
}

export default connect(mapStateToProps)(Sent);
