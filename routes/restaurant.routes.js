const router = require("express").Router();

const {
  createRestaurant,
  // getOneMarket,
  // getAllMarkets,
  // editMarket,
  // deleteMarket,
} = require("../controllers/restaurant.controllers.js");

router.post("/createRestaurant", createRestaurant);
// router.get("/getOneMarket/:market_id", getOneMarket);
// router.put("/editMarket/:market_id", editMarket);
// router.get("/getMarkets", getAllMarkets);
// router.delete("/deleteMarket/:market_id", deleteMarket);

module.exports = router;
