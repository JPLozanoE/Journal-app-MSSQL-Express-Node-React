const {router} = require('../config/headersConst');
const {pool, sql} = require('../config/mssqlConfig'); 

// ENDPOINTS DE LA API
// SINTAXIS:
// router.método('direccion'), async para detener (solicitud,respuesta)
router.get('/list', async (req, res) => {
  
    try {
      
      const sel = `SELECT * FROM notes`;
      
      const response = await pool.query(sel);
  
      return res.status(200).json(response.recordset);
  
    }catch(err){ 
      
      return res.status(500).json({   
        type: 'error', 
        message: err, 
      });
  
    }
  
  });

  router.post('/new', async (req,res)=>{

    try{
      const request = pool.request();

      const {
        title,
        details,
        category
      } = req.body;

      request
        .input('title', sql.VarChar, title)
        .input('details', sql.VarChar, details)
        .input('category', sql.VarChar, category)

        const ins = 'INSERT INTO notes (title,details,category) VALUES (@title, @details, @category)';

        const response = await request.query(ins);

        res.status(200).json(response);    

    }catch(err){
        return res.status(500).json({
            type: 'error',
            message: err
        });
    }

  });

  router.post('/delete', async (req,res)=>{
    try{

      const request = pool.request();

      const {
        id
      } = req.body;

      request
        .input('id', sql.Int, id)

        const del = `DELETE FROM notes WHERE id = 5`;

        const response = await request.query(del);

        return res.status(200).json(response);

    }catch(err){
      return res.status(500).json({
        type: 'error',
        message: err
    });
    }
  });

  module.exports=router;