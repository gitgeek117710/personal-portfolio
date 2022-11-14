import e from "express";
import { useState } from "react"
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";

export const Contact = () => {

    const formInitialDetails = {

        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        message: '',

    }

    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState('Send');
    const [status, setStatus] = useState({});

    const onFormUpdate = (category, value) => {

        setFormDetails({

            ...formDetails,
            ['category']: value

        })

    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        setButtonText('Sending...');

        let response = await fetch("http://localhost:5000/contact", {

            method: "POST",
            headers: {

                "Content-Type": "Application/json;charset=utf-8",

            },
            
            body: JSON.stringify(formDetails),

        })

        setButtonText('Send');

        let result = response.json();

        setFormDetails(formInitialDetails);

        if(result.code===200){
            setStatus({success: true, message: "Message sent successfully"});
        }else{
            setStatus({success: false, message: "Something went wrong, please try again later."});
        }


    }


    return(

        <section className="contact" id="connect">

            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <img src={contactImg} Alt="Contact Us" />
                    </Col>
                    <Col md={6}>
                        <h2>Get In Touch</h2>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6} className="px-1">
                                    <input type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)}  />
                                </Col>
                                <Col md={6} className="px-1">
                                <input type="text" value={formDetails.lastName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)}  />
                                </Col>
                                <Col md={6} className="px-1">
                                    <input type="text" value={formDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('Email', e.target.value)}  />
                                </Col>
                                <Col md={6} className="px-1">
                                <input type="text" value={formDetails.phone} placeholder="Phone" onChange={(e) => onFormUpdate('phone', e.target.value)}  />
                                </Col>
                                <Col>
                                <textarea row="6" value={formDetails.phone} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)} ></textarea>
                                <button type="submit"><span>{buttonText}</span></button>
                                </Col>

                                {
                                    status.message &&
                                    <Col>
                                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                                    </Col>
                                }

                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>

        </section>

    )

}