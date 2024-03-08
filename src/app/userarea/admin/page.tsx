'use client'
// Import necessary modules and components
import { useState } from 'react';
import { AdminPopup } from "../../../components/popup/adminpopup";
import { Field, Form, Formik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';

import * as Yup from "yup";
import { create_pokemon } from '../../../services/crud';


// Define the Page component
export default function Page() {
    // State to manage the visibility of the popup
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Function to toggle the visibility of the popup
    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const numberRegex = /^(0|[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;

    const formValidationSchema = Yup.object().shape({
        weight: Yup.string().matches(numberRegex, "not valid").required('Required'),
        height: Yup.string().matches(numberRegex, "not valid").required('Required'),
        stats: Yup.object().shape({
            hp: Yup.string().matches(numberRegex, "not valid").required('Required'),
            attack: Yup.string().matches(numberRegex, "not valid").required('Required'),
            defense: Yup.string().matches(numberRegex, "not valid").required('Required'),
            special_attack: Yup.string().matches(numberRegex, "not valid").required('Required'),
            special_defense: Yup.string().matches(numberRegex, "not valid").required('Required'),
            speed: Yup.string().matches(numberRegex, "not valid").required('Required')
        })
    });
    
      const initialValues = {
        name: "",
        image_url: "",
        weight: 0,
        height: 0,
        stats: {
            hp: 0,
            attack: 0,
            defense: 0,
            special_attack: 0,
            special_defense: 0,
            speed: 0
        }
      };

    const spawnCreatePopup = () => {
        return (
            <AdminPopup togglePopup={togglePopup}>
                <Formik 
                    initialValues={initialValues} 
                    onSubmit={async (values) => {
                        try {
                            const res = await create_pokemon(values);
                            console.log(res)
                            if(res) {
                                toast.success("Create Successful! 🎉")
                            }
                        } catch (err) {
                            console.log(err)
                            toast.error("Create Failed 😞")
                        }
                    }}
                    validationSchema={formValidationSchema}
                    validateOnChange={true}
                    >
                        {({ errors, touched ,isSubmitting}) => (
                        <Form className="flex flex-col gap-2 p-5 w-full">
                            <div className="flex flex-wrap gap-2">
                            <div className="flex flex-col mb-3">
                                <label htmlFor="name" className="sub-1">Name</label>
                                <Field type="text" name="name" placeholder="Name" id="name"
                                       className="sub-1 rounded px-2 py-1 border border-black bg-white text-black" />
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="url" className="sub-1">Image Url</label>
                                <Field type="text" name="image_url" placeholder="https://image.com" id="image_url"
                                       className="sub-1 rounded px-2 py-1 border border-black bg-white text-black" />
                            </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                            <div className="flex flex-col mb-3">
                                <label htmlFor="weight" className="sub-1">Weight</label>
                                <Field
                                type="number"
                                name="weight"
                                placeholder="99"
                                helperText={errors.weight}
                                error={errors.weight}
                                className="sub-1 rounded px-2 py-1 border border-black bg-white text-black appearance-none" 
                                />
                                {errors.weight && touched.weight ? (
                                    <p className="tag text-red-500">{errors.weight}</p>
                                ) : null}
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="height" className="sub-1">Height</label>
                                <Field
                                type="number"
                                name="height"
                                placeholder="99"
                                helperText={errors.height}
                                error={errors.height}
                                className="sub-1 rounded px-2 py-1 border border-black bg-white text-black appearance-none" 
                                />
                                {errors.height && touched.height ? (
                                    <p className="tag text-red-500">{errors.height}</p>
                                ) : null}
                            </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                            <div className="flex flex-col mb-3">
                                <label htmlFor="hp" className="sub-1">Hit Point</label>
                                <Field
                                    type="number"
                                    name="stats.hp"
                                    placeholder="99"
                                    helperText={errors.stats?.hp}
                                    error={errors.stats?.hp}
                                    className="sub-1 rounded px-2 py-1 border border-black bg-white text-black appearance-none" 
                                />
                                {errors.stats?.hp && touched.stats?.hp ? (
                                    <p className="tag text-red-500">{errors.stats.hp}</p>
                                ) : null}
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="attack" className="sub-1">Attack</label>
                                <Field
                                    type="number"
                                    name="stats.attack"
                                    placeholder="99"
                                    helperText={errors.stats?.attack}
                                    error={errors.stats?.attack}
                                    className="sub-1 rounded px-2 py-1 border border-black bg-white text-black appearance-none" 
                                />
                                {errors.stats?.attack && touched.stats?.attack ? (
                                    <p className="tag text-red-500">{errors.stats.attack}</p>
                                ) : null}
                            </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                            <div className="flex flex-col mb-3">
                                <label htmlFor="defense" className="sub-1">Defense</label>
                                <Field
                                    type="number"
                                    name="stats.defense"
                                    placeholder="99"
                                    helperText={errors.stats?.defense}
                                    error={errors.stats?.defense}
                                    className="sub-1 rounded px-2 py-1 border border-black bg-white text-black appearance-none" 
                                />
                                {errors.stats?.defense && touched.stats?.defense ? (
                                    <p className="tag text-red-500">{errors.stats.defense}</p>
                                ) : null}
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="special_attack" className="sub-1">Special Attack</label>
                                <Field
                                    type="number"
                                    name="stats.special_attack"
                                    placeholder="99"
                                    helperText={errors.stats?.special_attack}
                                    error={errors.stats?.special_attack}
                                    className="sub-1 rounded px-2 py-1 border border-black bg-white text-black appearance-none" 
                                />
                                {errors.stats?.special_attack && touched.stats?.special_attack ? (
                                    <p className="tag text-red-500">{errors.stats.special_attack}</p>
                                ) : null}
                            </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                            <div className="flex flex-col mb-3">
                                <label htmlFor="special_defense" className="sub-1">Special Defense</label>
                                <Field
                                    type="number"
                                    name="stats.special_defense"
                                    placeholder="99"
                                    helperText={errors.stats?.special_defense}
                                    error={errors.stats?.special_defense}
                                    className="sub-1 rounded px-2 py-1 border border-black bg-white text-black appearance-none" 
                                />
                                {errors.stats?.special_defense && touched.stats?.special_defense ? (
                                    <p className="tag text-red-500">{errors.stats.special_defense}</p>
                                ) : null}
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="speed" className="sub-1">Speed</label>
                                <Field
                                    type="number"
                                    name="stats.speed"
                                    placeholder="99"
                                    helperText={errors.stats?.speed}
                                    error={errors.stats?.speed}
                                    className="sub-1 rounded px-2 py-1 border border-black bg-white text-black appearance-none" 
                                />
                                {errors.stats?.speed && touched.stats?.speed ? (
                                    <p className="tag text-red-500">{errors.stats.speed}</p>
                                ) : null}
                            </div>
                            </div>
                            <div className="form-button">
                                <button type="submit" className="button bg-white w-full border-0 rounded-full py-2" disabled={isSubmitting}>Create</button>
                            </div>
                        </Form>
                            )}
                    </Formik>

            </AdminPopup>
        )
    }

    // Return the JSX
    return (
        <>
            {/* Render the AdminPopup component and pass togglePopup function */}
            {isPopupOpen && spawnCreatePopup()}

            {/* Button to toggle the popup */}
            <button onClick={togglePopup}>Toggle Popup</button>
            <Toaster/>
        </>
    );
}
