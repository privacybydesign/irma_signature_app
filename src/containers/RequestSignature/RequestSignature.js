import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';

import ComposeSigrequest from './children/ComposeSigrequest';

class RequestSignature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHelp: false,
    };
  }

  onHelp = () => {
    this.setState(state => ({showHelp: !state.showHelp}));
  }

  renderContent() {
    return (
      <ComposeSigrequest
        value={this.props.value}
        onChange={this.props.onChange}
        onDiscard={this.props.onDiscard}
        onSubmit={this.props.onSubmit}
        onDrag={this.props.onDrag}
        />
    );
  }

  renderHelp() {
    return (
      <CardContent>
        <p>
           On this page you can create a request for a digital
          signature. Such a request is used for instance in the
          following way.  Suppose Bob wants to borrow the car of Alice
          and Alice wants to have a binding confirmation from Bob that
          he will be responsible for damages and fines etc. Alice can
          then compose a signature request for Bob with this
          application.  Subsequently she sends this request by e-mail
          to Bob, who can sign it in his IRMA app on his phone. He can
          then return the signed message to Alice. Then, Alice can
          again use this application to verify the response of Bob, to
          see that it is indeed a valid signature on her original
          message. She can keep it as proof.
        </p>

        <p>
          In general, IRMA allows you to require that the signer signs
          with certain personal properties, called
          attributes. Examples are the name of the signer, her/his
          e-mail address, phone number, or bank account number, or
          also her/his profession (like medical doctor, possibly
          including registration number).  Below you can select these
          attributes yourself, from a list of available IRMA
          attributes. In this way you determine the attributes of the
          signer that are relevant for the message.
        </p>
        <p>
          The signature itself is not produced with this application,
          but with the IRMA app of the signer. Here, you only produce
          a preparatory signature request, which needs to be sent
          separately to the signer, for the actual signing.  This page
          helps you to produce the request. It allows you to store
          this request on your computer, as a special file with
          <em>.irmarequest</em> extension.  It is up to you to send
          this file to the (phone of the) intended signer, for
          instance by e-mail. There, the actual signing happens, with
          the IRMA app. Thereafter, the signer can return the signed
          message as an <em>.irma</em> file to you as requester, or
          can send it to others. Such signatures can be checked on a
          separate <em>Verify a signature</em> page of this
          application.
        </p>
        <p>
        You can also send a signature request to yourself, and sign it
        with your IRMA app on your own phone. In this way you can
        produce a signed statement and give it as commitment to
        others.
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
            title="Request a signature"
          />
          <Divider />
          {this.state.showHelp ? this.renderHelp() : this.renderContent()}
        </Card>
      </div>
    );
  }
}

RequestSignature.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
};

export default RequestSignature;
