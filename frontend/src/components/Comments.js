import * as React from 'react';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Class from './Class';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';

const Comments = props => {
    const [commentsData, setCommentsData] = useState([]);

    useEffect(() => {
        const SAMPLE_DATA = [
            {
                _id: "sdf980s98asdfjsdk24",    
                user_id: "bobthebuilder",
                class_id: "3ibvb349nveen34nv93vbd",
                content: "Hardest class ever. Would not recommend. Anant Sahai sucks. Shamith should teach this class."
            },
            {
                _id: "0923840asdflkjkdlfj",    
                user_id: "shamyth",
                class_id: "3ibvb349nveen34nv93vbd",
                content: "I love this class–it's really fun. Best class ever. It's to die for...literally."
            }
        ]
        fetch(process.env.BACKEND_URL + "/classes?" + props.class._id + "/comments") 
        .then(response => response.json())
        .then(setCommentsData(SAMPLE_DATA))
    }, []);

    return (
        <div>
            <h1></h1>
            <Class class = {props.class}></Class>
            <h2>Comments:</h2>
            <List component={Stack}>
                {commentsData !== undefined ? commentsData.map(element => {
                    return (<ListItem disablePadding>
                        <ListItem sx = {{maxWidth: "50%", textAlign: "center", marginLeft: "auto", marginRight: "auto", }}> {/* TODO: change url */}
                            <ListItemText primary = {
                             element.user_id + ": " + element.content
                            } />
                        </ListItem>
                    </ListItem>);
                }) : []}
            </List>
            <TextField
                id="outlined-multiline-static"
                label="Enter Comment"
                multiline
                rows={4}
                defaultValue=""
            />
        </div>
    );
    
}

export default Comments;

// classes/<class_id> - get class
// classes/<class_id>/comments - get all comments from class
// classes/<class_id>/comments/<id> - get/edit a specific 