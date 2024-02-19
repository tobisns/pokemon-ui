"use client";

import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PokemonWidget from "../../components/widgets/pokemon-widget";



export default function Page() {
    type PokemonData = {
        name: string;
        url: string;
    }

    const API = process.env.API;
    const limit = 20;

    const [items, setItems] = useState<PokemonData[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [index, setIndex] = useState(1);

    useEffect(() => {
        // refresh scroll
        window.scrollTo(0, 0);
        axios.get(`${API}/pokemon?limit=${limit}&offset=0`,
        {
            
        }).then((res) => {
            setItems(res.data.results);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const fetchMoreData = () => {
        axios.get(`${API}/pokemon?limit=${limit}&offset=${index*limit}`,
        {

        }).then((res) => {
            setItems((prevItems) => [...prevItems, ...res.data.results]);
            setIndex((prevIndex) => prevIndex + 1);
            res.data.results.length > 0 ? setHasMore(true) : setHasMore(false);
        }).catch((err) => {
            console.log(err);
        });
        
    };


    return (
        <div>
            <div className="fixed w-full bg-black sm:pt-12 pb-8 p-4 sm:p-12 z-10">
                <input
                type="text"
                placeholder="Search..."
                className="bg-white-700 text-black p-2 rounded w-5/6 sm:w-96"
                />
            </div>
            <React.StrictMode>
            <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            >
                <div className="mt-21 sm:p-12 pt-20 sm:pt-[137px] bg-black min-h-screen">
                <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-4 h-5/6 w-4/5 mx-auto">
                    {items &&
                    items.map((pokemon) => <PokemonWidget key={pokemon.name} name={pokemon.name} url={pokemon.url}/>)}
                </div>
                </div>
            </InfiniteScroll>
            </React.StrictMode>
        </div>
    );

}
