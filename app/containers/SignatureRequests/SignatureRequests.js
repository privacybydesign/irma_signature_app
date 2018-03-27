import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RequestTable from './../../components/RequestTable/RequestTable';

class SignatureRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { requests } = this.props;
    console.log('render requests: ', requests);
    return (
      <div style={{ padding: '20px' }}>
        <h2>Request history</h2>
        <RequestTable requests={requests} />
      </div>
    );
  }
}

SignatureRequests.propTypes = {
  requests: PropTypes.objectOf(PropTypes.object).isRequired,
};

SignatureRequests.defaultProps = {
  requests: {},
};

function mapStateToProps(state) {
  return {
    requests: state.signatureRequests.requests,
  };
}

export default connect(mapStateToProps)(SignatureRequests);
