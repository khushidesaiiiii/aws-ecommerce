import { Link, useNavigate } from "react-router-dom";

import about2 from "../../assets/images/about/about2.png";

import { getCategories } from "../../api/products.api";
import { CategoryImage, getBackgroundImage } from "../../assets/images/category/CategoryImages";

export default function Category() {
  const navigate = useNavigate();

  const { category, loading } = getCategories();
  //console.log(category);
  const formatCategoryName = (name) => {
    return name
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="category-page">
      <h2>Categories</h2>
      <div className="category-grid">
        {category.map((cat) => (
          <Link key={cat} to={`/category/${cat}`}>
            <div
              className="category-card"
            //   style={{
            //     backgroundImage: `url(${getBackgroundImage(cat)})`,
            //     backgroundSize: "cover",
            //     backgroundPosition: "center",
            //   }}
            >
              <img
                className="background-img"
                src={getBackgroundImage(cat)}
                alt={`${cat}`}
              />
              <h2>{formatCategoryName(cat)}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
