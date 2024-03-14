import { PropsWithChildren, useEffect, useState } from "react";
import PokemonData from "../../interface/pokemon";
import { fetch_pokemon_details, fetch_types_data } from "../../services/fetch";
import { AdminPopup } from "../popup/adminpopup";
import { UpdatePokemonForm } from "../forms/update-pokemon-form";
import { delete_pokemon } from "../../services/crud";
import TypesData from "../../interface/types";
import { AssignTypeForm } from "../forms/assign-type-form";

interface AdminPokemonWidgetProps {
    pokemon: PokemonData
}

export const AdminPokemonWidget = (props : PropsWithChildren<AdminPokemonWidgetProps>) => {
    const [removed, setRemoved] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isTypesPopupOpen, setIsTypesPopupOpen] = useState(false);
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
	const [types, setTypes] = useState<TypesData[]>([]);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const toggleTypePopup = () => {
        setIsTypesPopupOpen(!isTypesPopupOpen);
    };

    const deleting = () => {
        setIsDeleting(!isDeleting);
    };

    const fetchPokemonDetails = async () => {
        try{
            const res = await fetch_pokemon_details(pokemon.name);
            if(res?.data) {
                setPokemonDetails(res.data)
                console.log(res.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const fetchTypesData = async () => {
        try {
			const typeData = await fetch_types_data()
			setTypes(typeData)
		} catch (err) {
			console.log(err)
		}
    }

    const deletePokemon = async () => {
        try{
            const res = await delete_pokemon(pokemon.name);
            if(res) {
                setRemoved(true);
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (isPopupOpen) {
            fetchPokemonDetails();
        } else {
            setPokemonDetails(null); // Reset/clear details when the popup is closed
        }

        if (isDeleting) {
            deletePokemon();
            setIsDeleting(false);
        }

        if (isTypesPopupOpen) {
            fetchPokemonDetails();
            fetchTypesData();
        } else {
            setPokemonDetails(null); // Reset/clear details when the popup is closed
        }
    }, [isPopupOpen, isDeleting, isTypesPopupOpen]);

    const {pokemon} = props;

    return (
        <>
            {!removed && (
            <div className={'flex items-center justify-center border-t border-black border-b border-width-2 h-20'}> {/* Adjust h-48 to your desired height */}
                <div className=" bg-gray-200 aspect-square h-full flex justify-center items-center overflow-hidden"> {/* Ensure this div takes the full height */}
                    <img
                        alt={pokemon.name}
                        src={pokemon.image_url}
                        className="max-w-none h-full object-cover mx-auto"
                    />
                </div>
                <h3 className="text-black text-base w-1/2 flex-1 pl-5">{pokemon.name}</h3>
                <button className="mr-5" onClick={toggleTypePopup}>types</button>
                <button className="mr-5" onClick={togglePopup}>edit</button>
                <button onClick={deleting}>delete</button>
            </div>
            )}
            {isPopupOpen && pokemonDetails && (
                <AdminPopup togglePopup={togglePopup}>
                <UpdatePokemonForm initialValues={pokemonDetails} pokemon={pokemonDetails.name} />
                </AdminPopup>
            )}

            {isTypesPopupOpen && pokemonDetails && (
                <AdminPopup togglePopup={toggleTypePopup}>
                    <AssignTypeForm types={types} assignedTypes={pokemonDetails.types} name={pokemonDetails.name}/>
                </AdminPopup>
            )}
        </>
    )
}