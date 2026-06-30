const Persona = require("../model/persona");

// POST /persona
const createPersona = async (req, res) => {
  try {
    console.log(req.body);
    const persona = await Persona.create(req.body);

    res.status(201).json({
      success: true,
      data: persona,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /persona/:id
const getPersonaById = async (req, res) => {
  try {
    const persona = await Persona.findById(req.params.id);

    if (!persona) {
      return res.status(404).json({
        success: false,
        message: "Persona not found",
      });
    }

    res.json({
      success: true,
      data: persona,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllPersonas = async (req, res) => {
  try {
    const { client_id } = req.query;

    if (!client_id) {
      return res.status(400).json({
        success: false,
        message: "client_id is required",
      });
    }

    const personas = await Persona.find({ client_id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: personas.length,
      data: personas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllPersonasSuperAdmin = async (req, res, next) => {
  try {
    const { isSuperAdmin } = req.query;

    if (!isSuperAdmin) return next();

    const personas = await Persona.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: personas.length,
      data: personas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createPersona,
  getPersonaById,
  getAllPersonas,
  getAllPersonasSuperAdmin
};
