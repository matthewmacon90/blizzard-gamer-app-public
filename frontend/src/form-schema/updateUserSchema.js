const usernameSchema = {
    maxLength: {
        value: 30,
        message: 'Your username is too long, the max length is 30 characters'
    }
};

const passwordSchema = {
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
    pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: 'Invalid email'
    }
};

const battleTagSchema = {
    maxLength: {
        value: 100,
        message: 'Your username is too long, the max length is 30 characters'
    },
    pattern: {
        value: /^[a-zA-Z0-9]+#[0-9]+$/,
        message: 'Invalid battle tag. Must be in the format of battletag#1234.'
    }
};

export {usernameSchema, passwordSchema, emailSchema, battleTagSchema}