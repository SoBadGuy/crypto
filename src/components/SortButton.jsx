import React from 'react';

const SortButton = ({onChange, sortButton}) => {
    return (
        <div className="coin-list__nomination">
            {sortButton.map((elem, index) => (
                <button
                    key={index}
                    onClick={event => onChange(event.target.value)}
                    className="coin-list__designation coin-list__designation_name"
                    value={elem.value}
                >
                    {elem.name}
                </button>
            ))}
        </div>
    );
};

export default SortButton;