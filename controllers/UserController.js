const { pool } = require("../config/dataBase");



const getUsers = async (req, res) => {
  try {
    const query = 'SELECT * FROM USERS';
    const result = await pool.query(query);

    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully.',
      data: result.rows,
      total: result.rows.length
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving users.",
      error: error.message
    });
  }
};

const getUserById = async (req, res) => {

  try {
    const {id} = req.params;
    const query = "SELECT * FROM USERS WHERE ID = $1";
    const result = await pool.query(query,[id]);

    //validar que el id sea numerico
    if (isNaN(id)) {
      return res.status(400).json({
        success:false,
        message:'invalid user id.'
      });
    }
    //const query = "SELECT * FROM USERS WHERE id = $1";
   // const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User found.',
      data: result.rows[0]
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the user.",
      error: error.message
    });
  }
};



/*const createUser = async (req,res) => {

  try {

    const {nombre}
    
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      exito: false,
      mensaje: "Error al crear el Usuario",
      error: error.message,
    });
    
  }

};*/

module.exports={
    getUsers,
    getUserById
}
