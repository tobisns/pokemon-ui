import axios from 'axios'
import PokemonData from '../interface/pokemon'

export const get_filtered_pokemon = async (
	filter: string,
): Promise<PokemonData[]> => {
	const API = process.env.API
	try {
		const res: any = await axios.get(`${API}/type/${filter}`)
		if (res?.data?.pokemon) {
			return res.data.pokemon.map((item) => ({
				name: item.pokemon.name,
				url: item.pokemon.url,
			}))
		}

		return []
	} catch (err: any) {
		console.log(err)
	}
}
