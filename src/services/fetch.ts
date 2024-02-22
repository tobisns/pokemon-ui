import axios from "axios";
import PokemonData from "../interface/pokemon";
import TypesData from "../interface/types";


export const fetch_pokemon_data = async (limit: number, index: number) : Promise<PokemonData[]> => {
    const API = process.env.API;
    try {
        const res: any = await axios.get(`${API}/pokemon?limit=${limit}&offset=${index*limit}`);
        if(res?.data?.results) {
            return res.data.results;
        }

        return [];
    } catch(err) {
        console.log(err);
    };
}

export const fetch_types_data = async () : Promise<TypesData[]> => {
    const API = process.env.API;
    try {
        const res: any = await axios.get(`${API}/type`)
        if(res?.data?.results){
            return res.data.results;
        }
        return [];
    } catch(err) {
        console.log(err);
    };
}