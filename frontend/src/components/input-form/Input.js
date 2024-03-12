import { useFormContext } from "react-hook-form";
import ErrorFormDisplay from "../error-display/errorFormDisplay";

const Input = ({id, type, placeholder, validationRules}) => {
    const {register, watch, formState:{errors, touchedFields}} = useFormContext();
    const password = id === 'password' ? watch('password') : null;

    const getPasswordValidationMessage = () => {
        if (!password) return 'Password is required.';
        if (password.length < 12) return 'Password must have at least 12 characters.';
        if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter.';
        if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter.';
        if (!/\d/.test(password)) return 'Password must contain at least one number.';
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password must contain at least one special character.';
        return 'Password is valid.';
    };

    return (
        <>
            <input id={id} type={type} placeholder={placeholder} {...register(id, validationRules)}/>
            {id === 'password' && touchedFields.password && <p>{getPasswordValidationMessage()}</p>}
            <ErrorFormDisplay error={errors[id]}/>
        </>
    );
};

export default Input;