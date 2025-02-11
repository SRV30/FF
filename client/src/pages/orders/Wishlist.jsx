import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteWishListItem, getWishListItems } from "@/store/add-to-wishList/addToWishList";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { WishListItems, loading, error } = useSelector((state) => state.wishList);

  useEffect(() => {
    dispatch(getWishListItems());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-yellow-500 dark:text-red-500 mb-4">
        My Wishlist
      </h1>
      {loading && <p className="text-gray-500">Loading wishlist...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {WishListItems.length === 0 ? (
          <p className="text-gray-600">Your wishlist is empty.</p>
        ) : (
          WishListItems.map((item) => (
            <motion.div
              key={item.productId._id}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-xl font-semibold">{item.productId.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">{item.productId.description}</p>
              <img src={item.productId.images[0].url} alt={item.productId.name}></img>
              <Button
                startIcon={<DeleteIcon />}
                onClick={() => dispatch(deleteWishListItem(item._id))}
                className="mt-2 bg-red-500 text-white dark:bg-yellow-500"
              >
                Remove
              </Button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
