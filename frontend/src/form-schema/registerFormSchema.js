const usernameSchema = {
    required: 'This is required.',
    maxLength: {
        value: 30,
        message: 'Your username is too long, the max length is 30 characters'
    }
};

const passwordSchema = {
    required: 'This is required.',
    pattern: {
        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,}$/,
        message: `Password must have at least 12 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character`
    },
    minLength: {
        value: 12,
        message: `Password must have at least 12 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character`
    }
};

const emailSchema = {
    required: 'This is required.',
    pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: 'Invalid email'
    }
};

const firstNameSchema = {
    required: 'This is required.',
    maxLength: {
        value: 30,
        message: 'Your first name is too long, the max length is 30 characters'
    }
};

const lastNameSchema = {
    required: 'This is required.',
    maxLength: {
        value: 30,
        message: 'Your last name is too long, the max length is 30 characters'
    }
};

export {usernameSchema, passwordSchema, emailSchema, firstNameSchema, lastNameSchema}