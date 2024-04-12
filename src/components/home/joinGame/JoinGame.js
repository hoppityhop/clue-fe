/**
 * Form to input join code and submit. Submission calls a function that
 * sends the code and user information to the backend. The backend will
 * validate the code and create the user, then send a response confirming.
 * Once confirmed, the user will be redirected to the game.
 */

import React, {useState} from "react";
import {Button, Form, Modal, Container, Row, Col} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import updateService from "../../../services/updateService";
import CharacterSelectModal from "../characterSelect/CharacterSelectModal";
import characterService from "../../../services/characterService";

const JoinForm = () => {
    //FORM DATA
    const [joinCode, setJoinCode] = useState("");
    const [playerName, setPlayerName] = useState("");

    //ERROR MESSAGES
    const [playerNameError, setPlayerNameError] = useState("");
    const [joinCodeError, setJoinCodeError] = useState("");

    //Available charcters to pass into the selection modal
    const [availableCharacters, setAvailableCharacters] = useState([]);

    //Modal Control
    const [modalShow, setModalShow] = useState(false);

    /**
     * Needs to send playerName, joinCode, and characterId to
     * the backend via a service call.
     * @param e
     */
    const gameJoin = async (e) => {
        e.preventDefault();
        //console.log(e.target[0].value);
        //console.log(e.target[1].value);
        setPlayerNameError("");
        setJoinCodeError("");
        const enteredJoinCode = e.target[0].value;
        const enteredPlayerName = e.target[1].value;

        if (!enteredJoinCode || !enteredPlayerName) {
            if (!enteredJoinCode) {
                setJoinCodeError("Join code must be provided.");
            }
            if (!enteredPlayerName) {
                setPlayerNameError("Player name must be provided.");
            }
            return;
        }

        //console.log("Submitted");
        //console.log(e.target[0].value);
        //console.log(e.target[1].value);

        await setPlayerName(enteredPlayerName);
        await setJoinCode(enteredJoinCode);

        const availableCharactersToSet = await
            characterService.getAvailableCharacters(enteredJoinCode);
        //console.log(availableCharacters);
        setAvailableCharacters(availableCharactersToSet);

        setModalShow(true);


        //POST REQUEST BY CALLING A SERVICE FUNCTION
        //MODAL COMES UP TO SELECT A CHARACTER
        //ONCE SELECTED, THE USER'S CHOICE IS SAVED
        //USER IS REDIRECTED TO THE GAME URL USING REACT ROUTER
    };

    return (
        <>
            <div
                className="p-4"
                style={{
                    borderRadius: "1em",
                    backgroundColor: "#222222",
                    height: "100%",
                    width: "90%",
                    margin: "auto",
                    textAlign: "center",
                    boxShadow: "10px 10px 30px #111111"

                }}
            >
                <Form onSubmit={gameJoin}>
                    <Form.Group controlId="formBasicCode">
                        <Form.Label style={{color: "white", fontSize: "4em"}}>
                            <h2>Already have an invite code?</h2>
                            <h1>Insert Below: </h1>
                        </Form.Label>
                        <Form.Control
                            type="id"
                            placeholder="Enter join code."
                            name="joinCodeField"
                            style={{
                                backgroundColor: "#D9D9D95E",
                                color: "#FFFFFF54",
                            }}
                            className="placeholder-color"
                        />
                        <br/>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name."
                            name="playerNameField"
                            style={{
                                backgroundColor: "#D9D9D95E",
                                color: "#FFFFFF54",
                            }}
                            className="placeholder-color"
                        />
                    </Form.Group>
                    <Button
                        style={{
                            marginTop: "15px",
                            backgroundColor: "#D9D9D9",
                            border: "none",
                            margin: ".5em 5%",
                            color: "#CE0000",
                            width: "90%",
                            fontSize: "2.5em",
                        }}
                        type="submit"
                        id="joinGameButton"
                    >
                        Join
                    </Button>
                </Form>
                <CharacterSelectModal
                    show={modalShow}
                    characters={availableCharacters}
                    onHide={() => setModalShow(false)}
                    newGame={false}
                    playerName={playerName}
                    joinCode={joinCode}
                />
            </div>
        </>
    );
};

export default JoinForm;
