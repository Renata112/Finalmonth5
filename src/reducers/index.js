import { combineReducers } from '@reduxjs/toolkit';
import pokemonReducer from './pokemonReducer'; // или путь до вашего pokemonSlice

const rootReducer = combineReducers({
    pokemon: pokemonReducer,
});

export default rootReducer;
