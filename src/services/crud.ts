import axios from "axios"
import api from "./apiRequest"
import TypesData from "../interface/types"
import EvolTree from "../interface/evoltree"

export const create_pokemon = async (values : any) => {
	try {
		const res: any = await api.post(`/pokemons`, 
        values)
		if (res?.data) {
			return res.data
		}
		return null
	} catch (err) {
		console.log(err)
		throw err;
	}
}

export const update_pokemon = async (pokemon : string, values : any) => {
	try {
		const res: any = await api.put(`/pokemons/${pokemon}`, 
        values)
		if (res?.data) {
			return res.data
		}
		return null
	} catch (err) {
		console.log(err)
		throw err;
	}
}

export const delete_pokemon = async (pokemon : string) => {
	try {
		const res: any = await api.delete(`/pokemons/${pokemon}`)
		if (res?.data) {
			return res.data
		}
		return null
	} catch (err) {
		console.log(err)
		throw err;
	}
}

export const edit_types = async (assignedTypes: TypesData[], assignTypes : TypesData[], pokemon: string) => {
	const data = assignTypes.filter(at => !assignedTypes.some(ast => ast.id === at.id));
	const dataDelete = assignedTypes.filter(ast => !assignTypes.some(at => at.id === ast.id));
	console.log(data);
	console.log(dataDelete);
	try {
		const res0 = await Promise.all(
			data.flatMap(async (e : TypesData) => {
				const res = await api.post(`/types/${e.id}`, {
					name: pokemon
				})
				if(res?.data) {
					return res
				}

				return {}
			})
		)

		const res1 = await Promise.all(
			dataDelete.flatMap(async (e : TypesData) => {
				const res = await api.delete(`/types/${e.id}`, {
					data: {
						name: pokemon
					}
				})

				if(res?.data) {
					return res
				}

				return {}
			})
		)

		if(res0 && res1) {
			return res1;
		}

		return []
	} catch (err) {
		console.log(err);
		throw err;
	}
}

export const create_tree = async(evotree : EvolTree) : Promise<EvolTree> => {
	try {
		const res = await api.post(`/evolution_tree`, evotree)
		if(res?.data) {
			return res.data
		}

		return {} as EvolTree
	} catch (err) {
		console.log(err);
		throw err;
	}
}

export const get_tree = async(id: number) : Promise<EvolTree> => {
	try {
		const res = await api.get(`/evolution_tree/${id}`)
		if(res?.data) {
			return res.data
		}

		return {} as EvolTree
	} catch (err) {
		console.log(err);
		throw err;
	}
}

export const insert_tree = async(evotree : EvolTree, id: number) : Promise<EvolTree> => {
	try {
		const res = await api.post(`/evolution_tree/${id}`, evotree)
		if(res?.data) {
			return res.data
		}

		return {} as EvolTree
	} catch (err) {
		console.log(err);
		throw err;
	}
}

export const delete_tree = async(names : any, id: number) : Promise<EvolTree> => {
	try {
		const res = await api.delete(`/evolution_tree/${id}`,
		{data: names})
		if(res?.data) {
			return res.data
		}

		return {} as EvolTree
	} catch (err) {
		console.log(err);
		throw err;
	}
}