'use client'

import React, { useEffect, useState } from 'react'
import { PokemonWidget } from '../../../components/widgets/pokemon-widget'
import {
	fetch_evolution_chain,
	fetch_pokemon_details,
	fetch_same_types_pokemon_data,
} from '../../../services/fetch'
import PokemonData from '../../../interface/pokemon'
import { SpeciesData } from '../../../interface/evolution'
import { ClipLoader } from 'react-spinners'
import { authenticate } from '../../../services/auth'
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: PokemonData }) {
	type TypeData = {
		name: string
	}

	type StatData = {
		name: string
		value: number
	}

	const [evolveFrom, setEvolveFrom] = useState<SpeciesData[]>([])
	const [evolveTo, setEvolveTo] = useState<SpeciesData[]>([])
	const [sameTypes, setSameTypes] = useState<PokemonData[]>([])
	const [types, setTypes] = useState<TypeData[]>([])
	const [statData, setStatData] = useState<StatData[]>([])
	const [weight, setWeight] = useState('')
	const [height, setHeight] = useState('')
	const [loading, setLoading] = useState(true)
	const [notFound, setNotFound] = useState(false)

	const { push } = useRouter();

	useEffect(() => {
		init_page();
	}, [])

	const fetch_data = async () => {
		try {
			const res: any = await fetch_pokemon_details(params)
			if (res) {
				setLoading(false)
				setWeight(res.data.weight)
				setHeight(res.data.height)

				const statsInfo = res.data.stats.map((item) => ({
					name: item.stat.name,
					value: item.base_stat,
				}))
				setStatData(statsInfo)

				const typesUrl = res.data.types.map((item) => ({
					url: item.type.url,
					name: item.type.name,
				}))
				setTypes(typesUrl)

				const evoData = await fetch_evolution_chain(
					res.data.species.url,
					params,
				)
				if (evoData) {
					setEvolveFrom(evoData.evolFrom)
					setEvolveTo(evoData.evolTo)
				}

				const sameTypePokemons =
					await fetch_same_types_pokemon_data(typesUrl)
				if (sameTypePokemons) {
					setSameTypes(sameTypePokemons)
				}
			}

			setNotFound(true)
		} catch (err) {
			console.log(err)
		}
	}

	const init_page = async () => {
		try {
			const res: any = await authenticate()
			fetch_data();
		} catch (err) {
			console.log("redirect");
			push('/login');
		}
	}

	const loadingPage = () => {
		return (
			<>
				<div className="flex items-center justify-center min-h-screen">
					<div className="flex items-center justify-center">
						<ClipLoader color="#000000" />
					</div>
				</div>
			</>
		)
	}

	const notFoundPage = () => {
		return (
			<>
				<div className="flex items-center justify-center min-h-screen">
					<div className="flex items-center justify-center text-center">
						POKEMON NOT FOUND
					</div>
				</div>
			</>
		)
	}

	const spawnStats = () => {
		return (
			<>
				{statData &&
					statData.map((stat) => (
						<div className="row-span-1 col-span-1 justify-center content-center text-center">
							<pre>
								{stat.name + ' :\n'}
								{stat.value}
							</pre>
						</div>
					))}
			</>
		)
	}

	const spawnEvolData = (pokemonData: SpeciesData[]) => {
		return (
			<>
				{pokemonData &&
					pokemonData.map((pokemon) => {
						if (pokemon.species.name != params.name) {
							return (
								<PokemonWidget
									className="max-h-20 max-w-20"
									key={pokemon.species.name}
									name={pokemon.species.name}
								/>
							)
						}
					})}
			</>
		)
	}

	const spawnPokemonWidgets = (pokemonData: PokemonData[]) => {
		return (
			<>
				{pokemonData &&
					pokemonData.map((pokemon) => (
						<PokemonWidget
							className="max-h-20 max-w-20"
							key={pokemon.name}
							name={pokemon.name}
						/>
					))}
			</>
		)
	}

	return (
		<>
			{loading ? (
				<>{!notFound ? loadingPage() : notFoundPage()}</>
			) : (
				<>
					<PokemonWidget key={params.name} name={params.name} />
					<div className="pr-10 pl-10">
						<h1>Height: {height}</h1>
						<h1>Weight: {weight}</h1>
						<h1>
							Types:
							{types && types.map((type) => <li>{type.name}</li>)}
						</h1>
					</div>
					<div className="flex-1 border-dashed border-2 border-black m-5 mr-10 ml-10 p-2">
						Stats:
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 h-5/6 w-4/5 mx-auto p-5">
							{spawnStats()}
						</div>
					</div>
					<div className="flex m-10">
						<div className="flex-1 border-dashed border-2 border-black mr-5 pb-5">
							<div className="mx-auto p-2">Evolution from:</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 h-5/6 w-4/5 mx-auto pb-5">
								{spawnEvolData(evolveFrom)}
							</div>
						</div>
						<div className=" flex-1 border-dashed border-2 border-black ml-5 pb-5">
							<div className="mx-auto p-2">Evolve to:</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 h-5/6 w-4/5 mx-auto pb-5">
								{spawnEvolData(evolveTo)}
							</div>
						</div>
					</div>
					<div className="flex-1 border-dashed border-2 border-black m-5 mr-10 ml-10 p-2">
						Same Type Pokemons:
						<div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4 h-5/6 w-4/5 mx-auto p-5">
							{spawnPokemonWidgets(sameTypes)}
						</div>
					</div>
				</>
			)}
		</>
	)
}
