import bcrypt from "bcryptjs";

const itemsData = {
  users: [
    {
      name: "andy",
      email: "admin@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "bob",
      email: "bob@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Unqlop Earthism Shirt",
      slug: "unqlop-earthism-shirt",
      category: "Shirt",
      image: "/images/p1.jpeg",
      price: 120,
      countInStock: 10,
      brand: "Unqlop",
      rating: 4.5,
      numReviews: 10,
      description: "High Quality Warm Shirt",
    },
    {
      name: "Asahi Earthism Shirt",
      slug: "asahi-earthism-shirt",
      category: "Shirt",
      image: "/images/p2.jpeg",
      price: 160,
      countInStock: 0,
      brand: "Asahi",
      rating: 4.6,
      numReviews: 15,
      description: "High Quality Warm Shirt",
    },
    {
      name: "Unqlop Earthism Pants",
      slug: "unqlop-earthism-pants",
      category: "Pants",
      image: "/images/p3.jpeg",
      price: 100,
      countInStock: 19,
      brand: "Unqlop",
      rating: 4.2,
      numReviews: 14,
      description: "High Quality Warm Pants",
    },
    {
      name: "Asahi Earthism Pants",
      slug: "Asahi-earthism-pants",
      category: "Pants",
      image: "/images/p4.jpeg",
      price: 140,
      countInStock: 15,
      brand: "Asahi",
      rating: 4.2,
      numReviews: 11,
      description: "High Quality Warm Pants",
    },
  ],
};

export default itemsData;
