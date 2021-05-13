const {router} = require('../config/headersConst');
const {pool, sql} = require('../config/mssqlConfig'); 

// ENDPOINTS DE LA API
// SINTAXIS:
// router.método('direccion'), async para detener (solicitud,respuesta)
router.get('/list/:id?', async (req, res) => {

    try {
      if(req.params.id){

        const {id} = req.params;

        const request = pool.request();

        request
        .input('id', sql.Int, id)

        const del = `SELECT * FROM notes WHERE id = @id`;

        const response = await request.query(del);
        
        return res.status(200).json(response.recordset);
      }
      else{        
        const sel = `SELECT * FROM notes`;
        
        const response = await pool.query(sel);
    
        return res.status(200).json(response.recordset);
      }
  
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

        const del = `DELETE FROM notes WHERE id = @id`;

        const response = await request.query(del);

        return res.status(200).json(response);

    }catch(err){
      return res.status(500).json({
        type: 'error',
        message: err
    });
    }
  });


  router.post('/update/:id?', async (req, res) => {

    try {
      console.log(req.params.id);
      if(req.params.id){
        // return res.status(200).json(req.params.id);

        const {
          id
        } = req.params;

        const {
          title,
          details,
          category
        } = req.body;

        const request = pool.request();

        request
        .input('id', sql.Int, id)
        .input('title', sql.VarChar, title)
        .input('details', sql.VarChar, details)
        .input('category', sql.VarChar, category)

        const del = `UPDATE notes SET title=@title, details=@details, category=@category WHERE id = @id`;

        const response = await request.query(del);
        
        return res.status(200).json(response.rowsAffected);
      }
  
    }catch(err){ 
      
      return res.status(500).json({   
        type: 'error', 
        message: err, 
      });
  
    }
  
  });
  module.exports=router;