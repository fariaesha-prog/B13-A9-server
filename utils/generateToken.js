import jwt from "jsonwebtoken";

const generateToken = (res, user) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );

  // store token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return token;
};

export default generateToken;