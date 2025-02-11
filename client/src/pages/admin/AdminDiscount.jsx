import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Modal, 
  MenuItem 
} from "@mui/material";
import {
  createDiscount,
  deleteDiscount,
  fetchDiscounts,
} from "@/store/extra-slice/discount";

const AdminDiscount = () => {
  const dispatch = useDispatch();
  const { discounts, loading, error, successMessage } = useSelector(
    (state) => state.discount
  );

  // Set up state with the keys that the backend expects.
  const [discountData, setDiscountData] = useState({
    name: "",
    discountType: "FIXED", // default value can be "FIXED" or "PERCENTAGE"
    discountValue: "",     // leave as empty string so user enters a number
    totalUsersAllowed: "", // same as above
    startDate: "",
    endDate: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    dispatch(fetchDiscounts());
  }, [dispatch]);

  // Generic change handler to update the state.
  const handleChange = (e) => {
    setDiscountData({
      ...discountData,
      [e.target.name]: e.target.value,
    });
  };

  // Call createDiscount with the discountData object.
  const handleCreateDiscount = async () => {
    setIsCreating(true);
    await dispatch(createDiscount(discountData));
    setIsCreating(false);
    // Reset the form fields after creation
    setDiscountData({
      name: "",
      discountType: "FIXED",
      discountValue: "",
      totalUsersAllowed: "",
      startDate: "",
      endDate: "",
    });
    setOpenModal(false);
  };

  const handleDeleteDiscount = (id) => {
    dispatch(deleteDiscount(id));
  };

  return (
    <motion.div
      className="p-6 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        className="text-center text-gray-800 dark:text-white font-bold"
      >
        Admin Discount Management
      </Typography>

      {/* Button to open the modal */}
      <Button
        onClick={() => setOpenModal(true)}
        variant="contained"
        fullWidth
        className="bg-blue-500 text-white hover:bg-blue-600 mt-4"
      >
        Create New Discount
      </Button>

      {/* Success and error messages */}
      {successMessage && (
        <Typography variant="body1" className="text-green-500 text-center">
          {successMessage}
        </Typography>
      )}
      {error && (
        <Typography variant="body1" className="text-red-500 text-center">
          {error}
        </Typography>
      )}

      {/* Discount List */}
      <Box className="space-y-4 mt-6">
        {loading ? (
          <Typography variant="body1" className="text-center">
            Loading Discounts...
          </Typography>
        ) : (
          discounts.map((discount) => (
            <motion.div
              key={discount._id}
              className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm dark:bg-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography className="text-gray-800 dark:text-white">
                {discount.name} —{" "}
                {discount.discountType === "FIXED"
                  ? `$${discount.discountValue}`
                  : `${discount.discountValue}%`}{" "}
                — Allowed: {discount.totalUsersAllowed}
              </Typography>
              <Button
                onClick={() => handleDeleteDiscount(discount._id)}
                variant="contained"
                color="error"
                size="small"
              >
                Delete
              </Button>
            </motion.div>
          ))
        )}
      </Box>

      {/* Modal for Creating Discounts */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        className="flex justify-center items-center"
      >
        <motion.div
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-lg w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h5"
            className="text-center text-gray-800 dark:text-white mb-4"
          >
            Create New Discount
          </Typography>
          <Box className="space-y-4">
            <TextField
              label="Discount Name"
              variant="outlined"
              fullWidth
              name="name"
              value={discountData.name}
              onChange={handleChange}
              className="dark:bg-gray-700"
            />
            <TextField
              select
              label="Discount Type"
              variant="outlined"
              fullWidth
              name="discountType"
              value={discountData.discountType}
              onChange={handleChange}
              className="dark:bg-gray-700"
            >
              <MenuItem value="FIXED">Fixed</MenuItem>
              <MenuItem value="PERCENTAGE">Percentage</MenuItem>
            </TextField>
            <TextField
              label="Discount Value"
              variant="outlined"
              fullWidth
              name="discountValue"
              value={discountData.discountValue}
              onChange={handleChange}
              type="number"
              className="dark:bg-gray-700"
            />
            <TextField
              label="Total Users Allowed"
              variant="outlined"
              fullWidth
              name="totalUsersAllowed"
              value={discountData.totalUsersAllowed}
              onChange={handleChange}
              type="number"
              className="dark:bg-gray-700"
            />
            <TextField
              label="Start Date"
              variant="outlined"
              fullWidth
              name="startDate"
              value={discountData.startDate}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              className="dark:bg-gray-700"
            />
            <TextField
              label="End Date"
              variant="outlined"
              fullWidth
              name="endDate"
              value={discountData.endDate}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              className="dark:bg-gray-700"
            />
            <Button
              onClick={handleCreateDiscount}
              disabled={isCreating}
              variant="contained"
              fullWidth
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              {isCreating ? "Creating..." : "Create Discount"}
            </Button>
          </Box>
        </motion.div>
      </Modal>
    </motion.div>
  );
};

export default AdminDiscount;
