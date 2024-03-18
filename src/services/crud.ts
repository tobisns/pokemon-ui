import axios from "axios"
import TypesData from "../interface/types"
import EvolTree from "../interface/evoltree"

export const create_pokemon = async (values : any) => {
    const API = process.env.API
	try {
		const res: any = await axios.post(`${API}/pokemons`, 
        values, 
        {withCredentials: true})
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
    const API = process.env.API
	try {
		const res: any = await axios.put(`${API}/pokemons/${pokemon}`, 
        values, 
        {withCredentials: true})
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
    const API = process.env.API
	try {
		const res: any = await axios.delete(`${API}/pokemons/${pokemon}`, 
        {withCredentials: true})
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
    const API = process.env.API;
	const data = assignTypes.filter(at => !assignedTypes.some(ast => ast.id === at.id));
	const dataDelete = assignedTypes.filter(ast => !assignTypes.some(at => at.id === ast.id));
	console.log(data);
	console.log(dataDelete);
	try {
		const res0 = await Promise.all(
			data.flatMap(async (e : TypesData) => {
				const res = await axios.post(`${API}/types/${e.id}`, {
					name: pokemon
				},
				{withCredentials: true})

				if(res?.data) {
					return res
				}

				return {}
			})
		)

		const res1 = await Promise.all(
			dataDelete.flatMap(async (e : TypesData) => {
				const res = await axios.delete(`${API}/types/${e.id}`, {
					data: {
						name: pokemon
					},
					withCredentials: true
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
    const API = process.env.API;
	try {
		const res = await axios.post(`${API}/evolution_tree`, evotree,
		{withCredentials: true})
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
    const API = process.env.API;
	try {
		const res = await axios.get(`${API}/evolution_tree/${id}`,
		{withCredentials: true})
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
    const API = process.env.API;
	try {
		const res = await axios.post(`${API}/evolution_tree/${id}`, evotree,
		{withCredentials: true})
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
    const API = process.env.API;
	try {
		const res = await axios.delete(`${API}/evolution_tree/${id}`,
		{data: names, withCredentials: true})
		if(res?.data) {
			return res.data
		}

		return {} as EvolTree
	} catch (err) {
		console.log(err);
		throw err;
	}
}