import React, { Component } from 'react';
import { withRouter, Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RequestSignature from './RequestSignature';
import { addRequest } from './../../actions';
import { getSignatureSavePath, saveSignatureRequestElectron } from './../../actions/electron';
import { createSigrequestFromInput, generateDate } from './../../utils/requestUtils';

class RequestSignatureContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {},
    };
    this.allowNavigate = false;
  }

  exportRequest = () => {
    const { dispatch } = this.props;

    const exportedRequest = createSigrequestFromInput(this.state.value);

    const savePath = getSignatureSavePath();

    if (savePath !== undefined) {
      saveSignatureRequestElectron(exportedRequest, savePath);
      dispatch(addRequest(exportedRequest, generateDate(), this.state.value.name));
    }

    this.allowNavigate = true;
    this.props.history.push('/sent');
  }

  onDiscard = () => {
    this.props.history.push('/');
  }

  onChange = (value) => {
    this.setState({value});
  }

  nontrivialValue(value) {
    if (!value) return false;
    return value.name || value.message || (value.attributes && value.attributes.length !== 0) || value.from;
  }

  onNavigate = () => {
    if (!this.allowNavigate && this.nontrivialValue(this.state.value))
      return 'Leaving will abandon the signature request, are you sure you want to continue?';
    return true;
  }

  render() {
    return (
      <div>
        <Prompt message={this.onNavigate} />
        <RequestSignature
          value={this.state.value}
          onChange={this.onChange}
          onDiscard={this.onDiscard}
          onSubmit={this.exportRequest}
        />
      </div>
    );
  }
}

RequestSignatureContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object,
};

function mapStateToProps(state) {
  return {
  };
}

export default withRouter(connect(mapStateToProps)(RequestSignatureContainer));
