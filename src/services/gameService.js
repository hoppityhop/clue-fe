import axios from 'axios'

const API_URL_BASE = process.env.REACT_APP_API_URL + '/api/game'

/**
 * Sends a new game session to the server and stores the response data in the browser's local storage.
 *
 * @param {Object} newGameSession - The new game session to be sent to the server.
 * @returns {Promise<Object>} - The response data from the server.
 */
const postNewGame = async newGameSession => {
    //console.log(newGameSession)
    //console.log(process.env.REACT_APP_API_URL);
    const responseObject = await axios.post(API_URL_BASE, newGameSession);
    const responseData = responseObject.data;
    //console.log(responseData)
    window.localStorage.setItem('sessionId', responseData.session_id)
    window.localStorage.setItem('externalGameId', responseData.id)


    return responseData
}

const startGame = async () => {
    var urlToCall = `${API_URL_BASE}/${window.localStorage.getItem(
        'externalGameId'
    )}/start_game`
    //console.log(urlToCall)
    await axios.post(urlToCall)
}

const deleteGame = async (externalGameId) => {
    //console.log(externalGameId);
    let urlToCall = `${API_URL_BASE}/${externalGameId}`;
    let deleteGameResponse = await axios.delete(urlToCall);
    //console.log(deleteGameResponse);
    return deleteGameResponse;
}

const getGameByJoinCode = async (joinCode) => {
    const urlToCall = `${API_URL_BASE}/${joinCode}`
    const responseObject = await axios.get(urlToCall);
    const responseData = responseObject.data;
    //console.log(responseData);
    return responseData;
}

const getGameByExternalGameId = async (externalGameId) => {
    const urlToCall = `${API_URL_BASE}/id/${externalGameId}`;
    const responseObject = await axios.get(urlToCall);
    const responseData = responseObject.data;
    //console.log(responseData);
    return responseData;
}

const gameService = {
    postNewGame,
    startGame,
    getGameByJoinCode,
    deleteGame,
    getGameByExternalGameId
}

export default gameService
