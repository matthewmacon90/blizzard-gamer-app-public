const ErrorFormDisplay = ({ error }) => {
    return (
        <>
            <p>{error?.message}</p>
        </>
    );
};

export default ErrorFormDisplay;