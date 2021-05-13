import React, { useEffect, useState } from 'react'
import { Button, Typography, Container, makeStyles, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl, Snackbar } from '@material-ui/core'
// import AcUnitIcon from '@material-ui/icons/AcUnit';
// import SendIcon from '@material-ui/icons/Send';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {TextField} from '@material-ui/core'
import { useForm } from './../hooks/useForm';
import { useHistory, useParams } from 'react-router';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
// import MuiAlert from '@material-ui/lab/Alert';


const useStyles = makeStyles({
  // btn:{
  //   fontSize:60,
  //   backgroundColor:'violet',
  //   '&:hover':{
  //     backgroundColor:'blue'
  //   }
  // },
  // title:{
  //   textDecoration:'underline',
  //   marginBottom:20
  // }
  field:{
    marginTop:20,
    marginBottom:20,
    display:'block'
  }
});

export default function Create() {

  let { id } = useParams();

  const history=useHistory();

  const [{title,details,category},handleInputchange,reset,setValues]=useForm({
    title:'',
    details:'',
    category: ''
  });

  const [Error, setError] = useState({titleError:false,detailsError:false});

  const [idNota, setidNota] = useState(null);

  const [open, setOpen] = useState(false);

  const handleOpenSnackbar = ()=>{
    setOpen(true);
  }

  const handleCloseSnackbar = (event,reason)=>{
    if(reason==='clickaway'){
      return;
    }
    setOpen(false);
  }

  useEffect(() => {
    if(id){
      setidNota(id);
      fetch(`http://localhost:4000/api/notes/list/${id}`)
      .then(res=>res.json())
      .then(data=>{
        console.log(data[0])
        const {title,details,category}=data[0];
        setValues(state=>({
          ...state,
          title:title,
          details:details,
          category: category
        }))
      });
    }
  }, [])

  const registrar = ()=>{
    fetch('http://localhost:4000/api/notes/new',{
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: JSON.stringify({title,details,category})
    })
    .then(()=>history.push('/'))
    reset();
  }

  const actualizar = ()=>{
    let id = idNota;
    fetch(`http://localhost:4000/api/notes/update/${id}`,{
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: JSON.stringify({title,details,category})
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res);
      if(res[0]>0){
        handleOpenSnackbar();
        reset();
        setTimeout(()=>{
          history.push('/')
        },1000)
      }
      else{
        console.error('No se ha podido actualizar la información');
      }

    })
  }

  

  const {titleError,detailsError}=Error;

  const handleSubmit=(e)=>{
    e.preventDefault();
    setError((error)=>({...error,detailsError:false,titleError:false,}));
    
    if(title===''){
      // alert('VACIO EL TITULO');
      setError((error)=>({...error,titleError:true}));
    } 

    if(details===''){
      // alert('VACIOS LOS DETALLES');
      setError((error)=>({...error,detailsError:true}));
    }



    if(title&&details){
      if(idNota){
        actualizar();
      }else{
        registrar();
      }
    }
  }

  const classes = useStyles();

  return (
    <Container>
          <Typography
            variant="h6"
            component="h2"
            color="textSecondary"
            gutterBottom
          > 
            Crear una nueva nota 
          </Typography>

          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              name="title"
              className={classes.field}
              label="Título de la nota"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              onChange={handleInputchange}
              value={title}
              error={titleError}
            />
            <TextField
              name="details"
              className={classes.field}
              label="Detalles"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              multiline
              rows={4}
              onChange={handleInputchange}
              value={details}
              error={detailsError}
            />

  <FormControl className={classes.field}>
    <FormLabel>
      Categoría de la nota
    </FormLabel>

    <RadioGroup 
      name="category"
      onChange={handleInputchange}
      value={category}
    >
      <FormControlLabel
        control={<Radio/>}
        label="Dinero"
        value="dinero"
      />
      <FormControlLabel
        control={<Radio/>}
        label="Pendientes"
        value="pendientes"
      />
      <FormControlLabel
        control={<Radio/>}
        label="Recordatorios"
        value="recordatorios"
      />
      <FormControlLabel
        control={<Radio/>}
        label="Trabajo"
        value="trabajo"
      />
    </RadioGroup>
  </FormControl>
            
          <Button
            // onClick={()=>{console.log('You clicked me')}} 
            type="submit" 
            color="secondary" 
            variant="contained"
            endIcon={<KeyboardArrowRightIcon/>}
          >
            Enviar
          </Button>
          </form>



          {/* Icons */}
          {/* <br/>
          <AcUnitOutlined />
          <AcUnitOutlined color="secondary" fontSize="large" />
          <AcUnitOutlined color="secondary" fontSize="small" />
          <AcUnitOutlined color="action" fontSize="small" />
          <AcUnitOutlined color="error" fontSize="small" />
          <AcUnitOutlined color="disabled" fontSize="small" /> */}

          <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Registro editado con éxito ✅"
        action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
        }
      />
    </Container>
  )
}
