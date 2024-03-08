import { PropsWithChildren, useState } from 'react'
import axios from 'axios'
import { cn } from '../../utils/cn'
import React from 'react'
import { ClipLoader } from 'react-spinners'

interface Pokemon extends React.HTMLAttributes<HTMLDivElement> {
	name?: string
}

export const PokemonWidget = React.forwardRef<HTMLDivElement, Pokemon>(
	({ className, name, ...props }, ref) => {
		const [imageUrl, setImageUrl] = useState('')
		const [loading, setLoading] = useState(true)

		const API = process.env.API

		if (name) {
			axios
				.get(`${API}/pokemons/${name}`, {})
				.then((res) => {
					setImageUrl(
						res.data.image_url
					)
					console.log()
					setLoading(false)
				})
				.catch((err) => {
					console.log(err)
				})
		}

		return (
			<>
				<a href={`/userarea/details/${name}`}>
					<div
						key={name}
						className={cn(
							'row-span-1 col-span-1 align-middle justify-center content-center text-center',
							className,
						)}
					>
						{loading ? (
							<div className="flex-row items-center justify-center text-blue-50">
								<div className="flex items-center justify-center">
									<ClipLoader color="#000000" />
								</div>
							</div>
						) : (
							<>
								<img
									alt={name}
									src={imageUrl}
									className="group-hover:opacity-75 mx-auto size-60 h-full"
								/>
							</>
						)}
						<div className="truncate ...">{name}</div>
					</div>
				</a>
			</>
		)
	},
)
