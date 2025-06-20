const { pool } = require("../config/dataBase");



const getUsers = async (req, res) => {
  try {
    const query = 'SELECT * FROM USERS';
    const result = await pool.query(query);
    res.json({
      exito: true,
      mensaje: result.rows,
      total: result.rows.length
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      exito: false,
      mensaje: "Error al obtener usuarios",
      error: error.message
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM USERS WHERE $1";
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
        return res.status(404).json({
            exito: false,
            mensaje: 'user not found it. '
        });
    }

    res.json({
        exito: true,
        mensaje:'user found it. ',
        datos:result.rows[0]
    })
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      exito: false,
      mensaje: "Error al obtener Usuario",
      error: error.message,
    });
  }
};

module.exports={
    getUsers,
    getUserById
}
