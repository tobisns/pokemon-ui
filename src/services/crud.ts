import axios from "axios"

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
	}
}