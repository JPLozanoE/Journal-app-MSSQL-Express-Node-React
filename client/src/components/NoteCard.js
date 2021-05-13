import { Avatar, Card, CardContent, CardHeader, IconButton, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core'
import { blue, green, pink, yellow } from '@material-ui/core/colors';
import { DeleteOutlined } from '@material-ui/icons'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { useState } from 'react'
import { useHistory } from 'react-router';

const UseStyles=makeStyles({
    avatar:{
        backgroundColor: (note) => {
            if(note.category=='trabajo'){
                return yellow[700]
            }
            if(note.category=='dinero'){
                return green[500]
            }
            if(note.category=='pendientes'){
                return pink[500]
            }
            return blue[500]
        }
    }
});

export const NoteCard = ({note,handleDelete}) => {
    const classes=UseStyles(note);
    const [anchorEl, setanchorEl] = useState(null);

    const handleClick = (event)=>{
        setanchorEl(event.currentTarget);
    }

    const handleClose = ()=>{
        setanchorEl(null);
    }

    const history=useHistory();

    return (
        
        <div>
        <Card elevation={1} className={classes.test}>
            <CardHeader
            avatar={
                <Avatar className={classes.avatar}>
                    {note.category[0].toUpperCase()}
                </Avatar>
            }
                action={
                    <IconButton
                    aria-controls="simple-menu" aria-haspopup="true" 
                    onClick={handleClick}
                        // onClick={()=>{handleDelete(note.id)}}
                    >
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={note.title}
                subheader={note.category}
            />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem onClick={()=>{handleDelete(note.id)}}>Eliminar</MenuItem>
                <MenuItem onClick={()=>history.push(`/edit/${note.id}`)}>Editar</MenuItem>
            </Menu>
            <CardContent>

            <Typography 
                variant="body2"
                color="textSecondary"
            >
                {note.details}
            </Typography>
            </CardContent>
        </Card>
        </div>
    )
}
