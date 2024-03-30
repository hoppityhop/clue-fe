import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    Button,
    Card,
    Form,
    Modal,
    Container,
    Row,
    Col,
} from "react-bootstrap";

import JoinForm from "./joinGame/JoinGame";
import CreateForm from "./createGame/CreateForm";
import PublicGames from "./publicGames/PublicGames";
import {useCookies} from "react-cookie";
import playerService from "../../services/playerService";

const Home = () => {
    const [activeGame, setActiveGame] = useState();
    const [cookies, setCookie, removeCookie] = useCookies([]);

    const navigate = useNavigate();


    useEffect(() => {

        checkForGame();

    }, []);

    const checkForGame = async () => {

        //If there is a sessionId cookie, check if there is a current user for that session
        if (cookies.sessionId && cookies.sessionId !== "undefined") {

            const sessionId = cookies.sessionId;
            const player = await playerService.getPlayerBySessionId(sessionId);
            if (player) {
                console.log("Player found");
                console.log(player);
                const gameId = player.gameSession.externalGameId;
                navigate(`/game/${gameId}`);
            } else {
                console.log("No player found");
                //TODO: delete the game and session cookies
                removeCookie("sessionId");
                removeCookie("gameId");
            }


        } else {
            console.log("No session id cookie found");
        }


    }
    return (
        <>
            <div
                style={{
                    backgroundColor: "#222222",
                    width: "auto",
                    height: "38vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    verticalAlign: "top",
                    borderRadius: "5vw",
                    marginLeft: "5%",
                    marginRight: "5%",
                    boxShadow: "10px 10px 30px #11111"

                }}
            >
                <img src="/title-logo.png" style={{width: "70%"}}></img>
            </div>
            <br/>
            <br/>
            <Row
                style={{
                    fontFamily: "Jockey One",
                    textAlign: "center",
                }}
            >
                <Col >
                    <PublicGames/>
                </Col>
                <Col >
                    <JoinForm/>
                </Col>
                <Col >
                    <CreateForm/>
                </Col>
            </Row>
        </>
    );
};

export default Home;
