import React, { useEffect, useState } from "react";
import { MapPin, PlusCircle, Trash2, Edit2, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { userAddress, updateUserAddress, deleteUserAddress, addUserAddress } from "@/store/address-slice/addressSlice";
import { toast } from "react-toastify";

const SavedAddress = () => {
  const dispatch = useDispatch();
  const { address, loading, error } = useSelector((state) => state.address);

  const [editData, setEditData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    mobile: "",
  });

  useEffect(() => {
    dispatch(userAddress());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openEditModal = (item) => {
    setEditData(item);
    setFormData({
      address_line: item.address_line,
      city: item.city,
      state: item.state,
      pincode: item.pincode,
      mobile: item.mobile,
    }); // Pre-fill form with the existing data
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setFormData({ address_line: "", city: "", state: "", pincode: "", mobile: "" });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    
    if (!editData?._id) {
      toast.error("Address ID is missing. Cannot update.");
      return;
    }

    const updatedData = { ...formData, _id: editData._id };
    dispatch(updateUserAddress(updatedData))
      .unwrap()
      .then(() => {
        toast.success("Address updated successfully!");
        closeEditModal();
      })
      .catch((err) => toast.error(err.message || "Failed to update address"));
  };

  const handleDelete = (_id) => {
    if (!_id) {
      toast.error("Address ID is missing. Cannot delete.");
      return;
    }

    dispatch(deleteUserAddress(_id))
      .unwrap()
      .then(() => toast.success("Address deleted successfully!"))
      .catch((err) => toast.error(err.message || "Failed to delete address"));
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    dispatch(addUserAddress(formData))
      .unwrap()
      .then(() => {
        toast.success("Address added successfully!");
        setIsAdding(false);
        setFormData({ address_line: "", city: "", state: "", pincode: "", mobile: "" });
      })
      .catch((err) => toast.error(err.message || "Failed to add address"));
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
      <div className="mx-auto max-w-4xl rounded-lg shadow-lg bg-white p-6 dark:bg-gray-800 dark:text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Saved Addresses</h1>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
          >
            <PlusCircle size={18} />
            <span>Add New Address</span>
          </button>
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error.message}</p>}

        <div className="space-y-4">
          {address?.length > 0 ? (
            address.map((item) => (
              <div key={item._id} className="flex justify-between items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div>
                  <h2 className="text-lg font-semibold flex items-center space-x-2">
                    <MapPin size={18} className="text-blue-500" />
                    <span>{item.address_line}</span>
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    {item.city}, {item.state}, {item.pincode}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => openEditModal(item)} className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No addresses found.</p>
          )}
        </div>
      </div>

      {/* Add Address Modal */}
      {isAdding && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full sm:w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Address</h2>
              <button onClick={() => setIsAdding(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddAddress} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Address Line</label>
                <input
                  type="text"
                  name="address_line"
                  value={formData.address_line}
                  onChange={handleChange}
                  placeholder="Enter Address Line"
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter City"
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter State"
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Enter Pincode"
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
                  required
                />
              </div>

              <button type="submit" className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                Add Address
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Address Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full sm:w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Address</h2>
              <button onClick={() => closeEditModal()} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Address Line</label>
                <input
                  type="text"
                  name="address_line"
                  value={formData.address_line}
                  onChange={handleChange}
                  placeholder="Enter Address Line"
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter City"
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter State"
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Enter Pincode"
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
                  required
                />
              </div>

              <button type="submit" className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                Update Address
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedAddress;
