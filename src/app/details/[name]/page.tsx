"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonWidget from "../../../components/widgets/pokemon-widget";


export default function Page({ params }: { params: { name: string } }) {
    const API = process.env.API;

    type PokemonData = {
        name: string;
    }

    type SpeciesData = {
        species: PokemonData;
    }

    interface PokemonNode {
        species: string;
        evolves_to: PokemonNode[] | null;
    }

    const [evolveFrom, setEvolveFrom] = useState<SpeciesData[]>([]);
    const [evolveTo, setEvolveTo] = useState<SpeciesData[]>([]); 
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");

    var count = 0;

    useEffect(() => {
        axios.get(`${API}/pokemon/${params.name}`)
            .then((res) => {
                setWeight(res.data.weight);
                setHeight(res.data.height)
                return res.data.species.url;
            })
            .then((speciesUrl) => {
                axios.get(`${speciesUrl}`,
                {

                }).then((res) => {
                    return res.data.evolution_chain.url;          
                }).then((evoChainUrl) => {
                    axios.get(`${evoChainUrl}`,
                    {

                    }).then((res) => {
                        if(count <= 0){
                            count++;
                            check_evolves_from(res.data.chain);
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }).catch((err) => {
                    console.log(err);
                });
            })
            .catch((err) => {
            console.log(err);
            });
    }, []);

    function check_evolves_from(evoData){
        var evofrom = evoData.species.name != params.name;
        var evoToDat = [];
        var evoFromDat = [];

        console.log(evofrom);

        if(evofrom) {
            evoFromDat.push(evoData);
        } else {
            evoToDat.push(evoData);
        }

        evoData = evoData.evolves_to

        while(evoData.length > 0) {
            if(evofrom) {
                evoFromDat.push(...evoData);
                evofrom = !evoData.find(pokemon => pokemon.species.name == params.name)
            } else {
                evoToDat.push(...evoData);
            }
            evoData = evoData[0].evolves_to
        } 
        
        setEvolveFrom((prevItems) => [...prevItems, ...evoFromDat])
        setEvolveTo((prevItems) => [...prevItems, ...evoToDat])

    }


    return (
        <>
        <PokemonWidget key={params.name} name={params.name}/>
        <h1>
        Height: {height}
        </h1>
        <h1>
        Weight: {weight}
        </h1>
        <div className="flex">
            <div className="mx-auto">
                Evolution from:
                {evolveFrom &&
                evolveFrom.map((pokemon) => {if(pokemon.species.name != params.name) {return <PokemonWidget key={pokemon.species.name} name={pokemon.species.name}/>}})}
            </div>
            <div className="mx-auto">
                Evolve to:
                {evolveTo &&
                evolveTo.map((pokemon) => {if(pokemon.species.name != params.name) {return <PokemonWidget key={pokemon.species.name} name={pokemon.species.name}/>}})}    
            </div>
        </div>
        </>
    )
  }