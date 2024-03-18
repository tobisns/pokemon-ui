export interface EvolNode {
    level: number,
    pokemon_name: string
}

export default interface EvolTree {
    evolution_create?: EvolNode[]
    evolution_data?: EvolNode[]
}