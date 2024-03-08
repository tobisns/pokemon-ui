import PokemonData from './pokemon'

export interface SpeciesData {
	pokemon_name: string
}

export default interface EvoData {
	evolFrom: SpeciesData[]
	evolTo: SpeciesData[]
}
