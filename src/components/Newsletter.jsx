import { Alert, Placeholder } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

export const Newsletter = ({onValidated, status, message}) => {

    const [email, setEmail] =useState('');

    useEffect(() => {if (status==='success') clearFields()}, [status])

    const handleSubmit = (e) =>{

        e.preventDefault();
        email &&
        email.indexOf('@') > -1 &&
        onValidated({EMAIL: email})

    }

    const clearFields = () => {

        setEmail('');

    }

    return(

        <Col lg={12}>
            <div className="newsletter-bx wow slideInUp">
                <Row>

                    <Col lg={5} md={12} xs={5} >
                        <h3>Subscribe to our Newsletter</h3>
                        {status==='sending' && <Alert>Sending...</Alert>}
                        {status==='error' && <Alert variant="danger">{message}</Alert>}
                        {status==='success' && <Alert variant="success">{message}</Alert>}
                    </Col>
                    <Col md={12} lg={7} >
                        <form onSubmit={handleSubmit}>
                            <div className="new-email-bx">
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} Placeholder="Email Address"/>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </div>
        </Col>

    )

}