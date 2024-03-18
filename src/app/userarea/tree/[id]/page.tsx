"use client";

import React, { useEffect, useState } from "react";
import { TreeNodeInput } from "../../../../components/inputs/tree-node-inputs";
import { TreeNodeInputLoader } from "../../../../components/inputs/tree-node-input-loader";
import EvolTree, { EvolNode } from "../../../../interface/evoltree";
import { create_tree, delete_tree, get_tree, insert_tree } from "../../../../services/crud";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authenticate } from "../../../../services/auth";

interface TreePageParam {
    id: number
}

export default function Page({ params }: { params : TreePageParam }) {
    const [cards, setCards] = useState([]);
    const [forSubmitCards, setForSubmitCards] = useState([]);
    const [baseCards, setBaseCards] = useState([]);

	const { push, back } = useRouter();

    useEffect(() => {
        fetch_data();
      }, [])
  
    const fetch_data = async () => {
        try {
            const pokemonData = await get_tree(params.id)
            if(pokemonData) {
            const transformedArray = pokemonData.evolution_data
            .map(e => ({
                title: e.pokemon_name,
                column: e.level,
                id: e.pokemon_name
            }));
            setForSubmitCards(transformedArray);
            setBaseCards(transformedArray);
            }
            // Transform the array
        } catch (err) {
            console.log(err)
            push('/userarea/tree');
        }
    }

    const updateTree = async () => {
        const forDelete = {
            pokemons: baseCards
            .filter(item1 => !forSubmitCards.some(item2 => item2.id === item1.id && item2.column === item1.column))
            .map(e => ({
                name: e.title
              }))
        };
        const evolTree: EvolTree = {
            evolution_create: forSubmitCards
            .filter(item1 => !baseCards.some(item2 => item2.id === item1.id && item2.column === item1.column))
            .map(e => ({
              level: e.column, // Placeholder value, replace with actual logic if available
              pokemon_name: e.title
            } as EvolNode))
        };
        console.log(forDelete)
        console.log(evolTree)
        try {
			const res0: any = await delete_tree(forDelete, params.id)
			const res1: any = await insert_tree(evolTree, params.id)
            if(res0 && res1) {
                toast.success("Create Successful! 🎉")
                console.log(res1);
                setTimeout(()=>{
                    back();
                },1000)

            }
		} catch (err) {
			console.log("redirect");
		}
    }
    

    const getMaxColumn = (cards) => {
        return Math.max(...cards.map(card => card.column), 0); // Default to 0 if no cards
    };

    const spawnColumns = () => {
        const maxColumn = getMaxColumn(forSubmitCards);
        let columns = [];

        for (let i = 1; i <= maxColumn+1; i++) {
        columns.push(
            <TreeNodeInput
            key={`Level_${i}`}
            title={`Level ${i}`}
            column={i}
            headingColor="text-neutral-500"
            cards={cards}
            forSubmit={forSubmitCards}
            setCards={setCards}
            setForSubmit={setForSubmitCards}
            />
        );
        }

        return columns;
    };


    return (
        <>
        <div className="h-screen">
        <div className="flex h-full">
        <div className="w-full gap-3 p-12 overflow-y-scroll bg-black">
            <TreeNodeInputLoader
                title="Pokemons"
                column={0}
                headingColor="text-neutral-500"
                cards={cards}
                forSubmit={forSubmitCards}
                setCards={setCards}
                setForSubmit={setForSubmitCards}
            />
            <div className="pb-10"></div>
        </div>
        <div className="flex gap-3 overflow-scroll pl-12 pt-12 pr-12 w-full scrollbar-hide">
        {spawnColumns()}
        <button onClick={() => {console.log(forSubmitCards); updateTree();}}>test</button>
        </div>
        </div>
        </div>
        <Toaster/>

        </>
    );
};