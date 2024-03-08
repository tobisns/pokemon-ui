import axios from 'axios'
import PokemonData from '../interface/pokemon'
import TypesData from '../interface/types'
import EvoData from '../interface/evolution'

export const fetch_pokemon_data = async (
	limit: number,
	index: number,
): Promise<PokemonData[]> => {
	const API = process.env.API
	try {
		const res: any = await axios.get(
			`${API}/pokemons?limit=${limit}&offset=${index * limit}`,
		)
		if (res?.data?.pokemons) {
			return res.data.pokemons
		}

		return []
	} catch (err) {
		console.log(err)
	}
}

export const fetch_types_data = async (): Promise<TypesData[]> => {
	const API = process.env.API
	try {
		const res: any = await axios.get(`${API}/types`)
		if (res?.data?.types) {
			return res.data.types
		}
		return []
	} catch (err) {
		console.log(err)
	}
}

export const fetch_same_types_pokemon_data = async (
	typesUrl: TypesData[],
): Promise<PokemonData[]> => {
	const API = process.env.API
	try {
		const rawSameTypeData = await Promise.all(
			typesUrl.flatMap(async (e: TypesData) => {
				const res: any = await axios.get(`${API}/types/${e.id}`)

				if (res?.data?.pokemons) {
					return res.data.pokemons
				}

				return []
			}),
		)

		console.log(rawSameTypeData)

		return Array.from(
			new Map(
				[].concat(...rawSameTypeData)
					.map(item => [item.name, item]) // Create a Map with name as key and item as value
			).values()
		);
	} catch (err: any) {
		console.log(err)
	}
}

export const fetch_pokemon_details = async (pokemon: PokemonData) => {
	const API = process.env.API
	try {
		const res: any = await axios.get(`${API}/pokemons/${pokemon.name}`)
		if (res?.data) {
			return res
		}

		return
	} catch (err) {
		console.log(err)
	}
}

export const fetch_evolution_chain = async (
	evo_tree_id: string,
	base_pokemon: string,
): Promise<EvoData> => {
	const API = process.env.API
	try {
		const res = await axios.get(`${API}/evolution_tree/${evo_tree_id}`)

		if (res?.data?.evolution_data) {
			const current = res.data.evolution_data.find((data :any) => data.pokemon_name == base_pokemon);
			if (current) {
				
				const evoToDat = []
				const evoFromDat = []

				res.data.evolution_data.forEach((e : any) => {
					if (e.level < current.level) {
						evoFromDat.push(e)
					} else if (e.level > current.level) {
						evoToDat.push(e)
					}
				});
				
				return { evolTo: evoToDat, evolFrom: evoFromDat }
			}

			return { evolTo: [], evolFrom: [] }
		}

		return { evolTo: [], evolFrom: [] }
	} catch (err) {
		console.log(err)
	}
}
