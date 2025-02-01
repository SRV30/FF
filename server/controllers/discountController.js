import DiscountModel from "../models/discountModel.js";
import UserModel from "../models/userModel.js";

// create discount - admin
export const createDiscount = async (req, res) => {
  try {
    const {
      name,
      discountType,
      discountValue,
      applicableProducts,
      totalUsersAllowed,
      startDate,
      endDate,
    } = req.body;

    const newDiscount = new DiscountModel({
      name,
      discountType,
      discountValue,
      applicableProducts: applicableProducts || [],
      totalUsersAllowed,
      startDate,
      endDate,
    });

    await newDiscount.save();
    res.status(201).json({
      success: true,
      message: "Discount Created Successfully",
      discount: newDiscount,
    });
  } catch (error) {
    console.error("Error creating discount:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const applyDiscount = async (req, res) => {
  try {
    const { userId, productId, originalPrice } = req.body;

    const discount = await DiscountModel.findOne({
      $or: [
        { applicableProducts: productId },
        { applicableProducts: { $size: 0 } },
      ],
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() },
      isActive: true,
    });

    if (!discount) {
      return res
        .status(400)
        .json({ success: false, message: "No active discount found" });
    }

    if (discount.usedBy.includes(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "User already used this discount" });
    }

    if (discount.usedBy.length >= discount.totalUsersAllowed) {
      discount.isActive = false;
      await discount.save();
      return res
        .status(400)
        .json({ success: false, message: "Discount limit reached" });
    }

    let discountAmount = 0;
    if (discount.discountType === "FIXED") {
      discountAmount = discount.discountValue;
    } else if (discount.discountType === "PERCENTAGE") {
      discountAmount = (originalPrice * discount.discountValue) / 100;
    }

    const newPrice = Math.max(originalPrice - discountAmount, 0);

    discount.usedBy.push(userId);
    await discount.save();

    return res.status(200).json({
      success: true,
      message: "Discount Applied Successfully!",
      discountAmount,
      newPrice,
    });
  } catch (error) {
    console.error("Error applying discount:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// get all discount - admin
export const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await DiscountModel.find();
    res.status(200).json({ success: true, discounts });
  } catch (error) {
    console.error("Error fetching discounts:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// DELETE DISCOUNT (Admin)
export const deleteDiscount = async (req, res) => {
  try {
    const { discountId } = req.params;

    const discount = await DiscountModel.findByIdAndDelete(discountId);
    if (!discount) {
      return res
        .status(404)
        .json({ success: false, message: "Discount not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Discount Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting discount:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
