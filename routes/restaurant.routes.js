const router = require("express").Router();

const {
  createRestaurant,
  getAllRestaurant,
  getOneRestaurant,
  editRestaurant,
  deleteRestaurant,
  likedRestaurant,
  unLikedRestaurant
} = require("../controllers/restaurant.controllers.js");

router.post("/createRestaurant", createRestaurant);
router.get("/getAllRestaurant", getAllRestaurant);
router.get("/getOneRestaurant/:restaurant_id", getOneRestaurant);
router.put("/editRestaurant/:restaurant_id", editRestaurant);
router.delete("/deleteRestaurant/:restaurant_id", deleteRestaurant);
router.post("/likedRestaurant/:restaurant_id/:user_id", likedRestaurant);
router.post("/unlikedRestaurant/:restaurant_id/:user_id", unLikedRestaurant);

module.exports = router;
