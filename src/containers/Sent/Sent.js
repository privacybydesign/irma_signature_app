import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material UI
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { Table, TableBody } from '@material-ui/core';

// Icons
import IconButton from '@material-ui/core/IconButton';

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
    };
  }

  componentWillReceiveProps(nextProps) {
    const {checked} = this.state;
    this.setState({
      checked: Object.keys(nextProps.requests).reduce((res, id) => {
 res[id] = Boolean(checked[id]); return res;
}, {}),
    });
  }

  handleSelectAll = (event, checked) => {
    const { requests } = this.props;

    this.setState({
      checked: Object.keys(requests).reduce((res, id) => {
res[id] = checked; return res;
}, {}),
    });
  }

  handleCheckbox = id => (event, mark) => {
    const {checked} = this.state;
    this.setState({
      checked: {
        ...checked,
        [id]: mark,
      },
    });
  }

  handleDelete = () => {
    const { dispatch } = this.props;
    const { checked } = this.state;
    const toBeDeleted = Object.keys(checked).filter((id) => {
return checked[id];
});
    dispatch(removeRequests(toBeDeleted));
  }

  renderBody() {
    const {requests} = this.props;
    const {checked} = this.state;
    return Object.keys(requests).map(id => {
      const request = requests[id];
      return (
        <EnhancedTableBody key={id} request={request} checked={checked[id]} onCheckbox={this.handleCheckbox(id)} />
      );
    });
  }

  render() {
    const { checked } = this.state;
    const numChecked = Object.keys(checked).reduce((res, id) => {
 return res + (checked[id]?1:0);
}, 0);
    return (
      <div>
        <Card>
          <CardHeader
            action={
              <IconButton>
                {/* <HelpIcon /> */}
              </IconButton>
            }
            title="Request History"
          />
          <Divider />
          <CardContent style={{ padding: '0px' }}>
            <EnhancedTableToolbar num={numChecked} onDelete={this.handleDelete} />
            <Table>
              <EnhancedTableHead handleSelect={this.handleSelectAll} checked={numChecked === Object.keys(checked).length} />
              <TableBody>
                {this.renderBody()}
              </TableBody>
            </Table>
          </CardContent>
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
