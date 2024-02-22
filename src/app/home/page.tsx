"use client";

import React from "react";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {PokemonWidget} from "../../components/widgets/pokemon-widget";
import { get_filtered_pokemon } from "../../services/filter";
import PokemonData from "../../interface/pokemon";
import { fetch_pokemon_data, fetch_types_data } from "../../services/fetch";
import { get_query_pokemon } from "../../services/query";
import TypesData from "../../interface/types";
import {ClipLoader} from "react-spinners"



export default function Page() {

    const API = process.env.API;
    const limit = 20;

    const [items, setItems] = useState<PokemonData[]>([]);
    const [types, setTypes] = useState<TypesData[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [index, setIndex] = useState(1);
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // refresh scroll
        window.scrollTo(0, 0);
        const fetch_data = async () => {
            try {
                const pokemonData = await fetch_pokemon_data(limit, 0);
                setItems(pokemonData);
                setLoading(false);

                const typeData = await fetch_types_data();
                setTypes(typeData);


            } catch(err) {
                console.log(err);
                setLoading(false);

            }
        }
        
        fetch_data();
    }, []);

    
    const fetchMoreData = async () => {
        try {
            const pokemonData = await fetch_pokemon_data(limit, index);
            setItems((prevItems) => [...prevItems, ...pokemonData]);
            setIndex((prevIndex) => prevIndex + 1);
            pokemonData.length > 0 ? setHasMore(true) : setHasMore(false);
        } catch(err) {
            console.log(err);
        }        
    };
    
    useEffect(() => {
        if(query && query.trim()){
            window.scrollTo(0, 0);
            console.log(query);
            const getData = setTimeout(async () => {
                try {
                    const pokemonData = await get_query_pokemon(query);
                    setIndex(0);
                    setItems(pokemonData);
                } catch(err) {
                    setIndex(0);
                    setItems([]);
                    console.log(err);
                }
            }, 666);
            
            return () => clearTimeout(getData); 
        } else if (filter && !query) {
            window.scrollTo(0, 0);
            const getData = setTimeout(async () => {
                try {
                    const updatedPokemonArray = await get_filtered_pokemon(filter);
                    setItems(updatedPokemonArray);
                } catch(err) {
                    setIndex(0);
                    setItems([]);
                    console.log(err);
                }
            }, 666);
            return () => clearTimeout(getData); 
        } else {
            setItems([]);
            setIndex(0)
            fetchMoreData();
        } 


    }, [query, filter]);

    return (
        <div>
            <div className="fixed w-full bg-black sm:pt-12 pb-8 p-4 sm:p-12 z-10 flex">
                <input
                type="text"
                /// <reference " />
                onChange={(e) => {
                    if(e.target.value.trim()){
                        console.log("??")
                        setIndex(0);
                        setItems([]);
                    }
                    setQuery(e.target.value);
                    setHasMore(false);
                }}
                placeholder="Search...?!!!"
                className="bg-white-700 text-black p-2 rounded w-5/6 sm:w-96"
                />
                
                <select className="bg-white-700 text-black p-2 rounded w-5/6 sm:w-96 ml-2"
                onChange={(e) => {
                    if(e.target.value != "all"){
                        setFilter(e.target.value);
                        setHasMore(false);
                    } else {
                        setItems([]);
                        setFilter("");
                        setHasMore(true);
                    }
                }}
                >
                    <option value="all">
                        All
                    </option>
                    {types &&
                    types.map((type) => <option value={type.name}>
                        {type.name}
                    </option>)}
                </select>
            </div>
            <React.StrictMode>
            {loading? (
                <div className="flex items-center justify-center min-h-screen bg-black text-blue-50">
                    <div className="flex items-center justify-center">
                        <ClipLoader color="#ffffff" />
                    </div>
                </div>
            
            ) : ( 
            <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            >
                <div className="mt-21 sm:p-12 pt-20 sm:pt-[137px] bg-black min-h-screen">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-4 h-5/6 w-4/5 mx-auto">
                    {items &&
                    items.map((pokemon) => <PokemonWidget className="bg-gray-400 border-double border-2 border-white" key={pokemon.name} name={pokemon.name}/>)}
                </div>
                </div>
            </InfiniteScroll> 
            )
            }
            </React.StrictMode>
        </div>
    );

}
