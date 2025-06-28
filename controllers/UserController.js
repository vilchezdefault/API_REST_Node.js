const { pool } = require("../config/dataBase");

const getUsers = async (req, res) => {
  try {
    const query = "SELECT * FROM USERS";
    const result = await pool.query(query);

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully.",
      data: result.rows,
      total: result.rows.length,
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving users.",
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM USERS WHERE ID = $1";
    const result = await pool.query(query, [id]);

    //validar que el id sea numerico
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "invalid user id.",
      });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User found.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the user.",
      error: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    /// los parametros escritos aqui deben ir igual escritos que en el body a la hora de hacer pruebas
    /// VALIDACION PARA QUE LOS CAMPOS A SOLICITAR ESTEN LLENOS
    const { ID, NAME, PASSWORD } = req.body;
    if (!NAME || !PASSWORD) {
      return res.status(400).json({
        success: false,
        message: "You need to fill all inputs",
      });
    }
    ///VALIDACION DE LA CONSULTA, NO REPETIR NOMBRES EN BASE DE DATOS
    const checkUser = await pool.query("SELECT * FROM USERS WHERE NAME = $1", [
      NAME,
    ]);

    if (checkUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "user with that name already exist",
      });
    }
    ///INicio de la consulta
    const consulta = `
      INSERT INTO USERS(ID,NAME,PASSWORD)VALUES ($1,$2,$3) RETURNING *
    `;
    /// VALORES A ESPERAR
    const valores = [ID, NAME, PASSWORD];

    const result = await pool.query(consulta, valores);

        if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(201).json({
      success: true,
      message: "Usuario creado",
      datos: result.rows[0],
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      success: false,
      message: "Error while creating user",
      error: error.message
    });
  }
};

const updateUser = async(req,res) => {
  try {
    const {id} = req.params;
    const { ID, NAME, PASSWORD } = req.body;
    ///consulta

    const consulta = `
      UPDATE users
      SET NAME = $1,
      PASSWORD = $2
      where id = $3
      RETURNING *
    `;
        ///RESPETAR EL ORDEN DE LA CONSULTA CON LA ASIGNACION
        ///DE LOS VALORES , EJM: EL ID ES EL FILTRO Y VA DE ULTIMO
        // EN EL VALOR TAMBIEN DEBERIA IR ULTIMO 
      const valores = [ NAME, PASSWORD,ID];

      const result = await pool.query(consulta, valores);  

        if (result.rows.length === 0 ) {
          return res.status(404).json({
            success:false,
            message:'user not found'
          });
        }

        res.status(200).json({
        success: true,
        message: "USER UPDATE",
        datos: result.rows[0],
      });

  } catch (error) {
      console.error("Error", error);
      res.status(500).json({
        success: false,
        message: "Error while updating user",
        error: error.message  
  })
  };
};


const deleteUser = async(req,res) =>{
  try {
    
    const {id} = req.params;
    const { ID } = req.body;    


    const consulta = `
      delete from users where ID = $1 RETURNING *
    `;


      const result = await pool.query(consulta, [ID]);  

        if (result.rows.length === 0 ) {
          return res.status(404).json({
            success:false,
            message:'user not found'
          });
        }

        res.status(200).json({
        success: true,
        message: "USER DELETED",
        datos: result.rows[0],
      });


  } catch (error) {
      console.error("Error", error);
      res.status(500).json({
        success: false,
        message: "Error while delete user",
        error: error.message  
  })    
  }
};


module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
