import React, {useEffect} from "react";
import {Container, Row, Col, Button, Offcanvas, Card} from "react-bootstrap";
import {Modal} from "react-bootstrap";

//IMPORT COMPONENTS
import GuessSection from "./guessing/GuessSection";

//IMPORT TEST DATA
import weapons from "../../../../data/weapons";
import characters from "../../../../data/characters";
import rooms from "../../../../data/rooms";
import {useWebSocket} from "../../../../services/WebSocketProvider";
import {useCookies} from "react-cookie";
import {useParams} from "react-router-dom";
import backdrop from "bootstrap/js/src/util/backdrop";
import {useInfo} from "../../context/InfoProvider";

const SuggestionButton = (props) => {
    const [show, setShow] = React.useState(false);
    const [weapon, setWeapon] = React.useState("");
    const [character, setCharacter] = React.useState("");
    const [room, setRoom] = React.useState("");
    const [submitEnabled, setSubmitEnabled] = React.useState(false);
    const [showOffCanvas, setShowOffCanvas] = React.useState(false);
    const [cookies, removeCookie] =
        useCookies(['sessionId']);
    const [imagePath, setImagePath] = React.useState("");
    const [proofName, setProofName] = React.useState("");
    const [proofHeader, setProofHeader] = React.useState("");
    const [proofBody, setProofBody] = React.useState("");

    const {stompClient} = useWebSocket();
    const {externalGameId} = useParams();
    const {myTurn, currentPlayer} = useInfo();

    useEffect(() => {
        if (weapon !== "" && character !== "" && room !== "") {
            setSubmitEnabled(true);
        } else {
            setSubmitEnabled(false);
        }

    }, [stompClient, weapon, character, room]);

    useEffect(() => {
        runSubscriptions()
    }, [stompClient]);

//TODO: When any state changes, an entirely new subscription is made.
// This is not ideal, because then there are multiple responses received.
    const runSubscriptions = async () => {
        if (stompClient && stompClient.connected) {
            stompClient.subscribe('/player/' + cookies.sessionId + '/suggestionProof', displayProof)
        }
    }

    const displayProof = async (payload) => {

        const proof = JSON.parse(payload.body);
        if (proof.proof) {

            setImagePath(proof.imageResource);
            setProofName(proof.name);
            await setProofHeader("Not quite!");
            await setProofBody("Cross this off in your notebook!");

            setShowOffCanvas(true);
        } else if (!proof.proof) {
            await setProofHeader("I think you got it!");
            await setProofBody("Make an accusation as soon as possible to win the game!");
            setShowOffCanvas(true);

        }
        setTimeout(handleClose, 7000)
    }

    const handleClose = () => {
        setShowOffCanvas(false);
    }


    const addWeapon = (v) => {
        // //console.log(v);
        setWeapon(v);
    };

    const addSuspect = (v) => {
        // //console.log(v);
        setCharacter(v);
    };

    const addRoom = (v) => {
        //console.log(v);
        setRoom(v);
    };

    const makeGuess = () => {
        setShow(false);
        const guessString = `I think it was ${character} in the ${room} with the ${weapon}!`;
        // alert(guessString);

        const guessDTO = {
            weaponName: weapon,
            suspectName: character,
            roomName: room
        }

        stompClient.send('/app/game/' + cookies.externalGameId
            + '/suggestion/' + cookies.sessionId, {}, JSON.stringify(guessDTO));

    };

    return (
        <>
            <Button
                style={{
                    marginTop: "15px",
                    fontSize: "2em",
                    backgroundColor: "#D9D9D9",
                    border: "none",
                    margin: ".5em 5%",
                    color: "#CE0000",
                    width: "90%",
                    fontFamily: "Jockey One",
                    boxShadow: "10px 10px 30px #111111",
                }}
                onClick={() => setShow(true)}
                disabled={!(myTurn && currentPlayer.room != null)}

            >
                Make a Suggestion
            </Button>

            <Modal
                show={show}
                size="xl"
                onHide={() => setShow(false)}
                aria-labelledby="contained-modal-title-vcenter"
                animation={true}>
                <Modal.Header closeButton

                              style={{
                                  backgroundColor: "#444444",
                                  fontFamily: "Jockey One",
                              border: "none"}}
                >
                    <Modal.Title
                    style = {{color: "white"}}
                    >
                        <h2>Make a Suggestion</h2>
                        <p>Choose a weapon, suspect, and room.</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    className="grid-example"
                    style={{backgroundColor: "#444444",

                    }}
                >
                    <Container>
                        <Row>
                            <Col>
                                <GuessSection
                                    title="Weapon"
                                    items={weapons}
                                    stateFunction={addWeapon}
                                />
                            </Col>
                            <Col>
                                <GuessSection
                                    title="Suspect"
                                    items={characters}
                                    stateFunction={addSuspect}
                                />
                            </Col>
                            <Col>
                                <GuessSection
                                    title="Room"
                                    items={[currentPlayer.room]}
                                    stateFunction={addRoom}
                                />
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer
                    style={{
                        backgroundColor: "#444444"

                    }}
                >
                    <Button
                        style={{
                            marginTop: "15px",
                            fontSize: "2em",
                            backgroundColor: "#D9D9D9",
                            border: "none",
                            margin: ".5em auto",
                            color: "#CE0000",
                            width: "70%",
                            fontFamily: "Jockey One",
                            boxShadow: "10px 10px 30px #111111",

                        }}
                        disabled={!submitEnabled}
                        onClick={makeGuess}
                    >
                        Make Suggestion
                    </Button>
                </Modal.Footer

                >
            </Modal>

            <Offcanvas
                backdrop={false}
                show={showOffCanvas}
                onHide={handleClose}
                placement="end"
                style={{
                    color: "white",
                    fontFamily: "Jockey One",
                    backgroundColor: "#444444",
                }}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        {proofHeader}                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    <Card style={{width: '18rem'}}>
                        <Card.Img variant="top" src={imagePath}/>
                        <Card.Body>
                            <Card.Title>{proofName}</Card.Title>
                            <Card.Text>
                                {proofBody}
                            </Card.Text>
                        </Card.Body>
                    </Card>

                </Offcanvas.Body>

            </Offcanvas>

        </>
    );
};

export default SuggestionButton;
