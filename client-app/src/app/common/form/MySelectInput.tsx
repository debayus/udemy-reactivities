import { useField } from "formik";
import React from "react";
import { Form, Label, Select } from "semantic-ui-react";

interface Props{
    placeholder : string;
    name : string;
    options : any;
    label? : string;
}

export default function MySelectInput(props : Props){
    const [field, meta, helper] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Select 
                clearable 
                options={props.options} 
                value={field.value || null} 
                onChange={(e,d) => helper.setValue(d.value)}
                onBlur={() => helper.setTouched(true)}
                placeholder={props.placeholder}
            />
            {meta.touched && meta.error ? (
                <Label basic color="red">{meta.error}</Label>
            ) : null}
        </Form.Field>
    );
}