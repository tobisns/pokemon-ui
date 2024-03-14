import { PropsWithChildren } from "react";
import TypesData from "../../interface/types";
import { Field, FieldArray, Form, Formik } from "formik";
import { edit_types } from "../../services/crud";
import toast from "react-hot-toast";


interface AssignTypeFormProps {
    types : TypesData[]
    assignedTypes : TypesData[]
    name : string
}



export const AssignTypeForm = (props : PropsWithChildren<AssignTypeFormProps>) => {
    const {types, assignedTypes, name} = props;
    const initialValues = {
        types: types.map(type => ({
          ...type,
          checked: !!assignedTypes.find(assignedType => assignedType.id === type.id),
        })),
      };
    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    try {

                        const res = await edit_types(assignedTypes, values.types.filter(item => item.checked), name);
                        console.log(res)
                        if(res) {
                            toast.success("Create Successful! 🎉")
                        }
                    } catch (err) {
                        console.log(err)
                        toast.error("Create Failed 😞")
                    }
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <FieldArray
                        name="types"
                        render={arrayHelpers => (
                            <>
                            {values.types.map((type, index) => (
                                <div key={type.id}>
                                <label>
                                    <Field
                                    name={`types[${index}].checked`}
                                    type="checkbox"
                                    checked={type.checked}
                                    onChange={e => setFieldValue(`types[${index}].checked`, e.target.checked)}
                                    />
                                    {type.name}
                                </label>
                                </div>
                            ))}
                            </>
                        )}
                        />
                        <button type="submit">Submit</button>
                    </Form>
                    )}
            </Formik>
        </>
    )
}