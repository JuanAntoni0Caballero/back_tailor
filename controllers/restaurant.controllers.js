const Restaurant = require('../models/Restaurant.model');
const fs = require('fs');


const createRestaurant = async (req, res, next) => {
  const { restaurantData } = req.body;
  console.log('restaurantData ==>', restaurantData)
  try {
    const newRestaurant = await Restaurant.create(restaurantData);
    if (newRestaurant) {
      res.status(201).json({ newRestaurant });
    }
  } catch (error) {
    console.error("Error durante la creación del restaurant:", error);
    res.status(500).json({
      errorMessages: ["Error desconocido durante la creación del restaurant."],
    });
  }
};

const getAllRestaurant = async (req, res, next) => {
  try {
    fs.readFile('api/restaurants.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo JSON:', err);
        res.status(500).json({
          errorMessages: ['Error al leer el archivo JSON.'],
        });
        return;
      }
      const restaurants = JSON.parse(data);
      res.status(200).json(restaurants);
    });
  } catch (error) {
    console.error('Error al recuperar los datos de los restaurants:', error);
    res.status(500).json({
      errorMessages: ['Error desconocido durante la recuperación de restaurants.'],
    });
  }
};

const getOneRestaurant = async (req, res, next) => {
  const { restaurant_id } = req.params;
  try {
    fs.readFile('api/restaurants.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo JSON:', err);
        res.status(500).json({
          errorMessages: ['Error al leer el archivo JSON.'],
        });
        return;
      }
      const restaurants = JSON.parse(data);
      const restaurant = restaurants.find(restaurant => restaurant.id == restaurant_id);
      if (restaurant) {
        res.status(200).json({ restaurant });
      } else {
        res.status(404).json({
          errorMessages: ['Restaurante no encontrado.'],
        });
      }
    });
  } catch (error) {
    console.error('Error al recuperar el restaurant', error);
    res.status(500).json({
      errorMessages: ['Error desconocido durante la recuperación del restaurant.'],
    });
  }
};

// const getAllRestaurant = async (req, res, next) => {
//   try {
//     const restaurants = await Restaurant.find();
//     if (!restaurants) {
//       console.error("Error al recuperar los datos de los restaurants:", error);
//     }
//     res.status(201).json(restaurants);
//   } catch (error) {
//     console.error("Error al recuperar los datos de los restaurants:", error);
//     res.status(500).json({
//       errorMessages: ["Error desconocido durante la recuperación de restaurants."],
//     });
//   }
// };

// const editMarket = async (req, res, next) => {
//   const { market_id } = req.params
//   const updateMarketData = req.body
//   try {
//     const market = await Market.findByIdAndUpdate(market_id, updateMarketData, {
//       new: true
//     });
//     if (market) {
//       res.status(201).json({ market });
//     }
//   } catch (error) {
//     console.error("Error durante la edición del market:", error);
//     res.status(500).json({
//       errorMessages: ["Error desconocido durante la edición del market."],
//     });
//   }
// };





// const deleteMarket = async (req, res, next) => {
//   const { market_id } = req.params;

//   try {
//     await Market.findByIdAndDelete(market_id);
//     res.status(201).json({ message: ["Market eliminado correctamente"] });
//   } catch {
//     console.error("Error al eliminar el market", error);
//     res.status(500).json({
//       errorMessages: ["Error desconocido durante la eliminación del market."],
//     });
//   }
// };

module.exports = {
  createRestaurant,
  getAllRestaurant,
  getOneRestaurant,
  // editMarket,
  // deleteMarket,
};
