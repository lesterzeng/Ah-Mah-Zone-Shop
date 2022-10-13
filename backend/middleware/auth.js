import jwt from "jsonwebtoken";

// export const auth = (req, res, next) => {
//   const authorization = req.headers.authorization;
//   if (authorization) {
//     const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
//     jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
//       if (err) {
//         res.status(401).send({ message: 'Invalid Token' });
//       } else {
//         req.user = decode;
//         next();
//       }
//     });
//   } else {
//     res.status(401).send({ message: 'No Token' });
//   }
// };

// export default auth;

export const auth = (req, res, next) => {
  console.log(`accessing auth middleware`);
  console.log(req.headers);
  try {
    const token = req.headers["authorization"].replace("Bearer ", "");
    if (token) {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.user = decoded;
      next();
    } else {
      return res.status(403).send({
        status: "error",
        message: "missing token",
      });
    }
  } catch (error) {
    return res.status(401).send({ status: "error", message: "unauthorized" });
  }
};

export default auth;
