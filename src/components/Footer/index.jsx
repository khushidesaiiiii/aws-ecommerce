import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return(
    <div className="footer">
      <h2>Evara</h2>
      <div className="social-icons">
        <a href="https://www.facebook.com" >
          <FaFacebook />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      </div>  
      <p>© 2024 Evara. All rights reserved.</p>
    </div>
  );
}
