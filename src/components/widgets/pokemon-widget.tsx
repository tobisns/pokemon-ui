import { PropsWithChildren, useState } from "react";
import axios from "axios";

interface Pokemon {
    name?: string;
};

export default function PokemonWidget(props : PropsWithChildren<Pokemon>) {
    const {children, name} = props;
    const [ imageUrl, setImageUrl ] = useState("");

    const API = process.env.API;


    if(name) {
        axios.get(`${API}/pokemon/${name}`,
        {

        }).then((res) => {
            setImageUrl(res.data.sprites.other['official-artwork'].front_default);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <>
        <a href={`/details/${name}`}>
        <div key={name} className="bg-pink-100 row-span-1 col-span-1 min-h-80 align-middle justify-center content-center text-center">
                <img
                alt={name}
                src={imageUrl}
                className="group-hover:opacity-75 size-60 mx-auto"
                />
                {name}
            </div>
        </a>
        </>
    )
}