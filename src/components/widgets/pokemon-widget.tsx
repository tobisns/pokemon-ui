import { PropsWithChildren, useState } from "react";
import axios from "axios";

interface Pokemon {
    name: string;
    url?: string;
};

export default function PokemonWidget(props : PropsWithChildren<Pokemon>) {
    const {children, name, url} = props;
    const [ imageUrl, setImageUrl ] = useState("");

    if(url) {
        axios.get(`${url}`,
        {

        }).then((res) => {
            setImageUrl(res.data.sprites.other['official-artwork'].front_default);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <>
            <div key={name} className="bg-pink-100 row-span-1 col-span-1 min-h-80">
                <img
                alt={name}
                src={imageUrl}
                className="group-hover:opacity-75"
                />
            </div>
        </>
    )
}