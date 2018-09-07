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
import HelpIcon from '@material-ui/icons/Info';

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
      page: 0,
      rowsPerPage: 5,
    };
  }

  onHelp = () => {
    this.setState(state => ({showHelp: !state.showHelp}));
  }
  
  resetChecked() {
    this.setState((state,props) => ({
      checked: Object.keys(props.requests).reduce((res, id) => {
        res[id] = false; return res;
      }, {}), 
    }));
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
      checked: Object.keys(props.requests).sort((a,b)=>{return props.requests[b].date-props.requests[a].date;}).slice(state.page*state.rowsPerPage, (state.page+1)*state.rowsPerPage).reduce((res, id) => {
res[id] = checked; return res;
}, state.checked),
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
    const message = toBeDeleted.length > 1 ? 'Are you sure you want to delete these requests?' : 'Are you sure you want to delete this requests?';
    if (window.confirm(message))
      dispatch(removeRequests(toBeDeleted));
  }

  renderBody() {
    const {requests} = this.props;
    const {checked, page, rowsPerPage} = this.state;
    return (Object.keys(requests)
                 .sort((a, b) => {
 return requests[b].date - requests[a].date;
})
                 .slice(page*rowsPerPage, (page+1)*rowsPerPage)
                 .map(id => <EnhancedTableBody key={id} request={requests[id]} checked={checked[id]} onCheckbox={this.handleCheckbox(id)} />));
  }

  onChangePage = (event, page) => {
    this.resetChecked();
    this.setState({page});
  }

  onChangeRowsPerPage = (event) => {
    this.resetChecked();
    this.setState({rowsPerPage: event.target.value});
  }

  renderContent() {
    const { checked, page, rowsPerPage } = this.state;
    const { requests } = this.props;
    const numChecked = Object.keys(checked).reduce((res, id) => {
 return res + (checked[id]?1:0);
}, 0);
    return (
      <CardContent style={{ padding: '0px' }}>
        <Table>
          <EnhancedTableHead 
            handleSelect={this.handleSelectAll} checked={numChecked === Object.keys(requests)
                 .sort((a, b) => {
 return requests[b].date - requests[a].date;
})
                 .slice(page*rowsPerPage, (page+1)*rowsPerPage).length && numChecked !== 0} />
          <TableBody>
            {this.renderBody()}
          </TableBody>
        </Table>
        <EnhancedTableToolbar
          num={numChecked}
          onDelete={this.handleDelete}
          count={Object.keys(this.props.requests).length}
          page={this.state.page}
          rowsPerPage={this.state.rowsPerPage}
          onChangePage={this.onChangePage}
          onChangeRowsPerPage={this.onChangeRowsPerPage}
        />
      </CardContent>
    );
  }

  renderHelp() {
    return (
      <CardContent>
        <p>
            On this page, you see an overview of earlier signature
        requests that you have created with this application.  For
        each request, you can see the file name, the message itself,
        the requested attributes and the status of the signature
        (verfied or not).  </p>

        <p> You can select one or more of these entries to view
        details or to delete them from the list.
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
