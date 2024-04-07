const router = require("express").Router();

const {
  createMarkets,
  getOneMarket,
  getAllMarkets,
  editMarket,
  deleteMarket,
} = require("../controllers/market.controllers.js");

router.post("/createMarkets", createMarkets);
router.get("/getOneMarket/:market_id", getOneMarket);
router.put("/editMarket/:market_id", editMarket);
router.get("/getMarkets", getAllMarkets);
router.delete("/deleteMarket/:market_id", deleteMarket);

module.exports = router;
