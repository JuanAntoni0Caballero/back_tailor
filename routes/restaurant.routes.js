const router = require("express").Router();

const {
  createRestaurant,
  getAllRestaurant,
  getOneRestaurant,
  // editMarket,
  // deleteMarket,
} = require("../controllers/restaurant.controllers.js");

router.post("/createRestaurant", createRestaurant);
router.get("/getAllRestaurant", getAllRestaurant);
router.get("/getOneRestaurant/:restaurant_id", getOneRestaurant);
// router.put("/editMarket/:market_id", editMarket);
// router.delete("/deleteMarket/:market_id", deleteMarket);

module.exports = router;
