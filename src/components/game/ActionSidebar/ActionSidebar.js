//NODE MODULES
import React, {useEffect} from "react";
import {Container, Row, Col, Button} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";

//OTHER COMPONENTS
import GameInfo from "./GameInfo";
import TurnTab from "./turns/TurnTab";
import StartGame from "./actions/StartGame";
import DeleteGame from "./actions/DeleteGame";
import SuggestionButton from "./actions/SuggestionButton";
import AccusationButton from "./actions/AccusationButton";
import {useCookies} from "react-cookie";
import PlayersList from "./PlayersList";
import gameService from "../../../services/gameService";
import {useWebSocket} from "../../../services/WebSocketProvider";
import {useInfo} from "../context/InfoProvider";
import MyInfo from "./MyInfo";

const ActionSidebar = (props) => {
    const [cookies, removeCookie] =
        useCookies(['externalGameId', 'sessionId']);


    const navigate = useNavigate();
    const {gameId} = useParams();
    const {stompClient} = useWebSocket();

    /**
     * Trying something new--useInfo() to get the global game information instead of
     * making a call here.
     */
    const {
        gameName, changeTurn, joinCode,
        gameStarted, players, playerHand
    } = useInfo();

    useEffect(() => {
    }, [stompClient]);


    const gameIsDeleted = () => {

        //remove externalGameId cookie
        removeCookie('externalGameId');
        //remove sessionId cookie
        removeCookie('sessionId');

        //redirect to home
        navigate("/");

    }

    const endTurn = async (gameId) => {
        stompClient.send("/app/game/" + gameId + "/endTurn", {});
        changeTurn(false);
    }


    return (
        <>
            <div
                style={{
                    width: "23vw",
                    height: "97vh",
                    backgroundColor: "#222222",
                    borderRadius: ".8em",
                    padding: ".5em",
                    margin: ".5em",
                    float: "left",
                    boxShadow: "10px 10px 30px #111111",
                }}
            >
                <GameInfo
                    joinCode={joinCode}
                    gameName={gameName}
                />
                {!gameStarted ? (
                    <>
                        <StartGame
                            gameId={gameId}
                        />
                        <DeleteGame
                            delete={gameIsDeleted}
                        />
                        <PlayersList
                            currentPlayers={players}
                        />
                    </>
                ) : (
                    <>
                        <TurnTab/>
                        <SuggestionButton
                        />
                        <AccusationButton
                        />

                        {/*<div*/}
                        {/*    style={{*/}
                        {/*        width: "90%",*/}
                        {/*        backgroundColor: "#737373",*/}
                        {/*        borderRadius: ".5em",*/}
                        {/*        marginTop: ".5em",*/}
                        {/*        marginRight: "auto",*/}
                        {/*        marginLeft: "auto",*/}
                        {/*        marginBottom: "1em",*/}
                        {/*        padding: ".5em",*/}
                        {/*        fontFamily: "Jockey One",*/}
                        {/*        color: "white",*/}
                        {/*        overflow: "hidden", // prevent text from overflowing*/}
                        {/*        boxShadow: "2px 4px 6px 1px rgba(0, 0, 0, 0.7) "*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    {playerHand ? (playerHand.map((card, index) => (*/}
                        {/*            <>*/}
                        {/*                <img*/}
                        {/*                    key={index}*/}
                        {/*                    style={{*/}
                        {/*                        width: "20%",*/}
                        {/*                        maxWidth: "33%",*/}
                        {/*                        borderRadius: "2em",*/}
                        {/*                        margin: ".3em",*/}
                        {/*                        boxShadow: "2px 4px 4px 3px rgba(0, 0, 0, 0.7) "*/}

                        {/*                    }}*/}
                        {/*                    src={card.imageResource}*/}
                        {/*                    alt={card.name}/>*/}
                        {/*            </>)))*/}
                        {/*        : (<> </>)*/}

                        {/*    }*/}

                        {/*</div>*/}
                        <MyInfo
                        playerHand={playerHand}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default ActionSidebar;