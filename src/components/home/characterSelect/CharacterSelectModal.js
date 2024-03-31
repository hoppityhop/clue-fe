import {wait} from "@testing-library/user-event/dist/utils";
import React, {useEffect, useState} from "react";
import {
    Button,
    Form,
    Card,
    Modal,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import {useCookies} from "react-cookie";

import {useHistory, useNavigate} from "react-router-dom";
import characterService from "../../../services/characterService";
import gameService from "../../../services/gameService";
import playerService from "../../../services/playerService";

const CharacterSelectModal = (props) => {
        const [selectedCharacter, setSelectedCharacter] = useState(0);
        const [availableCharacters, setAvailableCharacters] = useState([]);
        const [cookies, setCookie, removeCookie] = useCookies();


        //Props for new game
        const gameName = props.gameName;
        const isPublic = props.isPublic;
        const ownerName = props.ownerName;
        const characters = props.characters;

        //Props for joining
        const joinCode = props.joinCode;
        const playerName = props.playerName;

        const navigate = useNavigate();


        const handleClick = (e) => {
            let value = e.currentTarget.getAttribute("value");
            console.log(value);
            value = parseInt(value);
            console.log(value);
            setSelectedCharacter(value);
        };

        const selectCharacter = async (e) => {
            console.log("Clicked");
            let externalGameId;
            if (props.newGame) {
                const newGameSession = {
                    ownerName: ownerName,
                    gameName: gameName,
                    isPublic: isPublic,
                    characterId: selectedCharacter,
                }

                const newGameConfirmation = await gameService.postNewGame(newGameSession);
                console.log(newGameConfirmation);
                externalGameId = newGameConfirmation.externalGameId;
                let sessionId = newGameConfirmation.sessionId;
                setCookie('externalGameId', externalGameId, {
                    path: '/',
                    maxAge: 3600
                });
                setCookie('sessionId', sessionId, {
                    path: '/',
                    maxAge: 3600
                });
            } else {
                const joinGameRequest = {
                    joinCode: joinCode,
                    playerName: playerName,
                    characterId: selectedCharacter,
                }
                const joinConfirmation = await playerService.joinGame(joinGameRequest);
                console.log(joinGameRequest);
                console.log(joinConfirmation);
                setCookie('sessionId', joinConfirmation.sessionId, {
                    path: '/',
                    maxAge: 3600
                });
                externalGameId = joinConfirmation.externalGameId;
                setCookie('externalGameId', externalGameId, {
                    path: '/',
                    maxAge: 3600
                });


            }

            navigate(`/game/${externalGameId}`);
        };

        return (
            <Modal
                show={props.show}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                onHide={props.onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Select Your Character
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body
                    className="grid-example"
                    data-bs-theme="dark"
                    style={{backgroundColor: "#444444"}}
                >
                    <Container>
                        <Row xs={4} md={2} lg={3} className="g-4">
                            {characters.map((character) => (
                                <Col>
                                    <Card
                                        border="dark"
                                        style={{
                                            width: "18rem",
                                            cursor: "pointer",
                                            // Change the outline style based on whether this character is the selected one
                                            outline: character.id === selectedCharacter ? '10px solid blue' : 'none'
                                        }}
                                        key={character.id}
                                        value={character.id}
                                        id={character.name}
                                        onClick={handleClick}
                                    >
                                        <Card.Body>
                                            <Card.Title>{character.name}</Card.Title>
                                        </Card.Body>
                                        <Card.Img variant="bottom" src={character.imageResource}/>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        onClick={selectCharacter}
                        id={"selectCharacterButton"}
                    >Select</Button>
                </Modal.Footer>
            </Modal>
        );
    }
;

export default CharacterSelectModal;