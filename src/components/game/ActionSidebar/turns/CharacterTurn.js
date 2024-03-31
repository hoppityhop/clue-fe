import React, {useEffect} from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import "./turns.css";
import {useInfo} from "../../context/InfoProvider";

/**
 * TODO: Should render the character image, character name,
 * player name, and a boolean for whether it's a player's turn.
 * @param props
 * @returns {Element}
 * @constructor
 */
const CharacterTurn = (props) => {

    //Get turn information from InfoProvider
    const {myTurn, currentPlayer, nextPlayer} = useInfo();

    useEffect(() => {
        // console.log("My turn? " + myTurn);
    }, []);


   return (
      <div
         style={{
            backgroundColor: "#737373",
            bottom: "0",
            width: "97%",
            borderRadius: ".5em",
            marginRight: "auto",
            marginLeft: "auto",
            fontFamily: "Jockey One",
            fontSize: "1em",
            textAlign: "center",
            color: "white",
            boxShadow: "2px 4px 6px 1px rgba(0, 0, 0, 0.7) ",
            marginBottom: "1em",
         }}
      >
         <Row>
            <Col md={6}>
               <div
                  style={{
                     marginTop: ".5em",
                     marginBottom: ".5em",
                     
                  }}
               >
                  <div>{currentPlayer.playerName}'s Turn</div>
                   {currentPlayer.characterName}
                  <div
                     style={{
                        marginTop: ".5em",
                        marginBottom: ".5em",
                        fontSize: "1.2em",
                     }}
                  >
                      {myTurn ? "It is your turn" : "It is not your turn"}
                  </div>
               </div>
            </Col>
            <Col>
               <img
                  src={currentPlayer.characterImageResource}
                  style={{
                     borderRadius: ".5em",
                     objectFit: "contain",
                     marginTop: ".5em",
                     marginBottom: ".5em",
                     maxWidth: "80%",
                     boxShadow: "2px 4px 6px 1px rgba(0, 0, 0, 0.7) ",
                  }}
               ></img>
            </Col>
         </Row>
      </div>
   );
};

export default CharacterTurn;
