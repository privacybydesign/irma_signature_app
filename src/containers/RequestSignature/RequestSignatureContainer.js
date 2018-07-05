import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RequestSignature from './RequestSignature';
import { sendSignatureRequest } from './../../actions';
import { setRequestElectron, getSignatureSavePath, saveSignatureRequestElectron } from './../../actions/electron';
import { createSigrequestFromInput, generateDate } from './../../utils/requestUtils';

class RequestSignatureContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sigrequest: null,
      mail: null,
    };
  }

  handleComplete = () => {
    const { sigrequest, mail } = this.state;
    const mailClientName = this.props.preferredMailClient;
    const mailClientPath = this.props.mailClients[mailClientName].path;

    const request = createSigrequestFromInput(mail.from, sigrequest);

    sendSignatureRequest(request, mailClientName, mailClientPath, mail);
    setRequestElectron(request, generateDate(), mail.recipient);
  }

  exportRequest = () => {
    const { sigrequest } = this.state;

    const exportedRequest = createSigrequestFromInput('Manually exported', sigrequest);

    const savePath = getSignatureSavePath();

    if (savePath !== undefined) {
      saveSignatureRequestElectron(exportedRequest, savePath);
      setRequestElectron(exportedRequest, generateDate(), 'Manually exported');
    }
  }

  onDiscard = () => {
    this.props.history.push('/');
  }

  onReset = () => {
    this.setState({
      sigrequest: null,
      mail: null,
    });
  }
  
  render() {
    return (
      <RequestSignature
        sigrequest={this.state.sigrequest}
        mail={this.state.mail}
        onComplete={this.handleComplete}
        onReset={this.onReset}
        onChangeSigrequest={ (sigrequest) => {this.setState({sigrequest});} }
        onChangeMail={ (mail) => {this.setState({mail});} }
        exportRequest={this.exportRequest}
      />
    );
  }
}

RequestSignature.propTypes = {
  dispatch: PropTypes.func.isRequired,
  mailClients: PropTypes.objectOf(PropTypes.object),
  history: PropTypes.object,
};

function mapStateToProps(state) {
  const { mail } = state;

  return {
    mailClients: mail.mailClients,
    preferredMailClient: mail.preferredMailClient,
  };
}

export default withRouter(connect(mapStateToProps)(RequestSignatureContainer));
