import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faEnvelope, faUnlockAlt} from "@fortawesome/free-solid-svg-icons";
import {Col, Row, Form, Card, Button, Container, InputGroup} from '@themesberg/react-bootstrap';
import {Link, useParams} from 'react-router-dom';

import {Routes} from "../../routes";
import BackendService from "../../util/BackendService";


export default () => {
    const backendService = new BackendService();
    const {page, id} = useParams();

    const [data, setData] = useState()


    console.log(page, id)
    console.log(data)

    useEffect(() => {
        backendService.getDetails(page, id).then(d => setData(d))
    }, [id])

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const createForm = () => {

        if (data) {
            const {id, name, description, ...rest} = data

            const smallTexts = Object.keys(rest).map(field => typeof rest[field] !== "object" && (
                <Form.Group id="id" className="mb-4">
                    <Form.Label>{capitalize(field)}</Form.Label>
                    <InputGroup>
                        <Form.Control readOnly defaultValue={rest[field]}/>
                    </InputGroup>
                </Form.Group>
            ))

            const bigTexts = Object.keys(rest).map(field => typeof rest[field] === "object" && rest[field] && (
                <>
                    <h4 className="mb-4">{capitalize(field)}</h4>
                    {
                        Object.keys(rest[field]).map(subfield => rest[field][subfield] && (

                            <Form.Group id="id" className="mb-4">
                                <Form.Label>{capitalize(subfield)}</Form.Label>
                                <InputGroup>
                                    {rest[field][subfield].length > 100 ?
                                        <Form.Control readOnly as="textarea" defaultValue={rest[field][subfield]}/>
                                        :
                                        <Form.Control readOnly defaultValue={rest[field][subfield]}/>
                                    }
                                </InputGroup>
                            </Form.Group>

                        ))
                    }
                </>
            ))
            console.log(rest)
            return (<Form>
                <Form.Group id="id" className="mb-4">
                    <Form.Label>ID</Form.Label>
                    <InputGroup>
                        <Form.Control readOnly defaultValue={id}/>
                    </InputGroup>
                </Form.Group>
                <Form.Group id="name" className="mb-4">
                    <Form.Label>Name</Form.Label>
                    <InputGroup>
                        <Form.Control readOnly defaultValue={name}/>
                    </InputGroup>
                </Form.Group>
                <Form.Group id="description" className="mb-4">
                    <Form.Label>Description</Form.Label>
                    <InputGroup>
                        <Form.Control readOnly as="textarea" defaultValue={description}/>
                    </InputGroup>
                </Form.Group>
                {smallTexts}
                {bigTexts}
            </Form>)
        }
    }

    return (
        <main>
            <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container fluid style={{paddingLeft: 0, paddingRight: 0}}>
                    <Row className="justify-content-center">
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-700">
                                <h3 className="mb-4">Details</h3>
                                {createForm()}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
};
