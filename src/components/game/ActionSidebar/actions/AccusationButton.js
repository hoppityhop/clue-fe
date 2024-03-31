import React, {useEffect} from "react";
import {Container, Row, Col, Button} from "react-bootstrap";
import {Modal} from "react-bootstrap";

//IMPORT COMPONENTS
import GuessSection from "./guessing/GuessSection";

//IMPORT TEST DATA
import weapons from "../../../../data/weapons";
import characters from "../../../../data/characters";
import rooms from "../../../../data/rooms";
import {useInfo} from "../../context/InfoProvider";
import {useWebSocket} from "../../../../services/WebSocketProvider";
import {useNavigate, useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import ProofCard from "./guessing/ProofCard";

const AccusationButton = (props) => {
    const [show, setShow] = React.useState(false);
    const [showResult, setShowResult] = React.useState(false);
    const [weapon, setWeapon] = React.useState("");
    const [character, setCharacter] = React.useState("");
    const [room, setRoom] = React.useState("");
    const [submitEnabled, setSubmitEnabled] = React.useState(false);
    const [accusationResult, setAccusationResult] = React.useState({});

    const [cookies, removeCookie] = useCookies(['sessionId']);

    const {stompClient} = useWebSocket();
    const {myTurn, currentPlayer} = useInfo();
    const {externalGameId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (weapon !== "" && character !== "" && room !== "") {
            setSubmitEnabled(true);
        } else {
            setSubmitEnabled(false);
        }
    }, [stompClient, weapon, character, room]);

    useEffect(() => {
        runSubscriptions();
    }, [stompClient]);

    const runSubscriptions = async () => {
        if (stompClient && stompClient.connected) {
            stompClient.subscribe('/player/' + cookies.sessionId + '/accusationProof', displayResult);
        }
    }

    const displayResult = async (payload) => {
        const result = JSON.parse(payload.body);
        const correct = result.correct

        if (correct) {
            // alert("You win!");
            //TODO construct accusationResult object

        }
        if (!correct) {
            // alert("You have been murdered!");
            const accusationResult = {
                suspectName: result.suspectName,
                suspectImageResource: result.suspectImageResource,
                weaponName: result.weaponName,
                weaponImageResource: result.weaponImageResource,
                roomName: result.roomName,
                roomImageResource: result.roomImageResource,
                guessedWeaponName: result.guessedWeaponName,
                guessedWeaponImageResource: result.guessedWeaponImageResource,
                guessedSuspectName: result.guessedSuspectName,
                guessedSuspectImageResource: result.guessedSuspectImageResource,
                guessedRoomName: result.guessedRoomName,
                guessedRoomImageResource: result.guessedRoomImageResource
            }
            await setAccusationResult(accusationResult);
            setShowResult(true);
        }

        // setTimeout(handleClose, 7000)
    }

    const handleClose = () => {
        setShowResult(false);
    }

    const addWeapon = (v) => {
        console.log(v);
        setWeapon(v);
    };

    const addSuspect = (v) => {
        // console.log(v);
        setCharacter(v);
    };

    const addRoom = (v) => {
        // console.log(v);
        setRoom(v);
    };

    const leaveGame = () => {
        stompClient.send('/app/game/' + cookies.externalGameId + '/makeMeViewOnly/' +
            cookies.sessionId, {});

        Object.keys(cookies).forEach(function (cookieName) {
            removeCookie(cookieName);
        });
        navigate("/")
    }

    const viewOnly = () => {
        stompClient.send('/app/game/' + cookies.externalGameId + '/makeMeViewOnly/' +
            cookies.sessionId, {});
        setShowResult(false);
    }

    const makeGuess = () => {
        setShow(false);
        const guessString = `I think it was ${character} in the ${room} with the ${weapon}!`;
        // alert(guessString);

        const guessDTO = {
            weaponName: weapon, suspectName: character, roomName: room
        }

        stompClient.send('/app/game/' + cookies.externalGameId +
            '/accusation/' + cookies.sessionId, {}, JSON.stringify(guessDTO));
    };

    return (<>
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
            Make an Accusation
        </Button>

        <Modal
            show={show}
            size="xl"
            onHide={() => setShow(false)}
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton

                          style={{
                              backgroundColor: "#444444",
                              color: "white",
                              border: "none"
                          }}

            >
                <Modal.Title>
                    <h2>Make an Accusation</h2>
                    <p>Choose a weapon, suspect, and room.</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body
                className="grid-example"
                style={{backgroundColor: "#444444"}}
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
                    backgroundColor: "#444444",
                    border: "none"

                }}>
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
                    Make an Accusation
                </Button>
            </Modal.Footer>
        </Modal>


        <Modal
            show={showResult}
            size="xl"
            onHide={() => setShowResult(false)}
            aria-labelledby="contained-modal-title-vcenter"
            backdrop={"static"}
            keyboard={false}
            closeButton={false}
        >
            <Modal.Header

                style={{
                    backgroundColor: "#444444",
                    border: "none",
                    color: "white"
                }}>

                <Modal.Title>
                    <h2>Oh no! You've been murdered!</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body

                style={{
                    backgroundColor: "#444444",
                    border: "none"
                }}>
                <Container>
                    <Row>
                        <Col>
                            <ProofCard
                                imagePath={accusationResult.guessedSuspectImageResource}
                                proofName={accusationResult.guessedSuspectName}
                                matches={accusationResult.guessedSuspectName === accusationResult.suspectName}
                            />
                        </Col>
                        <Col>
                            <ProofCard
                                imagePath={accusationResult.guessedWeaponImageResource}
                                proofName={accusationResult.guessedWeaponName}
                                matches={accusationResult.guessedWeaponName === accusationResult.weaponName}
                            />
                        </Col>
                        <Col>

                            <ProofCard
                                imagePath={accusationResult.guessedRoomImageResource}
                                proofName={accusationResult.guessedRoomName}
                                matches={accusationResult.guessedRoomName === accusationResult.roomName}
                            />
                        </Col>
                    </Row>
                    <br/><br/><br/>
                    <Row>
                        <Col>
                            <ProofCard
                                imagePath={accusationResult.suspectImageResource}
                                proofName={accusationResult.suspectName}
                                proofBody={null}
                            />
                        </Col>
                        <Col>

                            <ProofCard
                                imagePath={accusationResult.weaponImageResource}
                                proofName={accusationResult.weaponName}
                                proofBody={null}/>
                        </Col>
                        <Col>
                            <ProofCard
                                imagePath={accusationResult.roomImageResource}
                                proofName={accusationResult.roomName}
                                proofBody={null}/>
                        </Col>
                    </Row>

                </Container>
            </Modal.Body>
            <Modal.Footer

                style={{
                    backgroundColor: "#444444",
                    border: "none"

                }}>
                <Button
                    style={{
                        marginTop: "15px",
                        fontSize: "2em",
                        backgroundColor: "#D9D9D9",
                        border: "none",
                        margin: ".5em auto",
                        color: "#CE0000",
                        width: "35%",
                        fontFamily: "Jockey One",
                        boxShadow: "10px 10px 30px #111111",

                    }} onClick={viewOnly}
                >
                    Watch the rest of the game.
                </Button>
                <Button
                    style={{
                        marginTop: "15px",
                        fontSize: "2em",
                        backgroundColor: "#D9D9D9",
                        border: "none",
                        margin: ".5em auto",
                        color: "#CE0000",
                        width: "35%",
                        fontFamily: "Jockey One",
                        boxShadow: "10px 10px 30px #111111",

                    }} onClick={leaveGame}>
                    Leave Game
                </Button>
            </Modal.Footer>


        </Modal>
    </>);
};

export default AccusationButton;
