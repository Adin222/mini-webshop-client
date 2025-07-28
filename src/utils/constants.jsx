export const Navigation = (is_auth) => {
  return {
    categories: [
      {
        id: "categories",
        name: "categories",
        featured: [
          {
            name: "Handymans best friend",
            href: "#",
            imageSrc:
              "https://libraryofthings-images.s3.eu-west-2.amazonaws.com/things/drill-cordless-hands-1080x720.jpg",
            imageAlt:
              "Models sitting back to back, wearing Basic Tee in black and bone.",
          },
          {
            name: "Accessories with class",
            href: "#",
            imageSrc:
              "https://jacques-lemans.b-cdn.net/media/d2/e6/c9/1708678424/Mens-watches_Hybromatic_02-2024.webp?width=3000",
            imageAlt:
              "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
          },
        ],
        sections: [
          {
            id: "clothing",
            name: "clothing",
            items: [
              { name: "Tops", href: "#" },
              { name: "Dresses", href: "#" },
              { name: "Pants", href: "#" },
              { name: "Denim", href: "#" },
              { name: "Sweaters", href: "#" },
              { name: "T-Shirts", href: "#" },
            ],
          },
          {
            id: "accessories",
            name: "accessories",
            items: [
              { name: "Watches", href: "#" },
              { name: "Wallets", href: "#" },
              { name: "Bags", href: "#" },
              { name: "Sunglasses", href: "#" },
              { name: "Hats", href: "#" },
              { name: "Belts", href: "#" },
            ],
          },
          {
            id: "tools",
            name: "tools",
            items: [
              { name: "Full Nelson", href: "#" },
              { name: "My Way", href: "#" },
              { name: "Re-Arranged", href: "#" },
              { name: "Counterfeit", href: "#" },
              { name: "Significant Other", href: "#" },
            ],
          },
          {
            id: "technology",
            name: "technology",
            items: [
              { name: "Full Nelson", href: "#" },
              { name: "My Way", href: "#" },
              { name: "Re-Arranged", href: "#" },
              { name: "Counterfeit", href: "#" },
              { name: "Significant Other", href: "#" },
            ],
          },
        ],
      },
    ],
    pages: [],
  };
};

export const categoryOptions = {
  Technology: ["Smartphones", "Laptops", "Other"],
  Clothing: ["T-Shirts", "Jeans", "Other"],
  Accessories: ["Bags & Backpacks", "Watches", "Other"],
  Tools: ["Hand Tools", "Power Tools", "Other"],
};

export const productFields = [
  "product_name",
  "price",
  "description",
  "sub_category",
  "category",
];
