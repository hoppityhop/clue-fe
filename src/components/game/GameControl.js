import React, {useContext, useEffect, useState} from "react";
import {Container, Row, Col, Button, Modal} from "react-bootstrap";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlassArrowsRotate} from "@fortawesome/pro-solid-svg-icons";

import NotepadSidebar from "./notepad/NotepadSidebar";
import BoardDisplay from "./board/BoardDisplay";
import ActionSidebar from "./ActionSidebar/ActionSidebar";
import {useParams} from "react-router-dom";
import {useWebSocket} from "../../services/WebSocketProvider";
import {useCookies} from "react-cookie";
import {useInfo} from "./context/InfoProvider";
import playerService from "../../services/playerService";

const GameControl = ({gameId}) => {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [userData, setUserData] = useState(
        {
            username: '',
            connected: false,
            message: ''
        }
    );
    const [gameState, setGameState] = useState(false);
    const [showSuggestionModal, setShowSuggestionModal] = useState(false);
    const [showAccusationModal, setShowAccusationModal] = useState(false);
    const [suggestion, setSuggestion] = useState({});
    const [accusation, setAccusation] = useState({});
    const [waiting, setWaiting] = useState(false);

    const {stompClient} = useWebSocket();

    //GET GAME STATUS FROM PROVIDER
    const {gameIsStarted, gameStarted, playerHand} = useInfo();

    useEffect(() => {
        runEffect();
        console.log("Game Control use effect runs.")
    }, [stompClient]);

    const runEffect = async () => {
        if (stompClient && stompClient.connected) {
            console.log("Game Control's runEffect function runs, " +
                "which means the stompClient is connected." +
                "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")

            await subscribeToTopicsAndSignalJoin();
            await userJoin();
        }
    }

    const sessionId = cookies.sessionId;

    /**
     * Checks if the game identified in the cookies is still active, matches the game id in the URL,
     * and if the user is still a player in the game.
     *
     * If the game is no longer active, the user is redirected to the home page,
     * and the cookies are erased.
     *
     * If the game id in the URL does not match the game id in the cookies,
     * the user is redirected to the game that they are in.
     *
     * @returns {Promise<void>}
     */
    const checkForGame = async () => {

        if (cookies.sessionId && cookies.sessionId !== "undefined") {

            const sessionId = cookies.sessionId;
            const player = await playerService.getPlayerBySessionId(sessionId);
            if (player) {

            }
        }
    }

    function onSuggestionResponse(payload) {
        console.log("Suggestion response received");

        const suggestionBroadcast = JSON.parse(payload.body);
        console.log(suggestionBroadcast.playerSessionId)
        console.log(cookies.sessionId)

        setSuggestion(
            {
                "weaponName": (suggestionBroadcast.weaponName).toLowerCase(),
                "weaponImage": suggestionBroadcast.weaponImageResource,
                "suspectName": suggestionBroadcast.suspectName,
                "suspectImage": suggestionBroadcast.suspectImageResource,
                "roomName": suggestionBroadcast.roomName,
                "roomImage": suggestionBroadcast.roomImageResource,
                "successful": suggestionBroadcast.successful,
                "playerName": suggestionBroadcast.playerName,
                characterImage: suggestionBroadcast.characterImageResource,
            }
        )

        if (cookies.sessionId !== suggestionBroadcast.playerSessionId) {
            handleOpenSuggestionResponse();
        }
    }

    function onAccusationResponse(payload) {

        const accusationBroadcast = JSON.parse(payload.body);

        setAccusation(
            {
                weaponName: (accusationBroadcast.weaponName).toLowerCase(),
                weaponImage: accusationBroadcast.weaponImageResource,
                suspectName: accusationBroadcast.suspectName,
                suspectImage: accusationBroadcast.suspectImageResource,
                roomName: accusationBroadcast.roomName,
                roomImage: accusationBroadcast.roomImageResource,
                successful: accusationBroadcast.successful,
                playerName: accusationBroadcast.playerName,
                characterImage: accusationBroadcast.characterImageResource,

            }
        )

        if (cookies.sessionId !== accusationBroadcast.playerSessionId) {
            handleOpenAccusationResponse();
        }
    }

    const handleOpenAccusationResponse = async () => {
        await setShowAccusationModal(true);
        await setWaiting(true);
        //wait 3 seconds and then turn off waiting
        setTimeout(() => {
            setWaiting(false);
        }, 3000);
        setTimeout(() => {
            setShowAccusationModal(false);
        }, 7000)
    }

    //MODAL CONTROLS

    const handleOpenSuggestionResponse = async () => {
        await setShowSuggestionModal(true);
        await setWaiting(true);
        //wait 3 seconds and then turn off waiting
        setTimeout(() => {
            setWaiting(false);
        }, 3000);
        setTimeout(() => {
            setShowSuggestionModal(false);
        }, 7000)
    }
    const handleCloseSuggestionResponse = () => {
        setShowSuggestionModal(false);
    }


    function onGameStart(payload) {
        console.log("Message received to start game");
        gameIsStarted();
        console.log(payload);
        setGameState(true);
    }

    const subscribeToTopicsAndSignalJoin = () => {
        setUserData({...userData, "connected": true});
        stompClient.subscribe('/game/' + gameId + '/public/accusationResponse', onAccusationResponse);
        stompClient.subscribe('/game/' + gameId + '/public/startGameNotification', onGameStart);
        stompClient.subscribe('/game/' + gameId + '/public/suggestionResponse', onSuggestionResponse);
    }


    const userJoin = () => {
        stompClient.send("/app/game/" + gameId + "/join", {}, cookies.sessionId);
    }


    return (
        <>
            <NotepadSidebar/>
            <BoardDisplay
                id={gameId}
                gameState={gameState}
            />
            <ActionSidebar
                id={gameId}/>

            {/*SUGGESTION BROADCAST MODAL*/}
            <Modal
                show={showSuggestionModal}
                onHide={() => handleCloseSuggestionResponse()}
                backdrop="static"
                centered={true}
            >
                <Modal.Header>
                    <Modal.Title>
                        <h2>{suggestion.playerName} Made a Suggestion</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Was it {suggestion.suspectName} in
                    the {suggestion.roomName} with the {suggestion.weaponName}?

                    <div
                        style={{
                            alignContent: "center",
                            margin: "10% 10% 10% 40%"
                        }}>
                        {waiting ?
                            <FontAwesomeIcon
                                icon={faMagnifyingGlassArrowsRotate} beatFade
                                size="4x"
                                style={{color: "#f20707"}}/> :
                            <>{suggestion.successful ? <h2>It was not!</h2> :
                                <h2>It was! Quick! Make an accusation as soon as
                                    you can!</h2>}</>
                        }

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => handleCloseSuggestionResponse()}
                    >
                        Okay
                    </Button>
                </Modal.Footer>

            </Modal>

            <Modal
                show={showAccusationModal}
                onHide={() => setShowAccusationModal(false)}
                backdrop="static"
                centered={true}
            >
                <Modal.Header>
                    <Modal.Title>
                        <h2>{accusation.playerName} made a suggestion.</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Was it {accusation.suspectName} in
                    the {accusation.roomName} with the {accusation.weaponName}?

                    <div
                        style={{
                            alignContent: "center",
                            margin: "10% 10% 10% 40%"
                        }}>
                        {waiting ?
                            <FontAwesomeIcon
                                icon={faMagnifyingGlassArrowsRotate} beatFade
                                size="4x"
                                style={{color: "#f20707"}}/> :
                            <>{accusation.successful ?
                                <h2>It was! {accusation.playerName} is the
                                    winner!</h2> :
                                <h2>It was not! You all enter the room to
                                    find {accusation.playerName} has been
                                    murdered!
                                    Hurry--figure out whodunnit before it's too
                                    late!</h2>}</>
                        }

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => setShowAccusationModal(false)}
                    >
                        Okay
                    </Button>
                </Modal.Footer>


            </Modal>
        </>
    );
};

export default GameControl;
