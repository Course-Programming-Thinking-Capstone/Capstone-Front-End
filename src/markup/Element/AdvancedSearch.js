import React, { useState } from 'react';


export default function AdvancedSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    const suggestions = [
        'luong thanh bip',
        'nguyen tuan an',
        'nguyen tuan vu',
        'vo van thien',
        'dao minh tri',
    ];

    const handleInputChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = suggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(query)
        );
        setFilteredSuggestions(filtered);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setFilteredSuggestions([]);
        // Redirect or perform a search based on the selected suggestion
    };

    return (
        <div className="search-container">
            <input
                type="text"
                id="search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleInputChange}
            />
            <ul id="suggestion-list" style={{ display: filteredSuggestions.length > 0 && searchQuery !== '' ? 'block' : 'none' }}>
                {filteredSuggestions.map((suggestion, index) => (
                    <li onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'gray'; /* Change background color on hover */
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent'; /* Restore original background color */
                        }} 
                        style={{
                            /* Inline CSS for the suggestion item */
                            padding: '10px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s', /* Add a smooth transition effect */
                        }}
                        key={index} onClick={() => handleSuggestionClick(suggestion)}>
                        {suggestion}
                    </li>
                ))}
            </ul>
        </div>
    );
}
