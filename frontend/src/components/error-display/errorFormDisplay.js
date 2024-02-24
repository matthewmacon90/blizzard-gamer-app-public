const ErrorFormDisplay = ({ error }) => {
    console.log('ERROR: ', error);
    return (
        <>
            <p>{error?.message}</p>
        </>
    );
};

export default ErrorFormDisplay;