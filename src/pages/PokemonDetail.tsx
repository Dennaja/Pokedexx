import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import arrow from '../assets/arrow.svg';
import arro from '../assets/arro.svg';
import arr from '../assets/arr.svg';
import pokeballBg from '../assets/pokeball.svg';
import tinggi from '../assets/height.svg';
import berat from '../assets/weight.svg';

const names = ['HP', 'ATK', 'DEF', 'SATK', 'SDEF', 'SPD'];

interface PokemonDetail {
    name: string;
    id: number;
    height: number;
    weight: number;
    types: Array<{ type: { name: string } }>;
    abilities: Array<{ ability: { name: string } }>;
    sprites: {
        front_default: string;
    };
    stats: Array<{ base_stat: number, stat: { name: string } }>;
}

interface PokemonSpecies {
    flavor_text_entries: Array<{ flavor_text: string, language: { name: string } }>;
}

const PokemonDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
    const [description, setDescription] = useState<string>('');
    const [backgroundColor, setBackgroundColor] = useState<string>('bg-gray-200'); // Default color
    const [textColor, setTextColor] = useState<string>('text-gray-200'); // Default text color
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get<PokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${id}`);
                setPokemon(response.data);
                
                // Get the first type as an example
                const type = response.data.types[0].type.name;
                setBackgroundColor(getBackgroundColor(type));
                setTextColor(getTextColor(type));
            } catch (error) {
                console.error('Error fetching the Pokémon details', error);
            }
        };

        const fetchPokemonSpecies = async () => {
            try {
                const response = await axios.get<PokemonSpecies>(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
                const englishText = response.data.flavor_text_entries.find(entry => entry.language.name === 'en');
                if (englishText) {
                    setDescription(englishText.flavor_text.replace(/\n|\f/g, ' '));
                }
            } catch (error) {
                console.error('Error fetching the Pokémon species details', error);
            }
        };

        fetchPokemon();
        fetchPokemonSpecies();
    }, [id]);

    const getBackgroundColor = (type: string): string => {
        const colors: { [key: string]: string } = {
            normal: 'bg-normal',
            fire: 'bg-fire',
            water: 'bg-water',
            electric: 'bg-electric',
            grass: 'bg-grass',
            ice: 'bg-ice',
            fighting: 'bg-fighting',
            poison: 'bg-poison',
            ground: 'bg-ground',
            flying: 'bg-flying',
            psychic: 'bg-psychic',
            bug: 'bg-bug',
            rock: 'bg-rock',
            ghost: 'bg-ghost',
            dragon: 'bg-dragon',
            dark: 'bg-dark',
            steel: 'bg-steel',
            fairy: 'bg-fairy',
            // Add more types and their corresponding colors here
        };
        return colors[type] || 'bg-gray-200'; // Default color
    };

    const getTextColor = (type: string): string => {
        const colors: { [key: string]: string } = {
            normal: 'text-normal',
            fire: 'text-fire',
            water: 'text-water',
            electric: 'text-electric',
            grass: 'text-grass',
            ice: 'text-ice',
            fighting: 'text-fighting',
            poison: 'text-poison',
            ground: 'text-ground',
            flying: 'text-flying',
            psychic: 'text-psychic',
            bug: 'text-bug',
            rock: 'text-rock',
            ghost: 'text-ghost',
            dragon: 'text-dragon',
            dark: 'text-dark',
            steel: 'text-steel',
            fairy: 'text-fairy',
            // Tambahkan tipe dan warnanya di sini
        };
        return colors[type] || 'text-gray-200'; // Warna default
    };

    const formatStatValue = (value: number): string => {
        return value < 100 ? value.toString().padStart(3, '0') : value.toString();
    };

    const handleNextPokemon = () => {
        const nextId = Number(id) + 1;
        navigate(`/pokemon/${nextId}`);
    };

    const handlePreviousPokemon = () => {
        const prevId = Number(id) - 1;
        navigate(`/pokemon/${prevId}`);
    };

    if (!pokemon) return <div>Loading...</div>;

    return (
        <div className={`container mx-auto p-4 ${backgroundColor} text-white relative`}>
            <img
                src={pokeballBg}
                alt="Pokeball Background"
                className="absolute top-0 right-0 opacity-30 h-64 mt-3 mr-3 z-0" // Adjust size and z-index
            />
            <div className="relative z-10"> {/* Make sure the content is above the background */}
                <div className="flex justify-between items-center mb-4">
                    <Link to="/" className="text-white text-xl flex items-center gap-10 font-bold">
                        <img src={arro} alt="Back arrow" /> {/* Back arrow */}
                        <h1 className="text-3xl font-poppins font-bold">{pokemon.name.toUpperCase()}</h1>
                    </Link>
                    
                    <p className="text-custom-medium font-poppins font-semibold">#{pokemon.id.toString().padStart(3, '0')}</p>
                </div>
                <div className="flex justify-between items-center mt-40 mb-4">
                    <button onClick={handlePreviousPokemon} className="text-white text-2xl">
                        <img src={arr} alt="Left arrow" /> {/* Left arrow */}
                    </button>
                    <img 
                        src={pokemon.sprites.front_default} 
                        alt={pokemon.name} 
                        className="absolute  left-1/2 transform -translate-x-1/2 z-20"
                        style={{ width: '325px', height: '325px' }} // Adjust size as needed
                    />
                    <button onClick={handleNextPokemon} className="text-white text-2xl">
                        <img src={arrow} alt="Right arrow" /> {/* Right arrow */}
                    </button>
                </div>
                <div className="relative bg-white p-3 rounded-xl mt-7">
                    
                    <div className="pt-24 "> {/* Add padding top to push the content down */}
                        <div className="flex justify-center font-poppins space-x-4 mb-4">
                            {pokemon.types.map(type => (
                                <span
                                    key={type.type.name}
                                    className={`text-white px-2 font-poppins py-1 rounded-full font-bold border type-${type.type.name}`}
                                >
                                    {type.type.name.toUpperCase()}
                                </span>
                            ))}
                        </div>
                        
                        <div className={`bg-white text-black p-4 rounded-lg`}>
                            <h2 className={`text-xl font-poppins font-bold mb-2 text-center ${textColor}`}>About</h2>
                            <div className="grid grid-cols-3 justify-center items-center">
                                <div className='items-center font-poppins justify-center text-center'>
                                    <p className='flex  items-center font-poppins justify-center text-center'>
                                        <img src={berat} alt="Weight" className="w-6 h-6" />
                                        {pokemon.weight / 10} kg
                                    </p>
                                    <p className='text-black/50 font-bold mt-4'>Weight</p> 
                                </div>
                                
                                <div className='border-s-4 border-e-4'>
                                    <p className='flex items-center font-poppins justify-center text-center'>
                                        <img src={tinggi} alt="Height" className="w-6 h-6" />
                                        {pokemon.height / 10} m
                                    </p>
                                    <p className='font-bold mt-4 text-black/50 w-full text-center'>Height</p>
                                </div>
                                
                                <p className='flex font-poppins flex-col-reverse justify-center  text-center'>
                                    <strong className='text-center mt-2 text-black/50'>Moves</strong> {pokemon.abilities.map(ability => ability.ability.name).join(', ')}
                                </p>
                            </div>
                            <div className="bg-white font-poppins text-black rounded-lg mt-1 p-4">
                                <p>{description}</p>
                            </div>
                        </div>
                        <div className={`bg-white text-black p-4 rounded-lg `}>
                            <h2 className={`text-[sm] font-poppins font-bold mb-2 text-center ${textColor} `}>Base Stats</h2>
                            {pokemon.stats.map((stat, index) => (
                                <div key={stat.stat.name} className="p1 grid grid-cols-[120px_1fr] items-center font-bold">
                                    <div className="grid grid-cols-2">
                                        <span className={`${textColor} font-poppins text-end pr-5 text-custom-xl `}>{names[index]}</span>
                                        <span className='font-poppins text-end border-s-4'>{formatStatValue(stat.base_stat)}</span>
                                    </div>
                                    <div className="w-auto bg-gray-300 rounded-full h-1.5 ml-4">
                                        <div className={`h-1.5 rounded-full ${getBackgroundColor(pokemon.types[0].type.name)}`} style={{ width: `${(stat.base_stat / 250) * 100}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetail;
