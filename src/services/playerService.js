import axios from "axios";

const API_URL_BASE = process.env.REACT_APP_API_URL + "/api/players";

/**
 * Sends join code, player name, and character to
 * the server and stores the response data in the browser's local storage.
 * @param joinCode
 * @returns {Promise<void>}
 */
const joinGame = async (joinGameRequest) => {
    let urlToCall = `${API_URL_BASE}`;
    console.log(urlToCall);
    const response = await axios.post(urlToCall,
        joinGameRequest);
    console.log(response);
    return response.data;

    window.localStorage.setItem("sessionId", response.data.session_id);
    window.localStorage.setItem("externalGameId", response.data.game_id);

};

const moveCharacter = async (id, roomID, hallwayID, charID) => {

    var urlToCall = `${API_URL_BASE}${id}/character/${charID}/`;
    console.log(urlToCall);


    const data = roomID != null ? {"room_id": roomID} : {"hallway_id": hallwayID}

    await axios.put(urlToCall, data)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
            console.log(urlToCall);
            console.log(data);
        })

};

const getUser = async (sessionId) => {
    const response = await axios.get(`${API_URL_BASE}/${sessionId}`);
    console.log(response.data)
    return response.data;
}

const getPlayerBySessionId = async (sessionId) => {
    const response = await axios.get(`${API_URL_BASE}/sessionId/${sessionId}`);
    // console.log(response.data)
    return response.data;
}

const getPlayersInGameSession = async (externalGameId) => {
    const response = await axios.get(`https://clue-fe-68f5bf77cc33.herokuapp.com/api/game/id/${externalGameId}/players`);
    // console.log(response.data)
    return response.data;
}

const playerService = {
    joinGame,
    moveCharacter,
    getUser,
    getPlayerBySessionId,
    getPlayersInGameSession
};

export default playerService;
