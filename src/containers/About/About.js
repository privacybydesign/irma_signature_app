import React from 'react';

import { Card, CardHeader, CardContent } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

const About = () => (
  <div>
    <Card >
      <CardHeader
        title="About" />
      <Divider />

      <CardContent>
        <p>The IRMA Signature App has been developed by the Privacy by Design Foundation. More information about our activities and software can be found on the <a href="https://privacybydesign.foundation/">Privacy by Design website</a>.
        </p>
        IRMA Signature works in combination with the mobile companion app IRMA. Download IRMA for free on <a href="https://play.google.com/store/apps/details?id=org.irmacard.cardemu">Google Play for Android</a>
        or on the <a href="https://itunes.apple.com/us/app/irma-authentication/id1294092994"> AppStore for iOS</a>. Signature requests made with IRMA Signature can be signed with this mobile application.
      </CardContent>
    </Card>
  </div>
);

export default About;
