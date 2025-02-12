import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getProductByFilter } from "@/store/product-slice/productSlice";
import MetaData from "../extras/MetaData";
import {
  CircularProgress,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Search } from "lucide-react";
import { debounce } from "lodash";
import { deleteProduct } from "@/store/product-slice/AdminProduct";

const AdminProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [productData, setProductData] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    product = [],
    loading,
    error,
    totalPages,
  } = useSelector((state) => state.product);

  const { products = [] } = useSelector((state) => state.adminProduct);

  const debouncedSearch = debounce((query) => {
    dispatch(getProductByFilter({ page: 1, limit: 10, searchQuery: query }));
    setPage(1);
  }, 500);

  useEffect(() => {
    dispatch(getProductByFilter({ page, limit: 10, searchQuery }));
  }, [dispatch, page, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
      .unwrap()
      .then(() => {
        setOpenDeleteDialog(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error deleting product:", err);
      });
  };

  const handleUpdate = (id) => {
    // You can set product data for editing
    setProductData(product.find((p) => p._id === id));
    navigate(`/admin/product/update/${id}`);
  };

  const handleDialogClose = () => {
    setOpenDeleteDialog(false);
    setDeleteProductId(null);
  };

  const handleDeleteDialogOpen = (id) => {
    setDeleteProductId(id);
    setOpenDeleteDialog(true);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <MetaData title="Admin | All Products" />

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-blue-600 mb-6"
      >
        Admin - Product List
      </motion.h2>

      <button
        className="bg-yellow-500 dark:bg-red-600 px-10 py-2 mb-5 rounded-full text-white cursor-pointer"
        onClick={() => {
          navigate("/admin/create/product");
        }}
      >
        Create Product
      </button>

      <div className="mb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-2"
        >
          <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full ml-2 bg-transparent focus:outline-none text-black dark:text-white"
            placeholder="Search for products..."
          />
        </motion.div>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="overflow-x-auto"
          >
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="p-4 text-left">Image</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Category</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">Stock</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {product.length > 0 ? (
                  product.map((prod) => (
                    <motion.tr
                      key={prod._id}
                      whileHover={{ scale: 1.02 }}
                      className="border-b hover:bg-gray-100 transition"
                    >
                      <td className="p-4">
                        <img
                          src={prod.images[0]?.url || "/default-product.png"}
                          alt={prod.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </td>
                      <td className="p-4">{prod.name}</td>
                      <td className="p-4">{prod.category}</td>
                      <td className="p-4 text-green-600 font-bold">
                        ₹{prod.price}
                      </td>
                      <td className="p-4 text-blue-500">{prod.stock}</td>
                      <td className="p-4 text-center">
                        <Link
                          to={`/admin/product/update/${prod._id}`}
                          className="text-blue-500 hover:underline mr-4"
                          onClick={() => handleUpdate(prod._id)}
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteDialogOpen(prod._id)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-500 p-4">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex justify-center mt-6">
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
              />
            </div>
          </motion.div>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDialogClose}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this product?</p>
        </DialogContent>
        <DialogActions>
          <button onClick={handleDialogClose} className="text-gray-600">
            Cancel
          </button>
          <button
            onClick={() => handleDelete(deleteProductId)}
            className="text-red-600"
          >
            Delete
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
