import { Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import React from 'react';
import * as Yup from "yup";
import { create_pokemon } from '../../services/crud';
import { NumericIMaskInput } from '../inputs/form-inputs';

const numberRegex = /^(0|[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;

const formValidationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    weight: Yup.string().matches(numberRegex, "not valid").required('Required'),
    height: Yup.string().matches(numberRegex, "not valid").required('Required'),
    stat: Yup.object().shape({
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
    stat: {
        hp: 0,
        attack: 0,
        defense: 0,
        special_attack: 0,
        special_defense: 0,
        speed: 0
    }
};

export const CreatePokemonForm = () => {
    return (
        <>
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
                                    {errors.name && touched.name ? (
                                <p className="tag text-red-500">{errors.name}</p>
                            ) : null}
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
                            <NumericIMaskInput
                            mask="000000"
                            name="weight"
                            placeholder="99"
                            helpertext={errors.weight}
                            error={errors.weight}
                            className="sub-1 rounded px-2 py-1 border border-black bg-white text-black appearance-none" 
                            />
                            {errors.weight && touched.weight ? (
                                <p className="tag text-red-500">{errors.weight}</p>
                            ) : null}
                        </div>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="height" className="sub-1">Height</label>
                            <NumericIMaskInput
                            mask="000000"
                            name="height"
                            placeholder="99"
                            helpertext={errors.height}
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
                            <NumericIMaskInput
                                mask="000000"
                                name="stat.hp"
                                placeholder="99"
                                helpertext={errors.stat?.hp}
                                error={errors.stat?.hp}
                                className="sub-1 rounded px-2 py-1 border border-black bg-white text-black appearance-none" 
                            />
                            {errors.stat?.hp && touched.stat?.hp ? (
                                <p className="tag text-red-500">{errors.stat.hp}</p>
                            ) : null}
                        </div>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="attack" className="sub-1">Attack</label>
                            <NumericIMaskInput
                                mask="000000"
                                name="stat.attack"
                                placeholder="99"
                                helpertext={errors.stat?.attack}
                                error={errors.stat?.attack}
                                className="sub-1 rounded px-2 py-1 border border-black bg-white text-black appearance-none" 
                            />
                            {errors.stat?.attack && touched.stat?.attack ? (
                                <p className="tag text-red-500">{errors.stat.attack}</p>
                            ) : null}
                        </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                        <div className="flex flex-col mb-3">
                            <label htmlFor="defense" className="sub-1">Defense</label>
                            <NumericIMaskInput
                                mask="000000"
                                name="stat.defense"
                                placeholder="99"
                                helpertext={errors.stat?.defense}
                                error={errors.stat?.defense}
                                className="sub-1 rounded px-2 py-1 border border-black bg-white text-black appearance-none" 
                            />
                            {errors.stat?.defense && touched.stat?.defense ? (
                                <p className="tag text-red-500">{errors.stat.defense}</p>
                            ) : null}
                        </div>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="special_attack" className="sub-1">Special Attack</label>
                            <NumericIMaskInput
                                mask="000000"
                                name="stat.special_attack"
                                placeholder="99"
                                helpertext={errors.stat?.special_attack}
                                error={errors.stat?.special_attack}
                                className="sub-1 rounded px-2 py-1 border border-black bg-white text-black appearance-none" 
                            />
                            {errors.stat?.special_attack && touched.stat?.special_attack ? (
                                <p className="tag text-red-500">{errors.stat.special_attack}</p>
                            ) : null}
                        </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                        <div className="flex flex-col mb-3">
                            <label htmlFor="special_defense" className="sub-1">Special Defense</label>
                            <NumericIMaskInput
                                mask="000000"
                                name="stat.special_defense"
                                placeholder="99"
                                helpertext={errors.stat?.special_defense}
                                error={errors.stat?.special_defense}
                                className="sub-1 rounded px-2 py-1 border border-black bg-white text-black appearance-none" 
                            />
                            {errors.stat?.special_defense && touched.stat?.special_defense ? (
                                <p className="tag text-red-500">{errors.stat.special_defense}</p>
                            ) : null}
                        </div>
                        <div className="flex flex-col mb-3">
                            <label htmlFor="speed" className="sub-1">Speed</label>
                            <NumericIMaskInput
                                mask="000000"
                                name="stat.speed"
                                placeholder="99"
                                helpertext={errors.stat?.speed}
                                error={errors.stat?.speed}
                                className="sub-1 rounded px-2 py-1 border border-black bg-white text-black appearance-none" 
                            />
                            {errors.stat?.speed && touched.stat?.speed ? (
                                <p className="tag text-red-500">{errors.stat.speed}</p>
                            ) : null}
                        </div>
                        </div>
                        <div className="form-button">
                            <button type="submit" className="button bg-white w-full border-0 rounded-full py-2" disabled={isSubmitting}>Create</button>
                        </div>
                    </Form>
                        )}
                </Formik>
        </>
    )
}