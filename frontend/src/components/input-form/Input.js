import { useFormContext } from "react-hook-form";
import ErrorFormDisplay from "../error-display/errorFormDisplay";

const Input = ({id, type, placeholder, validationRules}) => {
    const {register, formState:{errors}} = useFormContext();
    return (
        <>
            <input id={id} type={type} placeholder={placeholder} {...register(id, validationRules)}/>
            <ErrorFormDisplay error={errors[id]}/>
        </>
    );
};

export default Input;