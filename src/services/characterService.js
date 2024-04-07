import axios from 'axios'

const API_URL_BASE = 'http://localhost:8000/api/characters'
const API_URL_USER_BASE = 'http://localhost:8000/api/users'

const getAllCharacters = async () => {
    var responseObject = await axios.get(API_URL_BASE)
    var responseData = responseObject.data
    console.log(typeof responseData)
    console.log(responseObject)
    return responseData
}

const getCharacter = async (characterId) => {
    var urlToCall = `${API_URL_BASE}/${characterId}`
    console.log(urlToCall);
    var responseObject = await axios.get(`${API_URL_BASE}${characterId}/`)

    console.log(responseObject.data);
}

/**
 * Gets all characters that are available to be chosen by a user and have not been chosen by any other user in
 * the same game session.
 * @returns {Promise<void>}
 */
const getAvailableCharacters = async (joinCode) => {
    const urlToCall = process.env.REACT_APP_API_URL + `/api/game/available/${joinCode}`
    const responseObject = await axios.get(urlToCall);
    const responseData = responseObject.data;
    console.log(responseData);
    return responseData;
}

const setCharacter = async (characterId) => {
    const sessionId = window.localStorage.getItem('sessionId');
    console.log(sessionId);

    const urlToCall = `${API_URL_USER_BASE}/${sessionId}/character/${characterId}`;
    console.log(urlToCall);
    const response = await axios.put(urlToCall);
    console.log(response);
}

const characterService = {
    getAllCharacters,
    getCharacter,
    setCharacter,
    getAvailableCharacters
}

export default characterService;
