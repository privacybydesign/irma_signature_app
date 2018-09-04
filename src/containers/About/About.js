import React from 'react';

import { Card, CardHeader, CardContent } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import { openExtern } from '../../actions/electron';

const About = () => (
  <div>
    <Card >
      <CardHeader
        title="About" />
      <Divider />

      <CardContent>
        <p>This desktop application is part of the identity platform IRMA,
developed and maintained by the non-for-profit foundation called
Privacy by Design, see: <a onClick={() => {
openExtern('https://privacybydesign.foundation/en/');
}}>https://privacybydesign.foundation/en/</a>. It supplements
the IRMA mobile app that is freely avialable in Google&apos;s and
Apple&apos;s app stores.</p>

        <p>The IRMA platform is attribute-based and thereby very flexible and
powerful. Attributes are personal properties, like: name, gender,
date-of-birth, address, e-mail, phone number, memberships, etc. IRMA
offers both attribute-based <em>authentication</em> and attribute-based <em>signing</em>. </p>

        <p>With the IRMA mobile app you can do IRMA&apos;s attribute-based <em>authentication</em> in order to log
into a website or get access on the basis of only relevant attributes.
For instance, in order to watch a certain movie or play a game online,
with IRMA you disclose only the attribute that you are older than 16
(say), and nothing else.</p>

        <p>With the IRMA mobile app you can also create attribute-based <em>signatures</em> in order to digitally
sign a message with attributes that hold for you. This allows you to
sign in a certain role. Typically you use your name attribute to sign
as yourself; but in another situation you may sign as a medical doctor
using your medical registration attribute, for instance to sign a
recipe; alternatively, you may sign as citizen using your
social/citizen identification number attribute, e.g. to file a request
to the authorities; in another situation you may sign as the owner of
a certain bank account attribute, to authorise a payment.</p>

        <p>Attribute-based signing provides much more flexibility than
traditional (PKI-based) signing. Illustrations of how to use IRMA
attributes for signing can be found at:</p>

        <p><a onClick={() => {
 openExtern('https://privacybydesign.foundation/demo-en/signature/');
}}>https://privacybydesign.foundation/demo-en/signature/</a></p>

        <p>IRMA signatures are produced in the IRMA mobile app on a phone.
	This desktop application plays a different, auxiliary role in the
	whole signing process. It provides two basic functions, which
	are useful <em>before</em> and <em>after</em> the digital
	signing itself, namely to <em>prepare</em> a message or document that needs to be signed and to <em>check</em> a signature on such a document.</p>

        <p>
          <ol>
            <li>This desktop application allows you to compose a
   &quot;signature request&quot;, that is, a message that you want
   someone to sign using certain attributes. The application allows
   you to write this message (as plain text), to add the attributes
   that you want to know for sure from the signer, and to locally
   store the resulting signature request.  You then have to send the
   request yourself, for instance by e-mail to the intended
   signer. The actual signature is produced on the phone of the
   signer, via the IRMA mobile app. Of course, you can also use this
   desktop application to send such a signature request to yourself, so that
   you can produce a signed statement yourself.</li>

            <li>This application also allows you to verify a digitally
   signed message produced as in step 1. This verification is done
   locally, in the application itself. It involves a number of
   cryptographic checks.</li>
          </ol></p>

        <p>The software of this application is openly available (it&apos;s open
source), see:</p>

        <p><a onClick={() => {
 openExtern('https://github.com/privacybydesign/irma_signature_app');
}}>https://github.com/privacybydesign/irma_signature_app</a></p>

        <p>There is a pre-packaged version of this application
available in app stores.  It contains the same functionality and code
as the open source version, but it is not free. The app store version
offers ease-of-installation and is updated automatically.</p>

        <p><b>Warning</b>: signatures, also in digital form, may have
(legal) effects, and bind/commit you to the content of the message
that you sign.  Whatever you sign with the IRMA technology is your own
personal responsibility. By using the IRMA platform you agree that the
Privacy by Design foundation is no party in whatever agreement you
enter into via an IRMA signature. In particular, the Privacy by
Design foundation is not responsible or liable.</p>

        <p>The Privacy by Design foundation does not collect
information about the normal usage of the IRMA app. In particular, the
foundation does not see whatever you sign. If the platform fails for
some reason, you are asked whether you agree that a bug report is sent
to the foundation, only for the purpose of technical analysis and
improvement.</p>

        <p>Please note that if you send a signature (request) by
ordinary, non-encrypted e-mail, the contents of your request has the
same (limited) level of protection as ordinary e-mail messages. It is
advised to use encrypted mail if you wish to protect the content.</p>

        <p>
	IRMA&apos;s signature mechanism offers basic functionality,
but it does <em>not</em>, at this stage offer: </p>
        <p>
          <ul>
            <li>
	Signing of pdf documents, or of other formats than plain text. </li>

            <li>
	Batch signing, whereby multiple messages are signed at the same
    time.
            </li>

            <li>
	Successive signing of the same message by multiple people,
    resulting in one signature file. In the current set-up it is possible however
    that the same signature request is separately signed by multiple
    people, creating multiple signature files. </li>

            <li>
	Signature requests which are digitally signed themselves, by
	the requester, so that the intended signer gets certainty
	about the origin of the request.</li>

          </ul> </p>

        <p>For comments, questions, feedback or support, send an e-mail to:</p>

        <p><a onClick={() => {
 openExtern('mailto:irma@privacybydesign.foundation');
}}>irma@privacybydesign.foundation</a></p>


      </CardContent>
    </Card>
  </div>
);

export default About;
