import React from 'react';

import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

const About = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
    <Card style={{ marginTop: '30px', maxWidth: 540 }}>
      <CardHeader
        title="About" />
      <Divider />

      <CardContent>
        The IRMA Signature App has been developed by the Privacy by Design Foundation. More information about our activities and software can be found on our website. IRMA Signature works with the companion app IRMA mobile for Android and iOS. The Android version is available here and the iOS version is available here.
      </CardContent>
    </Card>
  </div>
);

export default About;
