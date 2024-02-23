import PokemonData from "./pokemon";

export interface SpeciesData {
    species: PokemonData;
}

export default interface EvoData {
    evolFrom : SpeciesData[];
    evolTo : SpeciesData[];
} 