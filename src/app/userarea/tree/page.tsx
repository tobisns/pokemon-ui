"use client";

import React, { useEffect, useState } from "react";
import { TreeNodeInput } from "../../../components/inputs/tree-node-inputs";
import { TreeNodeInputLoader } from "../../../components/inputs/tree-node-input-loader";
import EvolTree, { EvolNode } from "../../../interface/evoltree";
import { create_tree } from "../../../services/crud";
import toast, { Toaster } from "react-hot-toast";
import { authenticate } from "../../../services/auth";
import { useRouter } from "next/navigation";

export default function Page() {
    const [cards, setCards] = useState([]);
    const [forSubmitCards, setForSubmitCards] = useState([]);

	const { back } = useRouter();

    const createTree = async () => {
        const evolTree: EvolTree = {
            evolution_create: forSubmitCards.map(e => ({
              level: e.column, // Placeholder value, replace with actual logic if available
              pokemon_name: e.title
            } as EvolNode))
        };
        try {
			const res: any = await create_tree(evolTree)
            if(res) {
                toast.success("Create Successful! 🎉")
                console.log(res.data);
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
        <button onClick={() => {console.log(forSubmitCards); createTree();}}>test</button>
        </div>
        </div>
        </div>
        <Toaster/>

        </>
    );
};