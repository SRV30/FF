import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.json({ success: false, message: "Please login again" });
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedData;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default auth;
