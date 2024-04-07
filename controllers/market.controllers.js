const Market = require('../models/Market.model')

const createMarkets = async (req, res, next) => {
  const { marketData } = req.body;
  console.log('marketData ==>', marketData.shippingCost.secondaryCountries)
  try {
    const newMarket = await Market.create(marketData);
    if (newMarket) {
      console.log('newMarket ==>', newMarket)
      res.status(201).json({ newMarket });
    }
  } catch (error) {
    console.error("Error durante la creación del market:", error);
    res.status(500).json({
      errorMessages: ["Error desconocido durante la creación del market."],
    });
  }
};

const editMarket = async (req, res, next) => {
  const { market_id } = req.params
  const updateMarketData = req.body
  try {
    const market = await Market.findByIdAndUpdate(market_id, updateMarketData, {
      new: true
    });
    if (market) {
      res.status(201).json({ market });
    }
  } catch (error) {
    console.error("Error durante la edición del market:", error);
    res.status(500).json({
      errorMessages: ["Error desconocido durante la edición del market."],
    });
  }
};

const getOneMarket = async (req, res, next) => {
  const { market_id } = req.params;
  try {
    const market = await Market.findById(market_id);
    res.status(201).json(market);
  } catch (error) {
    console.error("Error al recuperar el market", error);
    res.status(500).json({
      errorMessages: ["Error desconocido durante la recuperación del market."],
    });
  }
};

const getAllMarkets = async (req, res, next) => {
  try {
    const markets = await Market.find();
    if (!markets) {
      console.error("Error al recuperar los datos de los markets:", error);
    }
    res.status(201).json(markets);
  } catch (error) {
    console.error("Error al recuperar los datos de los markets:", error);
    res.status(500).json({
      errorMessages: ["Error desconocido durante la recuperación de markets."],
    });
  }
};

const deleteMarket = async (req, res, next) => {
  const { market_id } = req.params;

  try {
    await Market.findByIdAndDelete(market_id);
    res.status(201).json({ message: ["Market eliminado correctamente"] });
  } catch {
    console.error("Error al eliminar el market", error);
    res.status(500).json({
      errorMessages: ["Error desconocido durante la eliminación del market."],
    });
  }
};

module.exports = {
  createMarkets,
  editMarket,
  getOneMarket,
  getAllMarkets,
  deleteMarket,
};
