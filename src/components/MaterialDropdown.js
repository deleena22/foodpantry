// src/components/MaterialDropdown.js
import React, { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import './MaterialDropdown.css'; // Import the CSS file

function MaterialDropdown({ options }) {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <TextField
            select
            label="Recipes"
            value={selectedOption}
            onChange={handleSelectChange}
            variant="outlined"
            className="material-dropdown" // Apply the CSS class
        >
            {options.map((option, index) => (
                <MenuItem key={index} value={option}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
    );
}

// Define PropTypes for type-checking
MaterialDropdown.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MaterialDropdown;
