

import { DynamoDBClient, BatchWriteItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "ap-south-1" 
});

const TABLE_NAME = "EcommerceTable";

const batch1 = {
  RequestItems: {
    EcommerceTable: [
      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#38" },
            SK: { S: "METADATA" },
            productId: { S: "38" },
            name: { S: "Rice" },
            description: { S: "High-quality rice, a staple for various cuisines and a versatile base for many dishes." },
            brand: { S: "Generic" },
            category: { S: "groceries" },
            currency: { S: "USD" },
            price: { N: "5.99" },
            discountPercentage: { N: "9.29" },
            finalPrice: { N: "5.43" },
            rating: { M: { average: { N: "3.18" } } },
            stock: { N: "59" },
            sku: { S: "GRO-BRD-RIC-038" },
            images: { L: [{ S: "https://cdn.dummyjson.com/product-images/groceries/rice/1.webp" }] },
            thumbnail: { S: "https://cdn.dummyjson.com/product-images/groceries/rice/thumbnail.webp" },
            createdAt: { S: "2025-04-30T09:41:02.053Z" },
            updatedAt: { S: "2025-04-30T09:41:02.053Z" }
          }
        }
      },

      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#39" },
            SK: { S: "METADATA" },
            productId: { S: "39" },
            name: { S: "Soft Drinks" },
            description: { S: "Assorted soft drinks in various flavors, perfect for refreshing beverages." },
            brand: { S: "Generic" },
            category: { S: "groceries" },
            currency: { S: "USD" },
            price: { N: "1.99" },
            discountPercentage: { N: "17.48" },
            finalPrice: { N: "1.64" },
            rating: { M: { average: { N: "4.75" } } },
            stock: { N: "53" },
            sku: { S: "GRO-BRD-SOF-039" },
            images: { L: [{ S: "https://cdn.dummyjson.com/product-images/groceries/soft-drinks/1.webp" }] },
            thumbnail: { S: "https://cdn.dummyjson.com/product-images/groceries/soft-drinks/thumbnail.webp" },
            createdAt: { S: "2025-04-30T09:41:02.053Z" },
            updatedAt: { S: "2025-04-30T09:41:02.053Z" }
          }
        }
      },

      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#40" },
            SK: { S: "METADATA" },
            productId: { S: "40" },
            name: { S: "Strawberry" },
            description: { S: "Sweet and succulent strawberries, great for snacking or desserts." },
            brand: { S: "Generic" },
            category: { S: "groceries" },
            currency: { S: "USD" },
            price: { N: "3.99" },
            discountPercentage: { N: "1.12" },
            finalPrice: { N: "3.95" },
            rating: { M: { average: { N: "3.08" } } },
            stock: { N: "46" },
            sku: { S: "GRO-BRD-STR-040" },
            images: { L: [{ S: "https://cdn.dummyjson.com/product-images/groceries/strawberry/1.webp" }] },
            thumbnail: { S: "https://cdn.dummyjson.com/product-images/groceries/strawberry/thumbnail.webp" },
            createdAt: { S: "2025-04-30T09:41:02.053Z" },
            updatedAt: { S: "2025-04-30T09:41:02.053Z" }
          }
        }
      },

      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#41" },
            SK: { S: "METADATA" },
            productId: { S: "41" },
            name: { S: "Tissue Paper Box" },
            description: { S: "Convenient tissue paper box for everyday household use." },
            brand: { S: "Generic" },
            category: { S: "groceries" },
            currency: { S: "USD" },
            price: { N: "2.49" },
            discountPercentage: { N: "13.28" },
            finalPrice: { N: "2.16" },
            rating: { M: { average: { N: "2.69" } } },
            stock: { N: "86" },
            sku: { S: "GRO-BRD-TIS-041" },
            images: { L: [{ S: "https://cdn.dummyjson.com/product-images/groceries/tissue-paper-box/1.webp" }] },
            thumbnail: { S: "https://cdn.dummyjson.com/product-images/groceries/tissue-paper-box/thumbnail.webp" },
            createdAt: { S: "2025-04-30T09:41:02.053Z" },
            updatedAt: { S: "2025-04-30T09:41:02.053Z" }
          }
        }
      },

      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#42" },
            SK: { S: "METADATA" },
            productId: { S: "42" },
            name: { S: "Water" },
            description: { S: "Pure and refreshing bottled water for daily hydration." },
            brand: { S: "Generic" },
            category: { S: "groceries" },
            currency: { S: "USD" },
            price: { N: "0.99" },
            discountPercentage: { N: "14.92" },
            finalPrice: { N: "0.84" },
            rating: { M: { average: { N: "4.96" } } },
            stock: { N: "53" },
            sku: { S: "GRO-BRD-WAT-042" },
            images: { L: [{ S: "https://cdn.dummyjson.com/product-images/groceries/water/1.webp" }] },
            thumbnail: { S: "https://cdn.dummyjson.com/product-images/groceries/water/thumbnail.webp" },
            createdAt: { S: "2025-04-30T09:41:02.053Z" },
            updatedAt: { S: "2025-04-30T09:41:02.053Z" }
          }
        }
      },

      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#56" },
            SK: { S: "METADATA" },
            productId: { S: "56" },
            name: { S: "Electric Stove" },
            description: { S: "Portable electric stove ideal for compact kitchens." },
            brand: { S: "Generic" },
            category: { S: "kitchen-accessories" },
            currency: { S: "USD" },
            price: { N: "49.99" },
            discountPercentage: { N: "14.04" },
            finalPrice: { N: "42.97" },
            rating: { M: { average: { N: "4.11" } } },
            stock: { N: "21" },
            sku: { S: "KIT-BRD-ELE-056" },
            images: { L: [{ S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/1.webp" }] },
            thumbnail: { S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/thumbnail.webp" },
            createdAt: { S: "2025-04-30T09:41:02.053Z" },
            updatedAt: { S: "2025-04-30T09:41:02.053Z" }
          }
        }
      }
    ]
  }
};


