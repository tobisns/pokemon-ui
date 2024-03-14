import { Field } from "formik";
import { IMaskInput } from 'react-imask';

export const NumericIMaskInput = ({ name, mask, ...props }) => (
    <Field name={name}>
        {({ field, form }) => (
        <IMaskInput
            mask={mask}
            value={field.value?.toString() || ''}
            onAccept={(value) => {
            // Convert the input value to an integer, handling '0' correctly
            const intValue = parseInt(value, 10) || 0;
            form.setFieldValue(name, intValue);
            }}
            {...props}
        />
        )}
    </Field>
);