import axios from 'axios'
import PokemonData from '../interface/pokemon'

export const get_filtered_pokemon = async (
	filter: number,
): Promise<PokemonData[]> => {
	const API = process.env.API
	try {
		const res: any = await axios.get(`${API}/types/${filter}`)
		if (res?.data?.pokemons) {
			return res.data.pokemons.map((item) => ({
				name: item.name,
				url: item.url,
			}))
		}

		return []
	} catch (err: any) {
		console.log(err)
	}
}