const batch7 = {
  RequestItems: {
    EcommerceTable: [
      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#58" },
            SK: { S: "METADATA" },

            productId: { S: "58" },
            name: { S: "Fork" },
            category: { S: "kitchen-accessories" },
            sku: { S: "KIT-BRD-FOR-058" },

            description: { S: "Classic fork suitable for everyday dining and serving." },

            currency: { S: "INR" },
            price: { N: "331" },
            discountPercentage: { N: "8.07" },
            finalPrice: { N: "304" },

            stock: { N: "7" },

            dimensions: {
              M: {
                width: { N: "12.3" },
                height: { N: "25.91" },
                depth: { N: "22.57" },
                weight: { N: "9000" }
              }
            },

            rating: { M: { average: { N: "3.11" }, count: { N: "3" } } },

            images: { L: [{ S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/fork/1.webp" }] },
            thumbnail: { S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/fork/thumbnail.webp" },

            createdAt: { S: "2025-04-30T09:41:02.053Z" },
            updatedAt: { S: "2025-04-30T09:41:02.053Z" }
          }
        }
      },

      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#59" },
            SK: { S: "METADATA" },

            productId: { S: "59" },
            name: { S: "Glass" },
            category: { S: "kitchen-accessories" },
            sku: { S: "KIT-BRD-GLA-059" },

            description: { S: "Elegant glass suitable for various beverages." },

            currency: { S: "INR" },
            price: { N: "414" },
            discountPercentage: { N: "7.92" },
            finalPrice: { N: "381" },

            stock: { N: "46" },

            dimensions: {
              M: {
                width: { N: "20.23" },
                height: { N: "24.56" },
                depth: { N: "26.97" },
                weight: { N: "10000" }
              }
            },

            rating: { M: { average: { N: "4.02" }, count: { N: "3" } } },

            images: { L: [{ S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/glass/1.webp" }] },
            thumbnail: { S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/glass/thumbnail.webp" },

            createdAt: { S: "2025-04-30T09:41:02.053Z" },
            updatedAt: { S: "2025-04-30T09:41:02.053Z" }
          }
        }
      },

      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#60" },
            SK: { S: "METADATA" },

            productId: { S: "60" },
            name: { S: "Grater Black" },
            category: { S: "kitchen-accessories" },
            sku: { S: "KIT-BRD-GRA-060" },

            description: { S: "Handy black grater for cheese and vegetables." },

            currency: { S: "INR" },
            price: { N: "912" },
            discountPercentage: { N: "3.56" },
            finalPrice: { N: "879" },

            stock: { N: "84" },

            dimensions: {
              M: {
                width: { N: "6.32" },
                height: { N: "23.11" },
                depth: { N: "24.64" },
                weight: { N: "3000" }
              }
            },

            rating: { M: { average: { N: "3.21" }, count: { N: "3" } } },

            images: { L: [{ S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/grater-black/1.webp" }] },
            thumbnail: { S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/grater-black/thumbnail.webp" },

            createdAt: { S: "2025-04-30T09:41:02.053Z" },
            updatedAt: { S: "2025-04-30T09:41:02.053Z" }
          }
        }
      },

      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#61" },
            SK: { S: "METADATA" },

            productId: { S: "61" },
            name: { S: "Hand Blender" },
            category: { S: "kitchen-accessories" },
            sku: { S: "KIT-BRD-HAN-061" },

            description: { S: "Compact and powerful hand blender for everyday use." },

            currency: { S: "INR" },
            price: { N: "2904" },
            discountPercentage: { N: "17.02" },
            finalPrice: { N: "2409" },

            stock: { N: "84" },

            dimensions: {
              M: {
                width: { N: "27.31" },
                height: { N: "21" },
                depth: { N: "24.27" },
                weight: { N: "5000" }
              }
            },

            rating: { M: { average: { N: "3.86" }, count: { N: "3" } } },

            images: { L: [{ S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/1.webp" }] },
            thumbnail: { S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/thumbnail.webp" },

            createdAt: { S: "2025-04-30T09:41:02.053Z" },
            updatedAt: { S: "2025-04-30T09:41:02.053Z" }
          }
        }
      },

      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#62" },
            SK: { S: "METADATA" },

            productId: { S: "62" },
            name: { S: "Ice Cube Tray" },
            category: { S: "kitchen-accessories" },
            sku: { S: "KIT-BRD-CUB-062" },

            description: { S: "Ice cube tray for making uniform ice cubes." },

            currency: { S: "INR" },
            price: { N: "497" },
            discountPercentage: { N: "0.63" },
            finalPrice: { N: "494" },

            stock: { N: "13" },

            dimensions: {
              M: {
                width: { N: "26.67" },
                height: { N: "18.14" },
                depth: { N: "5.31" },
                weight: { N: "3000" }
              }
            },

            rating: { M: { average: { N: "4.71" }, count: { N: "3" } } },

            images: { L: [{ S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/ice-cube-tray/1.webp" }] },
            thumbnail: { S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/ice-cube-tray/thumbnail.webp" },

            createdAt: { S: "2025-04-30T09:41:02.053Z" },
            updatedAt: { S: "2025-04-30T09:41:02.053Z" }
          }
        }
      },

      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#63" },
            SK: { S: "METADATA" },

            productId: { S: "63" },
            name: { S: "Kitchen Sieve" },
            category: { S: "kitchen-accessories" },
            sku: { S: "KIT-BRD-KIT-063" },

            description: { S: "Fine mesh kitchen sieve for straining and sifting." },

            currency: { S: "INR" },
            price: { N: "664" },
            discountPercentage: { N: "18.91" },
            finalPrice: { N: "538" },

            stock: { N: "68" },

            dimensions: {
              M: {
                width: { N: "20.68" },
                height: { N: "6.5" },
                depth: { N: "7.86" },
                weight: { N: "5000" }
              }
            },

            rating: { M: { average: { N: "3.09" }, count: { N: "3" } } },

            images: { L: [{ S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/kitchen-sieve/1.webp" }] },
            thumbnail: { S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/kitchen-sieve/thumbnail.webp" },

            createdAt: { S: "2025-04-30T09:41:02.053Z" },
            updatedAt: { S: "2025-04-30T09:41:02.053Z" }
          }
        }
      },

      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#64" },
            SK: { S: "METADATA" },

            productId: { S: "64" },
            name: { S: "Knife" },
            category: { S: "kitchen-accessories" },
            sku: { S: "KIT-BRD-KNI-064" },

            description: { S: "Sharp kitchen knife for chopping and slicing." },

            currency: { S: "INR" },
            price: { N: "1245" },
            discountPercentage: { N: "18.86" },
            finalPrice: { N: "1010" },

            stock: { N: "7" },

            dimensions: {
              M: {
                width: { N: "25.19" },
                height: { N: "18.52" },
                depth: { N: "20.5" },
                weight: { N: "3000" }
              }
            },

            rating: { M: { average: { N: "3.26" }, count: { N: "3" } } },

            images: { L: [{ S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/knife/1.webp" }] },
            thumbnail: { S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/knife/thumbnail.webp" },

            createdAt: { S: "2025-04-30T09:41:02.053Z" },
            updatedAt: { S: "2025-04-30T09:41:02.053Z" }
          }
        }
      },

      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#65" },
            SK: { S: "METADATA" },

            productId: { S: "65" },
            name: { S: "Lunch Box" },
            category: { S: "kitchen-accessories" },
            sku: { S: "KIT-BRD-LUN-065" },

            description: { S: "Portable lunch box with compartments." },

            currency: { S: "INR" },
            price: { N: "1080" },
            discountPercentage: { N: "10.34" },
            finalPrice: { N: "969" },

            stock: { N: "94" },

            dimensions: {
              M: {
                width: { N: "12.45" },
                height: { N: "19.08" },
                depth: { N: "8.24" },
                weight: { N: "9000" }
              }
            },

            rating: { M: { average: { N: "4.93" }, count: { N: "3" } } },

            images: { L: [{ S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/lunch-box/1.webp" }] },
            thumbnail: { S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/lunch-box/thumbnail.webp" },

            createdAt: { S: "2025-04-30T09:41:02.053Z" },
            updatedAt: { S: "2025-04-30T09:41:02.053Z" }
          }
        }
      },

      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#66" },
            SK: { S: "METADATA" },

            productId: { S: "66" },
            name: { S: "Microwave Oven" },
            category: { S: "kitchen-accessories" },
            sku: { S: "KIT-BRD-MIC-066" },

            description: { S: "Compact microwave oven for quick cooking and reheating." },

            currency: { S: "INR" },
            price: { N: "7470" },
            discountPercentage: { N: "12.13" },
            finalPrice: { N: "6564" },

            stock: { N: "59" },

            dimensions: {
              M: {
                width: { N: "16.31" },
                height: { N: "27.45" },
                depth: { N: "13.05" },
                weight: { N: "9000" }
              }
            },

            rating: { M: { average: { N: "4.82" }, count: { N: "3" } } },

            images: {
              L: [
                { S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/microwave-oven/1.webp" },
                { S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/microwave-oven/2.webp" }
              ]
            },

            thumbnail: { S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/microwave-oven/thumbnail.webp" },

            createdAt: { S: "2025-04-30T09:41:02.053Z" },
            updatedAt: { S: "2025-04-30T09:41:02.053Z" }
          }
        }
      },

      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#67" },
            SK: { S: "METADATA" },

            productId: { S: "67" },
            name: { S: "Mug Tree Stand" },
            category: { S: "kitchen-accessories" },
            sku: { S: "KIT-BRD-TRE-067" },

            description: { S: "Space-saving stand for organizing mugs." },

            currency: { S: "INR" },
            price: { N: "1328" },
            discountPercentage: { N: "9.25" },
            finalPrice: { N: "1205" },

            stock: { N: "88" },

            dimensions: {
              M: {
                width: { N: "18.99" },
                height: { N: "27.14" },
                depth: { N: "27.29" },
                weight: { N: "3000" }
              }
            },

            rating: { M: { average: { N: "2.64" }, count: { N: "3" } } },

            images: {
              L: [
                { S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/mug-tree-stand/1.webp" }
              ]
            },

            thumbnail: { S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/mug-tree-stand/thumbnail.webp" },

            createdAt: { S: "2025-04-30T09:41:02.053Z" },
            updatedAt: { S: "2025-04-30T09:41:02.053Z" }
          }
        }
      },

      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#68" },
            SK: { S: "METADATA" },

            productId: { S: "68" },
            name: { S: "Pan" },
            category: { S: "kitchen-accessories" },
            sku: { S: "KIT-BRD-PRD-068" },

            description: { S: "Non-stick pan for frying and sautéing." },

            currency: { S: "INR" },
            price: { N: "2075" },
            discountPercentage: { N: "3" },
            finalPrice: { N: "2013" },

            stock: { N: "90" },

            dimensions: {
              M: {
                width: { N: "17.14" },
                height: { N: "21.7" },
                depth: { N: "25.75" },
                weight: { N: "8000" }
              }
            },

            rating: { M: { average: { N: "2.79" }, count: { N: "3" } } },

            images: { L: [{ S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/pan/1.webp" }] },
            thumbnail: { S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/pan/thumbnail.webp" },

            createdAt: { S: "2025-04-30T09:41:02.053Z" },
            updatedAt: { S: "2025-04-30T09:41:02.053Z" }
          }
        }
      },

      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#69" },
            SK: { S: "METADATA" },

            productId: { S: "69" },
            name: { S: "Plate" },
            category: { S: "kitchen-accessories" },
            sku: { S: "KIT-BRD-PLA-069" },

            description: { S: "Durable plate for serving meals." },

            currency: { S: "INR" },
            price: { N: "331" },
            discountPercentage: { N: "7.31" },
            finalPrice: { N: "307" },

            stock: { N: "66" },

            dimensions: {
              M: {
                width: { N: "16.46" },
                height: { N: "5.39" },
                depth: { N: "13.15" },
                weight: { N: "4000" }
              }
            },

            rating: { M: { average: { N: "3.65" }, count: { N: "3" } } },

            images: { L: [{ S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/plate/1.webp" }] },
            thumbnail: { S: "https://cdn.dummyjson.com/product-images/kitchen-accessories/plate/thumbnail.webp" },

            createdAt: { S: "2025-04-30T09:41:02.053Z" },
            updatedAt: { S: "2025-04-30T09:41:02.053Z" }
          }
        }
      }
    ]
  }
};

const batch2 = {
  RequestItems: {
    EcommerceTable: [

      // ---------- 43 ----------
      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#43" },
            SK: { S: "METADATA" },

            productId: { N: "43" },
            title: { S: "Decoration Swing" },
            category: { S: "home-decoration" },

            currency: { S: "INR" },
            price: { N: "14158" },
            discountPercentage: { N: "10" },
            finalPrice: { N: "12692" },

            stock: { N: "47" },
            rating: { N: "3" },

            sku: { S: "HOM-BRD-DEC-043" },
            availabilityStatus: { S: "In Stock" },

            weight_g: { N: "4000" }
          }
        }
      },

      // ---------- 44 ----------
      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#44" },
            SK: { S: "METADATA" },

            productId: { N: "44" },
            title: { S: "Family Tree Photo Frame" },
            category: { S: "home-decoration" },

            currency: { S: "INR" },
            price: { N: "7078" },
            discountPercentage: { N: "14" },
            finalPrice: { N: "6087" },

            stock: { N: "77" },
            rating: { N: "4" },

            sku: { S: "HOM-BRD-FAM-044" },
            availabilityStatus: { S: "In Stock" }
          }
        }
      },

      // ---------- 45 ----------
      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#45" },
            SK: { S: "METADATA" },

            productId: { N: "45" },
            title: { S: "House Showpiece Plant" },
            category: { S: "home-decoration" },

            currency: { S: "INR" },
            price: { N: "9438" },
            discountPercentage: { N: "7" },
            finalPrice: { N: "8778" },

            stock: { N: "28" },
            rating: { N: "4" },

            sku: { S: "HOM-BRD-HOU-045" }
          }
        }
      },

      // ---------- 46 ----------
      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#46" },
            SK: { S: "METADATA" },

            productId: { N: "46" },
            title: { S: "Plant Pot" },
            category: { S: "home-decoration" },

            currency: { S: "INR" },
            price: { N: "3538" },
            discountPercentage: { N: "6" },
            finalPrice: { N: "3326" },

            stock: { N: "59" },
            rating: { N: "3" },

            sku: { S: "HOM-BRD-PLA-046" }
          }
        }
      },

      // ---------- 47 ----------
      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#47" },
            SK: { S: "METADATA" },

            productId: { N: "47" },
            title: { S: "Table Lamp" },
            category: { S: "home-decoration" },

            currency: { S: "INR" },
            price: { N: "11786" },
            discountPercentage: { N: "7" },
            finalPrice: { N: "10961" },

            stock: { N: "9" },
            rating: { N: "3" },

            sku: { S: "HOM-BRD-TAB-047" }
          }
        }
      },

      // ---------- 48 ----------
      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#48" },
            SK: { S: "METADATA" },

            productId: { N: "48" },
            title: { S: "Bamboo Spatula" },
            category: { S: "kitchen-accessories" },

            currency: { S: "INR" },
            price: { N: "1886" },
            discountPercentage: { N: "2" },
            finalPrice: { N: "1848" },

            stock: { N: "37" },
            rating: { N: "3" },

            sku: { S: "KIT-BRD-BAM-048" }
          }
        }
      },

      // ---------- 49 ----------
      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#49" },
            SK: { S: "METADATA" },

            productId: { N: "49" },
            title: { S: "Black Aluminium Cup" },
            category: { S: "kitchen-accessories" },

            currency: { S: "INR" },
            price: { N: "1414" },
            discountPercentage: { N: "15" },
            finalPrice: { N: "1202" },

            stock: { N: "75" },
            rating: { N: "4" },

            sku: { S: "KIT-BRD-BLA-049" }
          }
        }
      },

      // ---------- 50 ----------
      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#50" },
            SK: { S: "METADATA" },

            productId: { N: "50" },
            title: { S: "Black Whisk" },
            category: { S: "kitchen-accessories" },

            currency: { S: "INR" },
            price: { N: "2358" },
            discountPercentage: { N: "10" },
            finalPrice: { N: "2122" },

            stock: { N: "73" },
            rating: { N: "3" },

            sku: { S: "KIT-BRD-BLA-050" }
          }
        }
      },

      // ---------- 51 ----------
      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#51" },
            SK: { S: "METADATA" },

            productId: { N: "51" },
            title: { S: "Boxed Blender" },
            category: { S: "kitchen-accessories" },

            currency: { S: "INR" },
            price: { N: "9438" },
            discountPercentage: { N: "7" },
            finalPrice: { N: "8778" },

            stock: { N: "9" },
            rating: { N: "4" },

            sku: { S: "KIT-BRD-BOX-051" }
          }
        }
      },

      // ---------- 52 ----------
      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#52" },
            SK: { S: "METADATA" },

            productId: { N: "52" },
            title: { S: "Carbon Steel Wok" },
            category: { S: "kitchen-accessories" },

            currency: { S: "INR" },
            price: { N: "7078" },
            discountPercentage: { N: "6" },
            finalPrice: { N: "6653" },

            stock: { N: "40" },
            rating: { N: "4" },

            sku: { S: "KIT-BRD-CAR-052" }
          }
        }
      },

      // ---------- 53 ----------
      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#53" },
            SK: { S: "METADATA" },

            productId: { N: "53" },
            title: { S: "Chopping Board" },
            category: { S: "kitchen-accessories" },

            currency: { S: "INR" },
            price: { N: "3062" },
            discountPercentage: { N: "8" },
            finalPrice: { N: "2817" },

            stock: { N: "14" },
            rating: { N: "3" },

            sku: { S: "KIT-BRD-CHO-053" }
          }
        }
      },

      // ---------- 54 ----------
      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#54" },
            SK: { S: "METADATA" },

            productId: { N: "54" },
            title: { S: "Citrus Squeezer Yellow" },
            category: { S: "kitchen-accessories" },

            currency: { S: "INR" },
            price: { N: "2122" },
            discountPercentage: { N: "12" },
            finalPrice: { N: "1867" },

            stock: { N: "22" },
            rating: { N: "4" },

            sku: { S: "KIT-BRD-CIT-054" }
          }
        }
      },

      // ---------- 55 ----------
      {
        PutRequest: {
          Item: {
            PK: { S: "PRODUCT#55" },
            SK: { S: "METADATA" },

            productId: { N: "55" },
            title: { S: "Egg Slicer" },
            category: { S: "kitchen-accessories" },

            currency: { S: "INR" },
            price: { N: "1650" },
            discountPercentage: { N: "14" },
            finalPrice: { N: "1419" },

            stock: { N: "40" },
            rating: { N: "3" },

            sku: { S: "KIT-BRD-SLI-055" }
          }
        }
      }

    ]
  }
};


async function run() {
  let request = batch2;

  while (true) {
    const command = new BatchWriteItemCommand(request);
    const response = await client.send(command);

    if (
      response.UnprocessedItems &&
      Object.keys(response.UnprocessedItems).length > 0
    ) {
      console.log("Retrying unprocessed items...");
      request = { RequestItems: response.UnprocessedItems };
    } else {
      console.log("Batch write successful");
      break;
    }
  }
}

run();

