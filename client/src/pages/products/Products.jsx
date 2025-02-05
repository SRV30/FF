import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaShoppingCart } from "react-icons/fa";
import { AiFillStar, AiOutlineStar, AiOutlineHeart } from "react-icons/ai";
import { getProducts } from "@/store/auth-slice/productSlice";

const Product = () => {
  const dispatch = useDispatch();
  const { product, loadingCategory, error } = useSelector((state) => state.product);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    dispatch(getProducts({ page, limit }));
  }, [dispatch, page]);

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4 bg-white dark:bg-gray-900 text-black dark:text-white">Product List</h1>
      {loadingCategory && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-white dark:bg-gray-900 text-black dark:text-white">
        {product.map((item) => (
          <div key={item._id} className=" shadow-lg rounded-lg overflow-hidden border relative bg-white dark:bg-gray-900 text-black dark:text-white">
            <img src={item.images[0]?.url} alt={item.name} className="w-full h-52 object-cover" />
            <button className="absolute top-2 right-2 p-2 bg-red-500 rounded-full shadow-md">
              <AiOutlineHeart size={20} />
            </button>
            <div className="p-4 bg-white dark:bg-gray-900 text-black dark:text-white">
              <h2 className="text-lg font-semibold bg-white dark:bg-gray-900 text-black dark:text-white">{item.name}</h2>
              <p className="text-sm  bg-white dark:bg-gray-900 text-black dark:text-white">{item.category?.name}</p>
              <div className="flex items-center  my-2 bg-white dark:bg-gray-900 text-black dark:text-white">
                {[...Array(5)].map((_, i) => (
                  i < item.ratings ? <AiFillStar key={i} /> : <AiOutlineStar key={i} />
                ))}
                <span className=" text-sm ml-2 bg-white dark:bg-gray-900 text-black dark:text-white">({item.numOfReviews} reviews)</span>
              </div>
              <p className="text-sm  bg-white dark:bg-gray-900 text-black dark:text-white">Description: {item.description}</p>
              <p className="text-sm  bg-white dark:bg-gray-900 text-black dark:text-white">Gender: {item.gender}</p>
              <p className="text-xl font-bold  bg-white dark:bg-gray-900 text-black dark:text-white">
                ₹{(item.price - (item.price * (item.discount / 100))).toFixed(2)}
                {item.discount > 0 && (
                  <span className="text-sm  line-through ml-2 bg-white dark:bg-gray-900 text-black dark:text-white">₹{item.price.toFixed(2)}</span>
                )}
              </p>
              <button className="mt-3 w-full bg-red-500 text-white flex items-center justify-center py-2 rounded-lg hover:bg-red-600">
                <FaShoppingCart className="mr-2" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6 bg-white dark:bg-gray-900 text-black dark:text-white">
        <button 
          className="px-4 py-2   rounded disabled:opacity-50 bg-white dark:bg-gray-900 text-black dark:text-white" 
          disabled={page === 1} 
          onClick={() => setPage((prev) => prev - 1)}>
          Prev
        </button>
        <span className="mx-4 bg-white dark:bg-gray-900 text-black dark:text-white">Page {page}</span>
        <button 
          className="px-4 py-2  rounded bg-white dark:bg-gray-900 text-black dark:text-white" 
          onClick={() => setPage((prev) => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;
