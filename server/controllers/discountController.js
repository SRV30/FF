import DiscountModel from "../models/discountModel.js";

// Admin
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

    if (
      !name ||
      !discountType ||
      !discountValue ||
      !totalUsersAllowed ||
      !startDate ||
      !endDate
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!["FIXED", "PERCENTAGE"].includes(discountType)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid discount type" });
    }

    if (discountValue <= 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Discount value must be greater than 0",
        });
    }

    const newDiscount = new DiscountModel({
      name,
      discountType,
      discountValue,
      applicableProducts,
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

    if (!userId || !originalPrice) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User ID and original price are required",
        });
    }

    const discount = await DiscountModel.findOne({
      $or: [
        { applicableProducts: productId },
        { applicableProducts: { $eq: [] } },
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

    let discountAmount =
      discount.discountType === "FIXED"
        ? discount.discountValue
        : (originalPrice * discount.discountValue) / 100;

    discountAmount = Math.min(discountAmount, originalPrice);
    const newPrice = Math.max(originalPrice - discountAmount, 0);

    const updatedDiscount = await DiscountModel.findById(discount._id);
    if (updatedDiscount.usedBy.length >= updatedDiscount.totalUsersAllowed) {
      updatedDiscount.isActive = false;
      await updatedDiscount.save();
      return res
        .status(400)
        .json({ success: false, message: "Discount limit reached" });
    }

    updatedDiscount.usedBy.push(userId);
    await updatedDiscount.save();

    return res.status(200).json({
      success: true,
      message: "Discount Applied Successfully!",
      discount: {
        name: updatedDiscount.name,
        type: updatedDiscount.discountType,
        value: updatedDiscount.discountValue,
      },
      discountAmount,
      newPrice,
    });
  } catch (error) {
    console.error("Error applying discount:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Admin
export const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await DiscountModel.find().populate(
      "applicableProducts",
      "name price"
    );
    res.status(200).json({ success: true, discounts });
  } catch (error) {
    console.error("Error fetching discounts:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Admin
export const deleteDiscount = async (req, res) => {
  try {
    const { discountId } = req.params;

    if (!discountId) {
      return res
        .status(400)
        .json({ success: false, message: "Discount ID is required" });
    }

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
