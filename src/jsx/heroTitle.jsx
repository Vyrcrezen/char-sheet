import React from 'react';
import PropTypes from 'prop-types';

export function HeroTitle({ charSpecifics }) {
    return (
        <div className="container d-flex justify-content-center align-items-center rounded-top vy-bg-secondary-light mt-4 mb-0" style={{ height: '8rem', backgroundColor: 'rgba(197, 191, 180, 0.5)' }}>
            <h1 className="display-3 m-0 vy-primary">{charSpecifics.charName}</h1>
        </div>
    );
}

HeroTitle.propTypes = {
    charSpecifics: PropTypes.shape({
        charName: PropTypes.string.isRequired,
        roleplayPoints: PropTypes.arrayOf.isRequired,
        mainCharacteristics: PropTypes.shape.isRequired,
        dndBeyondPage: PropTypes.string.isRequired,
    }).isRequired,
};
