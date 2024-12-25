import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons } from '../features/pokemonSlice';

const PokemonList = () => {
    const dispatch = useDispatch();
    const { pokemons = [], status, error } = useSelector((state) => state.pokemon);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPokemons());
        }
    }, [dispatch, status]);

    const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (status === 'loading') {
        return <p>Loading...</p>;
    }
    if (status === 'failed') {
        return <p>Error: {error}</p>;
    }
    if (filteredPokemons.length === 0 && status === 'succeeded') {
        return <p>No Pokémon found.</p>;
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Filter by name"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{
                    marginBottom: '20px',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    width: '100%',
                    maxWidth: '300px',
                }}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {filteredPokemons.map((pokemon, index) => (
                    <div
                        key={index}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '10px',
                            textAlign: 'center',
                            width: '150px',
                        }}
                    >
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                            alt={pokemon.name}
                            style={{
                                width: '100px',
                                height: '100px',
                                objectFit: 'contain',
                                marginBottom: '10px',
                            }}
                        />
                        <h3>{pokemon.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PokemonList;
