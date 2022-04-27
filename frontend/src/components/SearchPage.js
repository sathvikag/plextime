import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Class from './Class';

const SearchPage = props => {
    const [breadthCategory, setBreadthCategory] = useState(""); // persistent data that contains info about user data
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const SAMPLE_DATA = [
            {
                _id: "3ibvb349nveen34nv93vbd",
                name: "EECS 16B",
                breadth_category: ['Physical Sciences', 'English'],
                average_grade: 3.3,
                pain_level: 4,
                professors: ['Stojanovic', 'Murat']
            },
            {
                _id: "3ibfb349nveen34nv93vbd",
                name: "CS 61B",
                breadth_category: [],
                average_grade: 3.6,
                pain_level: 2,
                professors: ['Hillfinger']
            },
            {
                _id: "3ibvb349gveen34nv93vbd",
                name: "PHYSICS 7A",
                breadth_category: ['Physical Sciences'],
                average_grade: 2.8,
                pain_level: 3,
                professors: ['Spitzer']
            }
        ];
        fetch(process.env.BACKEND_URL + "/classes?" + breadthCategory) // query param
            // .then(response => response.json())
            .then(setClasses(SAMPLE_DATA));
    }, [breadthCategory]);

    return (
        <div>
            <h1>PlexTime</h1>
            {/* dropdown menu: let and detect user pressing breadth category */}
            <Box sx={{ maxWidth: 300, margin: 5}} >
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        Breadth Category
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={breadthCategory}
                        label="Breadth Category"
                        onChange={event => setBreadthCategory(event.target.value)}
                    >
                        <MenuItem value={""}>All Classes</MenuItem>
                        <MenuItem value={"Arts and Literature"}>Arts and Literature</MenuItem>
                        <MenuItem value={"Physical Sciences"}>Physical Sciences</MenuItem>
                        <MenuItem value={"Biological Science"}>Biological Sciences</MenuItem>
                        <MenuItem value={"International Studies"}>International Studies</MenuItem>
                        <MenuItem value={"Social and Behavioral Science"}>Social and Behavioral Science</MenuItem>
                        <MenuItem value={"Historical Studies"}>Historical Studies</MenuItem>
                        <MenuItem value={"Philosophy and Values"}>Philosophy and Values</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* list of classes that appear based on the classes pulled from backend 
                array.map(function) ---> [function(array[0]), function(array[1]), ...] 
                */}
            {classes.filter(element => {
                if (breadthCategory == "") {
                    return true;
                } else {
                    return element.breadth_category.includes(breadthCategory);
                }
            }).map(element => <Class class={element} />)}
        </div>
    );

}

export default SearchPage;
/*
() => {
    return;
}
*/
// drop down for all breadth categories
// sort by average grade (default descending order)
// sort by pain level (default ascending order)