import React, {useState} from "react";
import {Button, Stack, Form, Modal, Container, Row, Col} from "react-bootstrap";
import ScaleText from "react-scale-text";
import './PublicGameInfo.css';


const PublicGameInfo = ({game}) => {


    return (
        <>
            <div
                style={{
                    backgroundColor: "grey",
                    margin: "auto",
                    width: "87%",
                    height: "3rem",
                    fontSize: "1.5rem",
                    marginTop: ".5em",
                    padding: "auto",
                    marginBottom: ".5em",
                    borderRadius: ".5em",
                }}
            >
                <Container>
                    <Row>
                        <Col sm={5} className={"border-right"}>
                            <ScaleText>
                                Jamathon
                            </ScaleText>
                        </Col>
                        <Col sm={4}>
                            <ScaleText>
                                4 Players
                            </ScaleText>
                        </Col>
                        <Col sm={3}>
                                <Button>Join</Button>
                        </Col>
                    </Row>
                </Container>

            </div>

        </>
    )

}

export default PublicGameInfo;
