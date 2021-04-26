import { Drawer, makeStyles, Typography, List,ListItem,ListItemIcon,ListItemText, AppBar, Toolbar, Avatar, useTheme, CssBaseline, IconButton, Hidden } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { AddCircleOutlined, SubjectOutlined } from '@material-ui/icons';
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router';
import  {format} from 'date-fns';

const drawerWidth=240;

const useStyles=makeStyles((theme)=>{
    return{
        root:{
            display:'flex'
        },
        drawer:{
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar:{
            [theme.breakpoints.up('sm')]: {
              width: `calc(100% - ${drawerWidth}px)`,
              marginLeft: drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
              display: 'none',
            },
        },
        toolbar: theme.mixins.toolbar,
        date:{
            flexGrow:1
        },
        page:{
            backgroundColor:'#f9f9f9',
            width:'100%',
            padding:theme.spacing(3)
        },
        drawerPaper:{
            width:drawerWidth
        },
        active:{
            background:'#f4f4f4'
        },
        title:{
            padding:theme.spacing(2)
        },
        avatar:{
            marginLeft:theme.spacing(2)
        }
    }
});

const menuItems=[
    {
    text:'Mis notas',
    icon: <SubjectOutlined color="secondary"/>,
    path: '/'
    },
    {
    text:'Crear nota',
    icon: <AddCircleOutlined color="secondary"/>,
    path: '/create'
    }
]

export const Layout = ({children},props) => {
    
    const classes=useStyles();
    const theme = useTheme();
    const history=useHistory();
    const [mobileOpen, setMobileOpen] = useState(false);
    const { window } = props;
    // Nos sirve para saber en qué página estamos
    const location=useLocation();
    // Nos sirve para saber en qué página estamos
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };

      const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <div className={classes.root}>
        <CssBaseline/>
        <AppBar
            position="fixed"
            className={classes.appBar}
            elevation={0}
        >
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
            >
                <MenuIcon/>
            </IconButton>
                <Typography className={classes.date}>
                    Hoy es {new Date().toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })}
                </Typography>

                <Typography>
                    Mario
                </Typography>
                <Avatar src="/mario-av.png" className={classes.avatar}/>
            </Toolbar>
        </AppBar>

        <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
        <Drawer
            // className={classes.drawer}
            container={container}
            variant="temporary"
            // anchor="left"
            classes={{paper:classes.drawerPaper}}
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
        >

            <div>
                <Typography variant="h5" className={classes.title}>
                    Notas
                </Typography>
            </div>
            {menuItems.map(item=>(
                <ListItem 
                    key={item.text}
                    button
                    onClick={()=>history.push(item.path)}
                    className={location.pathname==item.path ? classes.active : null}
                >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItem>
            ))}
        </Drawer>
        </Hidden>

        <Hidden xsDown implementation="css">
        <Drawer
            // className={classes.drawer}
            variant="permanent"
            // anchor="left"
            classes={{paper:classes.drawerPaper}}
            open
        >

            <div>
                <Typography variant="h5" className={classes.title}>
                    Notas
                </Typography>
            </div>
            {menuItems.map(item=>(
                <ListItem 
                    key={item.text}
                    button
                    onClick={()=>history.push(item.path)}
                    className={location.pathname==item.path ? classes.active : null}
                >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItem>
            ))}
        </Drawer>
        </Hidden>
        </nav>

        <div className={classes.page}>
        <div className={classes.toolbar}></div>
            {children}
        </div>
        </div>
    )
}
