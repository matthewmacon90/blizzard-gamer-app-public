import Input from "../input-form/Input";
import {useForm, FormProvider} from "react-hook-form";

const EditProfileForm = ({fieldToChange, label, type, previousValue, schema}) => {
    const methods = useForm();
    return (
        <div>
            <FormProvider {...methods}>
                <form>
                    <label htmlFor={fieldToChange}>{label}:</label>
                    <Input id={fieldToChange} placeholder={previousValue} type={type} validationRules={schema} />
                </form>
            </FormProvider>
        </div>
    );
};

export default EditProfileForm;
