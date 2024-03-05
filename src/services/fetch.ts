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
			`${API}/pokemon?limit=${limit}&offset=${index * limit}`,
		)
		if (res?.data?.results) {
			return res.data.results
		}

		return []
	} catch (err) {
		console.log(err)
	}
}

export const fetch_types_data = async (): Promise<TypesData[]> => {
	const API = process.env.API
	try {
		const res: any = await axios.get(`${API}/type`)
		if (res?.data?.results) {
			return res.data.results
		}
		return []
	} catch (err) {
		console.log(err)
	}
}

export const fetch_same_types_pokemon_data = async (
	typesUrl: TypesData[],
): Promise<PokemonData[]> => {
	try {
		const rawSameTypeData = await Promise.all(
			typesUrl.flatMap(async (e: any) => {
				const res: any = await axios.get(`${e.url}`)

				if (res?.data?.pokemon) {
					return res.data.pokemon.map((item) => ({
						name: item.pokemon.name,
						url: item.pokemon.url,
					}))
				}

				return []
			}),
		)

		return Array.from(
			new Set(
				[]
					.concat(...rawSameTypeData)
					.map((item) => JSON.stringify(item)),
			),
		).map((item) => JSON.parse(item))
	} catch (err: any) {
		console.log(err)
	}
}

export const fetch_pokemon_details = async (pokemon: PokemonData) => {
	const API = process.env.API
	try {
		const res: any = await axios.get(`${API}/pokemon/${pokemon.name}`)
		if (res?.data) {
			return res
		}

		return
	} catch (err) {
		console.log(err)
	}
}

export const fetch_evolution_chain = async (
	speciesUrl: string,
	base_pokemon: PokemonData,
): Promise<EvoData> => {
	try {
		const res0 = await axios.get(`${speciesUrl}`)

		if (res0?.data?.evolution_chain?.url) {
			const res1 = await axios.get(res0.data.evolution_chain.url)

			if (res1?.data.chain) {
				let evoData = res1.data.chain
				let evofrom = evoData.species.name != base_pokemon.name
				const evoToDat = []
				const evoFromDat = []

				if (evofrom) {
					evoFromDat.push(evoData)
				} else {
					evoToDat.push(evoData)
				}

				evoData = evoData.evolves_to

				while (evoData.length > 0) {
					if (evofrom) {
						evofrom = !evoData.find(
							(pokemon) =>
								pokemon.species.name == base_pokemon.name,
						)
						if (evofrom) {
							evoFromDat.push(...evoData)
						}
					} else {
						evoToDat.push(...evoData)
					}
					evoData = evoData[0].evolves_to
				}

				return { evolTo: evoToDat, evolFrom: evoFromDat }
			}

			return { evolTo: [], evolFrom: [] }
		}

		return { evolTo: [], evolFrom: [] }
	} catch (err) {
		console.log(err)
	}
}
