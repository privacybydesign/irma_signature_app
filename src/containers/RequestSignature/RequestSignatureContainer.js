import React, { Component } from 'react';
import { withRouter, Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RequestSignature from './RequestSignature';
import { addRequest } from './../../actions';
import { getSignatureSavePath, saveSignatureRequestElectron, dragSignatureRequestElectron } from './../../actions/electron';
import { createSigrequestFromInput, generateDate } from './../../utils/requestUtils';

class RequestSignatureContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        from: props.defaultReturnEmail || '',
      },
      cachedRequest: null,
    };
    this.allowNavigate = false;
  }
  
  createRequest() {
    if (this.state.cachedRequest)
      return this.state.cachedRequest;
  
    const input = this.state.value;
    const { dispatch } = this.props;
    
    const exportedRequest = createSigrequestFromInput(input);
    dispatch(addRequest(exportedRequest, generateDate(), this.state.value.name));
    this.setState({cachedRequest: exportedRequest});
    return exportedRequest;
  }

  exportRequest = () => {
    const { defaultSaveDirectory } = this.props;

    const savePath = getSignatureSavePath(defaultSaveDirectory);

    if (savePath !== undefined) {
      const exportedRequest = this.createRequest();
      saveSignatureRequestElectron(exportedRequest, savePath);
      this.allowNavigate = true;
      this.props.history.push('/sent');
    }
  }
  
  onDrag = () => {
    const exportedRequest = this.createRequest();
    dragSignatureRequestElectron(exportedRequest);
    this.allowNavigate = true;
  }

  onDiscard = () => {
    this.props.history.push('/');
  }

  onChange = (value) => {
    this.setState({value, cachedRequest: null});
  }

  nontrivialValue(value) {
    if (!value) return false;
    return value.name || value.message || (value.attributes && value.attributes.length !== 0) || (value.from && value.from !== this.props.defaultReturnEmail);
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
          onDrag={this.onDrag}
        />
      </div>
    );
  }
}

RequestSignatureContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object,
  defaultReturnEmail: PropTypes.string,
  defaultSaveDirectory: PropTypes.string,
};

function mapStateToProps(state) {
  const { defaultReturnEmail, defaultSaveDirectory } = state.settings;
  return {
    defaultReturnEmail,
    defaultSaveDirectory,
  };
}

export default withRouter(connect(mapStateToProps)(RequestSignatureContainer));
