import React from 'react';
import {Button} from "react-bootstrap";
import {Modal} from "react-bootstrap";

import gameService from "../../../../services/gameService";

const DeleteGame = (props) => {
    const [show, setShow] = React.useState(false);

    const gameId = window.localStorage.getItem("externalGameId");

    const deleteGame = async () => {
        // for this page get end of url
        const gameId = window.location.href.split("/").pop();

        await gameService.deleteGame(gameId);
        props.delete();
    };

    return (
        <>
            <Button
                style={{
                    marginTop: "15px",
                    fontSize: "2.5em",
                    backgroundColor: "#D9D9D9",
                    border: "none",
                    margin: ".5em 5%",
                    color: "#CE0000",
                    width: "90%",
                    fontFamily: "Jockey One",
                    boxShadow: "10px 10px 30px #111111",
                }}
                onClick={() => setShow(true)}
            >
                Delete Game
            </Button>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>Delete Game</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Are you sure you want to delete the game? Only the owner is allowed to. If you are not the owner, nothing will happen</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => deleteGame()}>
                        Delete Game
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteGame;