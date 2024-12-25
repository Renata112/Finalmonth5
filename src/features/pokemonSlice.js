import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPokemons = createAsyncThunk('pokemon/fetchPokemons', async () => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50');
    return response.data.results;
});

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        pokemons: [],
        status: 'idle',
        error: null,
        filter: '',
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload; // обновление фильтра
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemons.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.pokemons = action.payload;
            })
            .addCase(fetchPokemons.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setFilter } = pokemonSlice.actions;

export default pokemonSlice.reducer;
