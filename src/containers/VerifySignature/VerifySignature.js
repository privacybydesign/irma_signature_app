import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Icon, Upload } from 'antd';

// Material UI
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

// Icons
import IconButton from '@material-ui/core/IconButton';

import { verifyStoredSignature } from './../../actions';
import SignatureResult from './SignatureResult';
import AttributeResultTable from './AttributeResultTable';

// CSS
import 'antd/lib/upload/style/css';

class VerifySignature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      verifyDone: false,
    };
  }

  handleUpload = (event => {
    const { dispatch, verifyPending } = this.props;

    this.setState({
      message: '',
      verifyDone: false,
    });

    if (verifyPending) {
      return;
    }

    const path = event.file.originFileObj.path;
    dispatch(verifyStoredSignature(path));
  });

  componentWillReceiveProps(nextProps) {
    const { signature, signatureResult } = nextProps;
    if (signatureResult === undefined || Object.keys(signatureResult).length === 0) {
      // No verified response received yet, do nothing
      return;
    }

    try {
      const { message } = JSON.parse(signature)
      this.setState({
        message,
        verifyDone: true,
      });
    } catch (e) {
      this.setState({
        verifyDone: true,
      });
    }
  }

  render() {
    const { signatureResult } = this.props;
    const { verifyDone } = this.state;
    return (
      <div>
        <Card>
          <CardHeader
            action={
              <IconButton>
                {/* <HelpIcon /> */}
              </IconButton>
            }
            title="Verify a signature"
          // subheader="Signature requests are shared via email. Fill in the information below to create a signature request email."
          />
          <Divider />

          <CardContent style={{ paddingLeft: '30px' }}>
            <div className="dropbox">
              <Upload.Dragger
                accept=".irma"
                name="files"
                beforeUpload={(() => false)}
                onChange={this.handleUpload}
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">In order to verify a signature, click here or drag the signed message to this area.</p><p> A signed message has the filename extension <i>.irma</i>.</p>
                <p className="ant-upload-hint"></p>
              </Upload.Dragger>
            </div>
          </CardContent>
        </Card>

        {verifyDone ? (
          <div>
            <SignatureResult
              proofStatus={signatureResult.proofStatus}
              message={this.state.message}
              matched={signatureResult.request !== undefined}
              signatureRequest={signatureResult.request}
            />
            <Divider />
            <AttributeResultTable
              attributes={signatureResult.disjunctions
                ?
                signatureResult.disjunctions
                :
                signatureResult.credentialList}
              matched={signatureResult.request !== undefined}
              proofStatus={signatureResult.proofStatus}
            />
          </div>
        ) : ''}
      </div>
    );
  }
}

VerifySignature.propTypes = {
  dispatch: PropTypes.func.isRequired,
  signature: PropTypes.string,
  signatureResult: PropTypes.object,
};

function mapStateToProps(state) {
  const { signatureVerify } = state;
  const result = signatureVerify.verifications[signatureVerify.verified];
  const signatureResult = result !== undefined ? result.signatureResult : undefined;
  return {
    signatureResult,
  };
}

export default connect(mapStateToProps)(VerifySignature);
