import { useState, useEffect } from 'react';
import { Paper, LinearProgress, Stack } from '@mui/material';
import * as React from 'react';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const customIcons = {
    5: {
      icon: <SentimentVeryDissatisfiedIcon />,
      label: 'Very Dissatisfied',
    },
    4: {
      icon: <SentimentDissatisfiedIcon />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon />,
      label: 'Neutral',
    },
    2: {
      icon: <SentimentSatisfiedAltIcon />,
      label: 'Satisfied',
    },
    1: {
      icon: <SentimentVerySatisfiedIcon />,
      label: 'Very Satisfied',
    },
};
  
function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
};
  
const Class = props => {
    const [classData, setClassData] = useState({});
    useEffect (() => {
        setClassData(props.class);
    }, []);

    return (
        <Paper elevation = {3} style={{width: "50%"}} sx = {{maxWidth: "50%", textAlign: "center", marginLeft: "auto", marginRight: "auto"}}>
            <br />
            <h1>{classData.name}</h1>
            <p style = {{fontWeight: "bold"}}>Pain Level:</p>
            <Rating
                name="highlight-selected-only"
                defaultValue={classData.pain_level}
                IconContainerComponent={IconContainer}
                highlightSelectedOnly
                readOnly
            />
            <p style = {{fontWeight: "bold"}}>Breadth Categories:</p>
            <List component={Stack} direction="row">
                {classData.breadth_category !== undefined ? classData.breadth_category.map(el => {
                    return (<ListItem disablePadding>
                        <ListItemButton sx = {{maxWidth: "50%", textAlign: "center", marginLeft: "auto", marginRight: "auto"}}component="a" href={"search/" + el}> {/* TODO: change url */}
                            <ListItemText primary = {el} />
                        </ListItemButton>
                    </ListItem>);
                }) : []}
            </List>
            <p style = {{fontWeight: "bold"}}>Professors:</p>
            <List component={Stack} direction="row">
                {classData.professors !== undefined ? classData.professors.map(el => {
                    return (<ListItem disablePadding>
                        <ListItemButton sx = {{maxWidth: "50%", textAlign: "center", marginLeft: "auto", marginRight: "auto"}}component="a" href={"search/" + el}> {/* TODO: change url */}
                            <ListItemText primary = {el} />
                        </ListItemButton>
                    </ListItem>);
                }) : []}
            </List>
            <p style = {{fontWeight: "bold"}}>Average Grade: {classData.average_grade}</p>
            <LinearProgress sx = {{maxWidth: "50%", marginLeft: "auto", marginRight: "auto", paddingBottom: "10px", marginBottom: "10px"}} variant="determinate" value={(Math.round(classData.average_grade * 2500) / 100).toFixed(2)} />
            <br />
        </Paper>
    );
}

export default Class;