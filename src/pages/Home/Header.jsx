import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../UI/Button";

import header1 from "../../assets/images/header/Header1.jpg";
import header2 from "../../assets/images/header/Header2.jpg";
import header3 from "../../assets/images/header/Header3.jpg";
import { pdfDownloadHelper } from "../../utils/pdfDownloadHelper";

const images = [header1, header2, header3];
const size = images.length;

export default function Header() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        return (prevIndex + 1) % size;
      });
    }, 5000);

    return () => clearInterval("timer");
  }, [size]);

  function handleNavigate() {
    navigate("/category");
  }
  const handleDownload = (elementId, fileName) => {
    pdfDownloadHelper(elementId, fileName);
  };
  return (
    <>
      <div className="header" id="homePage">
        <div className="content">
          <h2>
            Evara <span>- crafted with elegence</span>
          </h2>
          <p>
            Timeless style made for today. Faishon and lifestyle store for you.
          </p>
          <p>
            Discover effortless faishon and lifestyle products designed to
            elevate your every moment. Evara is your one step solution for
            shopping your needs and cater your wants.
          </p>
          <Button onClick={handleNavigate}>View Product Catalouge</Button>
          <Button onClick={() => handleDownload("homePage", "homepage")}>
            Download Page
          </Button>
        </div>
        <div className="image-slideshow"> 
            <img src={images[currentIndex]} alt="Clothes Image" className="img" />
        </div>
        {/* <img
          src="https://ecommerce-avatar-bucket.s3.ap-south-1.amazonaws.com/avatars/6123cd4a-e0b1-700f-499f-8698330f741d/8c4d7c3a-c914-4730-ba03-86f7a00fba2a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5T7GL7DUYU4XNDFF%2F20260226%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20260226T064217Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCmFwLXNvdXRoLTEiSDBGAiEA3rjFLN6%2B2zjyjmtGF%2FckBFfjZHjUME0Zt97ZLcbbkzMCIQCu7Uhotxo1GEv6mYIkiUFYY3NVjX2jzTKAY4Gwc7LvgSraAgggEAAaDDkzNjI0OTEyOTE5MyIMn9RKQ8h43G%2BvdTheKrcCzZ7TT8E80w0IYH75nVWVb1t8CSbRbgsvZxB2q9JeLZ7osXWzqNSyv%2FXpwSeG6XCnChtrRdszQqoHZFz8ydaeRsD9yTebJ2bzWsm6tcUoO9aTYYas1gSnniceOkB3OzSts4QipeFTZYSs5Ffb%2BN3EpqDZX%2Fypbuu95V4cbFO53SmOtTaOFLrlyKo84L3nKDb%2Bb6P3aVKnDviVAdD4lTjNAtrfYT0RozeZeJ6KB6pjxrVsbK4FvapuFROdCtnAdHlR%2B6Z6Dy1yZmVSnJRPghHlKwWOaZrMKOhbLLl%2BuSP8EEVQrdKtTyZZHmnIwoLJ%2FiJEpTkiWQ%2BiBtQpCwggHkMZO3Ok9SwzA%2BR6yE6wJCMZi8lmM82Nve6bKmusS79bgOnXQXpIq7feqMdwRNkGPAs7EPNdcuGpwmIwy5f%2FzAY6rALQaLa8WYIj7rA9QkVsIbeeiqdlayCyHoTO5rJxBi0IJQyknmtNajcI1QHSyXSpBAWdp5jXs1teQ4xWGtQacp89eEruRhgCAlHnZUdrvzTAZro%2FSijem1bZVhUKGADRl%2BedHtF8j%2BG%2BZ3r%2Ff8xXejWurV3ffuxFubSZ50bLN%2BW0DaVWwXzzkzO%2F2Sc0M%2F3GuYFU5Y2wD3dJ5UwRdZARUu2biafVatuQIXLzCl4QgfNSKeuGgstCCYJ6gc5cKjQnsgwatKMQ9ZC0JmAgq%2BhCDip5Ofcg2kV5LHeM%2BhTrdFAfp%2BtvVIa2Kacn%2BdbwEPgnTouOIKvHhsAefm4b8Fd5LEHd4mLCvfxxGsSEmCIGn60ErPiiwPcmzdImsdxHsab6zWiHgqI85KqCXn%2FHbbc%3D&X-Amz-Signature=f0e9fdfecc0ecc18e4777ced45f99ed00c40039834ac45ac57bad08fb7ace597&X-Amz-SignedHeaders=host&response-content-disposition=inline"
          alt="example"
        /> */}
      </div>
    </>
  );
}
