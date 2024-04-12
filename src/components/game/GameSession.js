import React, {useEffect, useState} from "react";
import {Spinner} from "react-bootstrap";
import {useParams, useNavigate} from "react-router-dom";


import GameControl from "./GameControl";
import {useCookies} from "react-cookie";
import WebSocketProvider from "../../services/WebSocketProvider";
import InfoProvider from "./context/InfoProvider";
import playerService from "../../services/playerService";

const GameSession = () => {
        const [cookies, setCookie, removeCookie] = useCookies([]);
        const [loading, setLoading] = useState(true);
        const [userData, setUserData] = useState(
            {
                username: '',
                connected: false,
                message: ''
            }
        );
        const navigate = useNavigate();
        const {gameId} = useParams();

        //TODO - check if game actually exists. If not, redirect to home page.

        useEffect(() => {
            if (!cookies.sessionId || cookies.sessionId === "undefined") {
                navigate("/");
            } else {
                checkForGameAndPlayer()
            }
        }, []);

        const checkForGameAndPlayer = async () => {
            //console.log(gameId);
            //check if player is in game
            const player = await playerService.getPlayerBySessionId(cookies.sessionId);
            //console.log(player);
            if (!player || player.gameSession.externalGameId !== gameId) {
                navigate("/");
            }

        }

        return (
            <>
                <WebSocketProvider>
                    <InfoProvider>
                        <GameControl gameId={gameId}/>
                    </InfoProvider>
                </WebSocketProvider>
            </>
        );
    }
;

export default GameSession;
