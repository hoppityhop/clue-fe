import React from "react";
import {Container, Row, Col, Button} from "react-bootstrap";

const PlayerRow = ({playerName, characterName, imageResource}) => {
    return (
        <>
            <Row>
                <Col md={6}>
                    <div
                        style={{
                            marginTop: "25%",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "1.5vw",
                            }}
                        >
                            {playerName}
                        </span>
                        <br />
                        <span
                            style={{
                                fontSize: "1.5vw",
                            }}
                        >
                            {characterName}
                        </span>
                    </div>
                </Col>
                <Col>
                    <img
                        src={imageResource}
                        style={{
                            borderRadius: ".5em",
                            objectFit: "contain",
                            marginTop: ".5em",
                            marginBottom: ".5em",
                            maxWidth: "40%",
                            boxShadow: "2px 4px 6px 1px rgba(0, 0, 0, 0.7) ",
                        }}></img>
                </Col>
            </Row>
        </>
    )
}

export default PlayerRow;