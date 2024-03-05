import axios from "axios"

export const authenticate = async (): Promise<Boolean> => {
	const API = process.env.API
	try {
		const res: any = await axios.get(
			`http://localhost:18080/users/authenticate`,
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