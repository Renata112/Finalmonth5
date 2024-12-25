import React from 'react';
import PokemonList from './components/PokemonList';

const App = () => {
    return (
        <div style={{ padding: '16px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
                Pokеmon List
            </h1>
            <PokemonList />
        </div>
    );
};

export default App;
