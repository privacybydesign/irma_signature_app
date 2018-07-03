import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import requestImg from '../../static/images/request.png';
import verifyImg from '../../static/images/verify.png';

const cardStyle = {
  float: 'left',
  marginLeft: '40px',
  marginRight: '40px',
  marginBottom: '40px',
  maxWidth: 240
};

const Home = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
    <Card style={cardStyle}>
      <Link to="/request-signature">
        <Button>
          <img style={{ width: '99%' }} alt={"Request a signature"} src={requestImg} />
        </Button>
        <CardContent>
          <Typography style={{ fontSize: '18px', textAlign: 'center' }} type="headline" component="h2">
            Request a signature
          </Typography>
        </CardContent>
      </Link>
    </Card>
    <Card style={cardStyle}>
      <Link to="/verify-signature">
        <Button>
          <img style={{ width: '99%' }} alt={"Verify a signature"} src={verifyImg} />
        </Button>
        <CardContent>
          <Typography style={{ fontSize: '18px', textAlign: 'center' }} type="headline" component="h2">
            Verify a signature
          </Typography>
        </CardContent>
      </Link>
    </Card>
  </div>
);

export default Home;
