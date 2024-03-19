import axios from "axios"
import api from "./apiRequest"

export const authenticate = async (): Promise<Boolean> => {
	try {
		const res: any = await api.get(
			`/users/authenticate`
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
	try {
		const res: any = await api.post('/users/login',
		{
			username:values.username,
			password:values.password,
		},{
			headers: {
				'Content-Type': 'application/json'
			},
		})

		if (res?.data) {
			return res.data
		}
	} catch (err) {
		console.log(err);
        throw err;
	}
}