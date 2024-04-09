const router = require("express").Router();
console.log('index.routes')

router.get("/", (req, res, next) => {
  res.json("All good in here");
});
const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const restaurantRoutes = require("./restaurant.routes");
router.use("/restaurant", restaurantRoutes);

module.exports = router;