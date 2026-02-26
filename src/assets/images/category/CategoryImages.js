import beauty from "./beauty.png";
import fragrance from "./fragrance.png";
import furniture from "./furniture.png";
import groceries from "./groceries.png";
import kitch from "./kitchen-accessories.png";
import laptop from "./laptop.png";
import mobileAcc from "./mobile-accessories.png";
import homeDecor from "./home-decoration.png";
import about2 from "../about/about2.png";
import mensShirts from "./men-shirt.png";
import menshoes from "./men-shoes.png";

export const CategoryImage = {
  beauty: beauty,
  fragrances: fragrance,
  groceries: groceries,
  furniture: furniture,
  "kitchen-accessories": kitch,
  laptops: laptop,
  "mobile-accessories": mobileAcc,
  "home-decoration": homeDecor,
  "mens-shirts": mensShirts,
  "mens-shoes": menshoes,
};

export const getBackgroundImage = (cat) => {
  return CategoryImage[cat.toLowerCase()] || about2;
};


