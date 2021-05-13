import { Container, Grid, Paper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Masonry from 'react-masonry-css';
import { NoteCard } from './../components/NoteCard';


export default function Notes() {
  const [notes, setNotes] = useState([])
  useEffect(()=>{
    // fetch('http://localhost:8000/notes')
    //   .then(res=>res.json())
    //   .then(data=>setNotes(data))

      fetch('http://localhost:4000/api/notes/list')
        .then(res=>res.json())
        .then(data=>setNotes(data));

  },[])

  const handleDelete= async(id)=>{
    // console.log(id);
    await fetch('http://localhost:4000/api/notes/delete/',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({id:id})
    })

    const newNotes=notes.filter(note=>(note.id!==id))

    setNotes(newNotes);
  }
  const breakpoints = {
    default:3,
    1100:1,

  }
  return (
    <Container>
    
    {/* <Grid container>
    
      <Grid item xs={12} sm={6} md={3}>
        <Paper>1</Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper>2</Paper>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <Paper>3</Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper>4</Paper>
      </Grid>

    </Grid> */}
    

    
    <Masonry
      breakpointCols={breakpoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
    

     {notes.map(note=>(
        <NoteCard
          key={note.id}
          note={note}
          handleDelete={handleDelete}
        >
        {note.title}
        </NoteCard>
     ))} 
     </Masonry>
    </Container>
  )
}
