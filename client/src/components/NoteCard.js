import { Avatar, Card, CardContent, CardHeader, IconButton, makeStyles, Typography } from '@material-ui/core'
import { blue, green, pink, yellow } from '@material-ui/core/colors';
import { DeleteOutlined } from '@material-ui/icons'
import React from 'react'

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
                        onClick={()=>{handleDelete(note.id)}}
                    >
                        <DeleteOutlined/>
                    </IconButton>
                }
                title={note.title}
                subheader={note.category}
            />
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
