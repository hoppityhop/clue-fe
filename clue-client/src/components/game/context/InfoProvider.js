import React, {createContext, useState, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import {useNavigate, useParams} from "react-router-dom";
import {useWebSocket} from "../../../services/WebSocketProvider";
import {useCookies} from "react-cookie";

const InfoContext = createContext(null);

export const useInfo = () => {
    return useContext(InfoContext);
}

export const InfoProvider = ({children}) => {
    const [cookies, removeCookie] =
        useCookies(['externalGameId', 'sessionId']);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameName, setGameName] = useState(null);
    const [joinCode, setJoinCode] = useState(null);
    const [players, setPlayers] = useState([]);
    const [sessionId, setSessionId] = useState(null);
    const [playerHand, setPlayerHand] = useState([]);
    const [playerTurn, setPlayerTurn] = useState(false);
    const [playerLocations, setPlayerLocations] = useState([]);
    const [totalGameInfo, setTotalGameInfo] = useState(null);
    const [myTurn, setMyTurn] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState({});
    const [nextPlayer, setNextPlayer] = useState({});
    const [myInfo, setMyInfo] = useState({});

    const navigate = useNavigate();
    const {gameId} = useParams();
    const {stompClient} = useWebSocket();
    // console.log(stompClient != null);

    //MANAGES GAME START
    const gameIsStarted = () => {
        setGameStarted(true);
        //TODO Should get game info again because it will include locations and hand
        retrieveGameInfo();
    };

    //HAND MANAGEMENT

    const handleHand = (hand) => {
        setPlayerHand(hand);
    }

    const onMyHand = (payload) => {
        const hand = JSON.parse(payload.body);
        // console.log(hand)
        handleHand(hand);
    }
    const getMyHand = () => {
        stompClient.subscribe('/player/' + cookies.sessionId + '/myHand', onMyHand);
        stompClient.send("/app/player/" + cookies.sessionId + "/myHand", {}, "");
    }

    //TURN INFO MANAGEMENT
    const getTurnInfo = () => {
    }

    const onNewTurn = (payload) => {
        const turnInfo = JSON.parse(payload.body);
        console.log(turnInfo);

        setCurrentPlayer(turnInfo.currentPlayer);
        setNextPlayer(turnInfo.nextPlayer);

    }

    const onMyTurn = (payload) => {
        const turnInfo = JSON.parse(payload.body);
        console.log(turnInfo);
        setMyTurn(turnInfo);
    }
    const changeTurn = (bool) => {
        setMyTurn(bool);
    }

    //LOCATION MANAGEMENT (largely for testing purposes--this should be integrated
    // with initial game info and movement)

    const onLocationsReceived = (payload) => {
        const locations = JSON.parse(payload.body);
        // console.log(locations.playerLocations);
        setPlayerLocations(locations.playerLocations);
    }

    const totalGameInfoSet = (payloadData) => {
        setTotalGameInfo(payloadData);
    }

    /**
     * Movement management
     */
    const makeMove = (key, isRoom) => {
        let roomId = null;
        let hallwayId = null;
        if (isRoom) {
            roomId = key;
        } else {
            hallwayId = key;
        }
        let moveDTO = {
            roomId,
            hallwayId
        }
        stompClient.send('/app/game/' + cookies.externalGameId + '/move/' + cookies.sessionId, {}, JSON.stringify(moveDTO));


    }

    //ERROR HANDLING
    const onError = (payload) => {
        const error = JSON.parse(payload.body);
        alert(error.body);
    }

    /**
     * TODO: when the provider renders, the gameStarted state,
     * players, playerHand, playerTurn, and playerLocations should be set.
     * This will need to occur via a websocket message.
     */
    useEffect(() => {
        console.log("InfoProvider useEffect runs.")
        runEffect();
    }, [stompClient]);


    const runEffect = async () => {
        if (stompClient && stompClient.connected) {
            console.log("InfoProvider's runEffect function runs" +
                "" +
                "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
            stompClient.subscribe('/player/' + cookies.sessionId + '/gameInfo', onGameInfo);
            stompClient.subscribe('/player/' + cookies.sessionId + "/myTurn", onMyTurn);
            stompClient.subscribe('/player/' + cookies.sessionId + '/error', onError);

            stompClient.subscribe('/game/' + cookies.externalGameId + "/public/newTurn", onNewTurn);
            stompClient.subscribe('/game/' + cookies.externalGameId + '/public/locations', onLocationsReceived);
            // let sessionIdMessage = cookies.sessionId;
            // stompClient.send('/app/game/' + gameId + '/getGameInfo', {}, sessionIdMessage);
            //TODO: manage the hand in here to make it easier than in ActionSidebar
            await retrieveGameInfo();
        }
    }

    //GAME INFO MANAGEMENT

    const retrieveGameInfo = () => {
        console.log("Retrieving game info.")
        stompClient.send('/app/game/' + gameId + '/getGameInfo', {}, cookies.sessionId);
    }

    const onGameInfo = async (payload) => {
        let payloadData = JSON.parse(payload.body);
        // console.log(payloadData);
        // console.log(payloadData.players);
        totalGameInfoSet(payloadData);
        await setGameStarted(payloadData.started)
        if (payloadData.started) {
            getTurnInfo();
            setPlayerHand(payloadData.myHand);
            setPlayerTurn(payloadData.playerTurn);
            setPlayerLocations(payloadData.locationInfo.playerLocations);

            //TODO Subscribe to turn change
        }
        setGameName(payloadData.gameName);
        setJoinCode(payloadData.joinCode);
        setPlayers(payloadData.players);
    }

    return (
        <InfoContext.Provider value={{
            gameStarted,
            gameIsStarted,
            gameName,
            joinCode,
            gameId,
            players,
            sessionId,
            handleHand,
            changeTurn,
            playerHand,
            playerTurn,
            playerLocations,
            myTurn,
            currentPlayer,
            nextPlayer,
            makeMove
        }}>
            {children}
        </InfoContext.Provider>
    );

};

InfoProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default InfoProvider;