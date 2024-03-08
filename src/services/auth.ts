import axios from "axios"

export const authenticate = async (): Promise<Boolean> => {
	const API = process.env.API
	try {
		const res: any = await axios.get(
			`${API}/users/authenticate`,
			{withCredentials: true}
		)
		if (res?.data?.is_admin) {
			return res.data.is_admin
		}

		return false
	} catch (err) {
		console.log(err);
        throw err;
	}
}

export const login = async (values : any): Promise<any> => {
	const API = process.env.API
	try {
		const res: any = await axios.post('http://localhost:18080/users/login',
		{
			username:values.username,
			password:values.password,
		},{
			headers: {
				'Content-Type': 'application/json'
			},
			withCredentials: true
		})

		if (res?.data) {
			return res.data
		}
	} catch (err) {
		console.log(err);
        throw err;
	}
}