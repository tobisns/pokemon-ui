import axios from "axios";
import PokemonData from "../interface/pokemon"


export const get_query_pokemon = async (query : string) : Promise<PokemonData[]> => {
    const API = process.env.API;
    try {
        const res: any = await axios.get(`${API}/pokemon/${query}`);
        if(res?.data) {
            return [res.data];
        }

        return [];
    } catch(err) {
        console.log(err);
    }
}