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
        <p>This IRMA-graph app is part of the identity platform IRMA, developed
and maintained by the non-for-profit foundation called Privacy by
Design, see: <a onClick={()=>{openExtern('https://privacybydesign.foundation/en/');}}>https://privacybydesign.foundation/en/</a></p>

<p>The IRMA platform is attribute-based and thereby very flexible and
powerful. Attributes are personal properties, like: name, gender,
date-of-birth, address, e-mail, phone number, memberships, etc. IRMA
offers both attribute-based authentication and attribute-based signing
(autographs).</p>

<p>With IRMA's attribute-based authentication you can log into a website
or get access on the basis of only relevant attributes.  For instance,
in order to watch a certain movie or play a game online, with IRMA you
disclose only the attribute that you are older than 16 (say), and
nothing else.</p>

<p>With IRMA's attribute-based signing you can digitally sign a message
with attributes that hold for you. Typically you use your name
attribute to sign, but maybe also the fact that you are a medical
doctor (to sign a recipe), or that you are a registred individual
using your social/citizen identification number attribute (to file a
request), or that your are the owner of a certain bank account
attribute (to authorise a payment).</p>

<p>Attribute-based signing provides much more flexibility than
traditional PKI-based signing. Illustrations of how to use IRMA
attributes for signing can be found at:</p>

<p><a onClick={()=>{openExtern('https://privacybydesign.foundation/demo-en/signature/');}}>https://privacybydesign.foundation/demo-en/signature/</a></p>

<p>This IRMA-graph app provides two basic functions.</p>

<p>
<ol>
<li>It allows you to compose a "signature request", that is a message
   that you want someone to sign using certain attributes. The app
   allows you to write this message (as plain text), to add the
   attributes that you want to know for sure from the signer, and to
   send the resulting signature request by e-mail to the intended
   signer. The actual signature is produced on the phone of the
   signer, via the (ordinary) IRMA app that is freely avialable in
   Google's and Apple's app stores. Of course, you can also use the
   IRMA-graph app to send such a signature request to yourself, so that
   you can produce a signed statement yourself.</li>

<li>The IRMA-graph app also allows you to verify a digitally signed
   message produced as in step 1. This verification is done locally,
   in the IRMA-graph app itself. It involves a number of cryptographic
   checks.</li>
</ol></p>

<p>The functionality and support of the IRMA-graph app will be extended in
due course, for instance to allow also signing of pdf documents.</p>

<p>The software of the IRMA-graph app is openly available (it's open
source), see:</p>

<p><a onClick={()=>{openExtern('https://github.com/privacybydesign/irma_signature_app');}}>https://github.com/privacybydesign/irma_signature_app</a></p>

<p>There is a pre-packaged version of this app available in app stores.
It contains the same functionality as the open source version, but it
is not free. The app store version offers ease-of-installation and is
updated automatically.</p>

<p>For comments, questions, and feedback, send an e-mail to:</p>

<p><a onClick={()=>{openExtern('mailto:irma@privacybydesign.foundation');}}>irma@privacybydesign.foundation</a></p>

<p>Warning: signatures, also in digital form, may have (legal) effects,
and bind/commit you to the content of the message that you sign.
Whatever you sign with the IRMA technology is your own personal
responsibility. By using the IRMA-graph and IRMA app software you agree
that the Privacy by Design foundation is no party in whatever
agreement you entern into by via an IRMA signature. In particular, the
Privacy by Design foundation is not responsible or liable.</p>

<p>The Privacy by Design foundation does not collect information about
the normal usage of the IRMA sign app. In particular, the foundation
does not see whatever you sign. If the IRMA-graph software fails for
some reason, you are asked whether you agree that a bug report is sent
to the foundation, only for the purpose of technical analysis and
improvement.</p>

<p>Please note that signature requests produced by IRMA-graph are sent by
ordinary, non-encrypted e-mail. This means that the content of your
requests has the same (limited) level of protection as ordinary e-mail
messages.</p>
      </CardContent>
    </Card>
  </div>
);

export default About;
