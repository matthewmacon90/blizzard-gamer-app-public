import './FooterStyles.css';
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="Footer-Container">
            <div className="FooterRight-Container">
            </div>
            <p>© {currentYear}</p>
            <div className="FooterLeft-Container">
            </div>
            <div className="Newsletter-Signup">
            </div>
        </footer>
    );
};

export default Footer;
