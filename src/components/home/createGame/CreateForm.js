/**
 * Form to create a game. Will appear in a modal.
 * Input fields include:
 * - Title
 * - Code: generated or custom
 * - Maximum number of players
 * - Closed/Public
 * - Your Character
 *
 * On submission, should use a service function to send a POST request
 * to the API.
 *
 * On successful submission, should redirect to the game session page. If not
 * successful, should display an error message from the API.
 */

import React, {useState} from 'react'
import {Button, Form, Modal, Container, Row, Col} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

import updateService from '../../../services/updateService'
import gameService from '../../../services/gameService'
import characterService from '../../../services/characterService'
import characters from "../../../data/characters";

import CharacterSelectModal from '../characterSelect/CharacterSelectModal'

const CreateForm = ({show, handleClose}) => {
    const [modalShow, setModalShow] = useState(false)
    const [selectedCharacter, setSelectedCharacter] = useState('Janitor Mustard')
    const [isPublic, setIsPublic] = useState(false)
    const [ownerName, setOwnerName] = useState()
    const [gameName, setGameName] = useState()
    const [nameErrorMessage, setNameErrorMessage] = useState('')
    const [ownerNameErrorMessage, setOwnerNameErrorMessage] = useState('')

    const handleCreateForm = async e => {
        e.preventDefault()
        setNameErrorMessage('')
        setOwnerNameErrorMessage('')
        const enteredName = e.target[0].value
        const enteredOwnerName = e.target[1].value

        if (!enteredName || !enteredOwnerName) {
            if (!enteredOwnerName) {
                setOwnerNameErrorMessage('Your name must be provided.')
            }
            if (!enteredName) {
                setNameErrorMessage('Game name must be provided.')
            }
            return
        }

        console.log('Submitted')
        console.log(e.target[0].value)
        console.log(e.target[1].value)
        console.log(isPublic)

        setGameName(enteredName)
        setIsPublic(isPublic)
        setOwnerName(enteredOwnerName)
        //  var submissionConfirmation = await gameService.postNewGame(newGameSession)

        setModalShow(true)
    }

    return (
        <>
            <style type='text/css'>
                {`
        .placeholder-color::placeholder {
        color: #FFFFFF54;
opacity: .8;       }
        `}
            </style>
            <div
                className='p-4'
                style={{
                    borderRadius: '1em',
                    backgroundColor: '#222222',
                    height: '100%',
                    width: '90%',
                    margin: 'auto',
                    boxShadow: '10px 10px 30px #111111'
                }}
            >
                <Form onSubmit={handleCreateForm}>
                    <Form.Group controlId='formBasicName'>
                        <Form.Label
                            style={{
                                color: 'white',
                                fontSize: '4em',
                                textAlign: 'center'
                            }}
                        >
                            Create a game!
                        </Form.Label>
                        <Form.Control
                            type='text'
                            label='Game Name'
                            placeholder='Game Name'
                            name='gameName'
                            style={{
                                backgroundColor: '#D9D9D95E',
                                color: '#FFFFFF54'
                            }}
                            className='placeholder-color'
                        />
                        {nameErrorMessage && <p style={{color: 'red'}}>{nameErrorMessage}</p>}
                        <br/>

                        <Form.Control
                            type='text'
                            label='Your Name'
                            name='ownerName'
                            placeholder='Your Name'
                            style={{
                                backgroundColor: '#D9D9D95E',
                                color: '#FFFFFF54'
                            }}
                            className='placeholder-color'
                        />
                        {ownerNameErrorMessage && <p style={{color: 'red'}}>{ownerNameErrorMessage}</p>}
                        <Form.Switch
                            style={{color: 'white', fontSize: '2em'}}
                            label='Is this a public game?'
                            defaultChecked={isPublic}
                            onChange={() => setIsPublic(!isPublic)}
                        />
                    </Form.Group>
                    <Button
                        style={{
                            marginTop: '15px',
                            backgroundColor: '#D9D9D9',
                            border: 'none',
                            margin: '.5em 5%',
                            color: '#CE0000',
                            width: '90%',
                            fontSize: '2.5em'
                        }}
                        type='submit'
                        id={'createGameButton'}
                    >
                        Create
                    </Button>
                </Form>

                <CharacterSelectModal
                    show={modalShow}
                    characters={characters}
                    onHide={() => setModalShow(false)}
                    gameName={gameName}
                    ownerName={ownerName}
                    isPublic={isPublic}
                    newGame={true}
                />
            </div>
        </>
    )
}

export default CreateForm
