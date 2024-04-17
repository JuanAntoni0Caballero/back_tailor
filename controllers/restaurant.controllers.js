const Restaurant = require('../models/Restaurant.model');
const fs = require('fs');
const User = require('../models/User.model');
const { verify } = require('./auth.controllers')


const createRestaurant = async (req, res, next) => {
  const { restaurantData } = req.body;
  try {
    const newRestaurant = await Restaurant.create(restaurantData);
    if (newRestaurant) {
      res.status(201).json({ newRestaurant });
    }
  } catch (error) {
    console.error("Error durante la creación del restaurante:", error);
    res.status(500).json({
      errorMessages: ["Error desconocido durante la creación del restaurante."],
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
    console.error('Error al recuperar los datos de los restaurantes:', error);
    res.status(500).json({
      errorMessages: ['Error desconocido durante la recuperación de restaurantes.'],
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
      errorMessages: ['Error desconocido durante la recuperación del restaurante.'],
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

const editRestaurant = async (req, res, next) => {
  const { restaurant_id } = req.params
  const updateRestaurantData = req.body
  //Fake response to edit restaurant
  res.status(201).json('Restaurante Editado')
  // try {
  //   const restaurant = await Restaurant.findByIdAndUpdate(restaurant_id, updateRestaurantData, {
  //     new: true
  //   });
  //   if (restaurant) {
  //     res.status(201).json({ restaurant });
  //   }
  // } catch (error) {
  //   console.error("Error durante la edición del restaurant:", error);
  //   res.status(500).json({
  //     errorMessages: ["Error desconocido durante la edición del restaurante."],
  //   });
  // }
};


const deleteRestaurant = async (req, res, next) => {
  const { restaurant_id } = req.params;

  try {
    await Restaurant.findByIdAndDelete(restaurant_id);
    res.status(201).json({ message: ["restaurant eliminado correctamente"] });
  } catch {
    console.error("Error al eliminar el restaurante", error);
    res.status(500).json({
      errorMessages: ["Error desconocido durante la eliminación del restaurante."],
    });
  }
};

const likedRestaurant = async (req, res, next) => {
  const { restaurant_id, user_id } = req.params;
  try {
    const user = await User.findById(user_id);
    if (user) {
      const restaurantId = parseInt(restaurant_id);
      if (!isNaN(restaurantId)) {
        user.favoritedRestaurants.push(restaurantId);
        await user.save();
      } else {
        throw new Error("restaurant_id no es un número válido");
      }
    }
  } catch (error) {
    console.error("Error al dar like al restaurant", error);
    res.status(500).json({
      errorMessages: ["Error desconocido durante daba like al restaurante."],
    });
  }
}

const unLikedRestaurant = async (req, res, next) => {
  const { restaurant_id, user_id } = req.params;
  const restaurantId = parseInt(restaurant_id);

  try {
    const user = await User.findById(user_id);
    if (user) {
      const restaurantId = parseInt(restaurant_id);
      if (!isNaN(restaurantId)) {
        const index = user.favoritedRestaurants.indexOf(restaurantId);
        if (index !== -1) {
          user.favoritedRestaurants.splice(index, 1);
          await user.save();
        } else {
          console.log("El restaurante no está en la lista de favoritos del usuario");
        }
      } else {
        throw new Error("restaurant_id no es un número válido");
      }
    }
  } catch (error) {
    console.error("Error al eliminar el like al restaurant", error);
    res.status(500).json({
      errorMessages: ["Error desconocido durante la eliminacion del like al restaurante."],
    });
  }
}



module.exports = {
  createRestaurant,
  getAllRestaurant,
  getOneRestaurant,
  editRestaurant,
  deleteRestaurant,
  likedRestaurant,
  unLikedRestaurant
};
