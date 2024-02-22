"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {PokemonWidget} from "../../../components/widgets/pokemon-widget";


export default function Page({ params }: { params: { name: string } }) {
    const API = process.env.API;

    type PokemonData = {
        name: string;
    }

    type SpeciesData = {
        species: PokemonData;
    }

    type TypeData = {
        name: string;
    }



    const [evolveFrom, setEvolveFrom] = useState<SpeciesData[]>([]);
    const [evolveTo, setEvolveTo] = useState<SpeciesData[]>([]); 
    const [sameTypes, setSameTypes] = useState<PokemonData[]>([]);
    const [types, setTypes] = useState<TypeData[]>([]);
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");

    var count = 0;

    useEffect(() => {
        axios.get(`${API}/pokemon/${params.name}`)
            .then((res) => {
                setWeight(res.data.weight);
                setHeight(res.data.height);
                get_same_types(res.data.types);
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

    useEffect(() => {
        if(sameTypes){
            console.log(sameTypes)
        }
    }, [sameTypes]);

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
                evofrom = !evoData.find(pokemon => pokemon.species.name == params.name)
                if(evofrom){evoFromDat.push(...evoData);}
                
            } else {
                evoToDat.push(...evoData);
            }
            evoData = evoData[0].evolves_to
        } 
        
        setEvolveFrom((prevItems) => [...prevItems, ...evoFromDat])
        setEvolveTo((prevItems) => [...prevItems, ...evoToDat])

    }

    function get_same_types(types) {
        const typesUrl = types.map(item => ({
            url: item.type.url,
            name: item.type.name
          }));

          setTypes(typesUrl);

          var sameTypePokemons = [];
          var promises = [];
          
          typesUrl.forEach(element => {
              const promise = axios.get(`${element.url}`)
                  .then((res) => {
                      const updatedPokemonArray = res.data.pokemon.map(item => ({
                          name: item.pokemon.name,
                          url: item.pokemon.url
                      }));
                      sameTypePokemons = sameTypePokemons.concat(updatedPokemonArray);
                      sameTypePokemons = Array.from(new Set(sameTypePokemons.map(item => JSON.stringify(item)))).map(item => JSON.parse(item));

                      console.log(sameTypePokemons);
                  })
                  .catch((err) => {
                      console.log(err);
                  });
              promises.push(promise);
          });
          
          Promise.all(promises)
              .then(() => {
                  console.log(sameTypePokemons);
                  setSameTypes(sameTypePokemons);
              });
    }


    return (
        <>
        <PokemonWidget key={params.name} name={params.name}/>
        <div className="pr-10 pl-10">
            <h1>
            Height: {height}
            </h1>
            <h1>
            Weight: {weight}
            </h1>
            <h1>
                Types:
                {types &&
                types.map((type) => <li>{type.name}</li>)}
            </h1>
        </div>
        <div className="flex m-10">
            <div className="flex-1 border-dashed border-2 border-black mr-5 pb-5">
            <div className="mx-auto p-2">Evolution from:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 h-5/6 w-4/5 mx-auto pb-5">
                {evolveFrom &&
                evolveFrom.map((pokemon) => {if(pokemon.species.name != params.name) {return <PokemonWidget className="max-h-20 max-w-20" key={pokemon.species.name} name={pokemon.species.name}/>}})}
            </div>
            </div>
            <div className=" flex-1 border-dashed border-2 border-black ml-5 pb-5">
            <div className="mx-auto p-2">Evolve to:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 h-5/6 w-4/5 mx-auto pb-5">
                {evolveTo &&
                evolveTo.map((pokemon) => {if(pokemon.species.name != params.name) {return <PokemonWidget className="max-h-20 max-w-20" key={pokemon.species.name} name={pokemon.species.name}/>}})}    
            </div>
            </div>
        </div>
        <div className="flex-1 border-dashed border-2 border-black m-5 mr-10 ml-10 p-2">
                    Same Type Pokemons:
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4 h-5/6 w-4/5 mx-auto p-5">
                {sameTypes &&
                sameTypes.map((pokemon) => {if(pokemon.name != params.name) {return <PokemonWidget className="max-h-20 max-w-20" key={pokemon.name} name={pokemon.name}/>}})}
            </div>
        </div>
        </>
    )
  }