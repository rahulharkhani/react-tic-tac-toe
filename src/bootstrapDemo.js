import React from 'react';
//import './bootstrap.min.css';
import { Button, ButtonToolbar, Alert } from 'react-bootstrap';

class BootstrapDemo extends React.Component {  
  render() {
    return (
      <>
        <ButtonToolbar>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="info">Info</Button>
            <Button variant="light">Light</Button>
            <Button variant="dark">Dark</Button>
            <Button variant="link">Link</Button>
        </ButtonToolbar>

        <Alert variant="success">
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>
                Aww yeah, you successfully read this important alert message. This example
                text is going to run a bit longer so that you can see how spacing within an
                alert works with this kind of content.
            </p>
            <hr />
            <p className="mb-0">
                Whenever you need to, be sure to use margin utilities to keep things nice
                and tidy.
            </p>
        </Alert>
      </>
    );
  }
}
export default BootstrapDemo;