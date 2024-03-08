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