const Footer = () => {
  return (
    <footer className="border-top pt-3 py-2 text-center">
      <span>
        Card<i className="bi bi-geo-fill"></i>Business
        <span className="mx-2">&copy;</span>
        <span>{new Date().getFullYear()}</span>
      </span>
    </footer>
  );
};
export default Footer;
