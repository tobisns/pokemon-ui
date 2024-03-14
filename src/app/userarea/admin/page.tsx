'use client'
// Import necessary modules and components
import { useEffect, useState } from 'react';
import { AdminPopup } from "../../../components/popup/adminpopup";
import { Toaster } from 'react-hot-toast';
import React from 'react';
import { CreatePokemonForm } from '../../../components/forms/create-pokemon-form';
import { fetch_pokemon_data, fetch_pokemon_details, fetch_types_data } from '../../../services/fetch';
import { AdminPokemonWidget } from '../../../components/widgets/admin-pokemon-widget';
import { ClipLoader } from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroll-component';
import PokemonData from '../../../interface/pokemon';
import { authenticate } from '../../../services/auth';
import { useRouter } from 'next/navigation';

// Define the Page component
export default function Page() {
	const limit = 20
    // State to manage the visibility of the popup
    const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [loading, setLoading] = useState(true)
    const [items, setItems] = useState<PokemonData[]>([])
	const [hasMore, setHasMore] = useState(true)
	const [index, setIndex] = useState(1)

    // Function to toggle the visibility of the popup
    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const { push } = useRouter();

	useEffect(() => {
		// refresh scroll
		window.scrollTo(0, 0)
		

		init_page();
	}, [])

	const init_page = async () => {
		try {
			const res: any = await authenticate()
			fetch_data();
		} catch (err) {
			console.log("redirect");
			push('/login');
		}
	}

	const fetch_data = async () => {
		try {
			const pokemonData = await fetch_pokemon_data(limit, 0)
			setItems(pokemonData)
			setLoading(false)
		} catch (err) {
			console.log(err)
			setLoading(false)
		}
	}

    const fetchMoreData = async () => {
		try {
			const pokemonData = await fetch_pokemon_data(limit, index)
			setItems((prevItems) => [...prevItems, ...pokemonData])
			setIndex((prevIndex) => prevIndex + 1)
			pokemonData.length > 0 ? setHasMore(true) : setHasMore(false)
		} catch (err) {
			console.log(err)
		}
	}

    const loadingPage = () => {
		return (
			<>
				<div className="flex items-center justify-center min-h-screen bg-white text-black">
					<div className="flex items-center justify-center">
						<ClipLoader color="#000000" />
					</div>
				</div>
			</>
		)
	}

    const loadingScroll = () => {
		return (
			<>
				<h4 className="bg-white text-center text-black">Loading...</h4>
			</>
		)
	}

    const spawnPokemonWidgets = (pokemonData: PokemonData[]) => {
		return (
			<>
                {pokemonData &&
                    pokemonData.map((pokemon) => (
                        <AdminPokemonWidget
                            key={pokemon.name}
                            pokemon={pokemon}
                        />
                ))}
			</>
		)
	}

    const spawnCreatePopup = () => {
        return (
            <AdminPopup togglePopup={togglePopup}>
                <CreatePokemonForm/>
            </AdminPopup>
        )
    }

    // Return the JSX
    return (
        <>
            <button onClick={togglePopup}>Create New Pokemon</button>
            {isPopupOpen && spawnCreatePopup()}
            <div>
                <React.StrictMode>
                    {loading ? (
                        loadingPage()
                    ) : (
                        <InfiniteScroll
                            dataLength={items.length}
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={loadingScroll()}
                        >
                            {spawnPokemonWidgets(items)}
                        </InfiniteScroll>
                    )}
                </React.StrictMode>
            </div>

            <Toaster/>
        </>
    );
}
