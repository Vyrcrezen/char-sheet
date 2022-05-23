import React from 'react';
import PropTypes from 'prop-types';

export function BeyondCharSheet({ charSpecifics }) {
    return (
        <section className="container" style={{ backgroundColor: 'rgba(197, 191, 180, 0.5)' }}>
            <iframe className="w-100" style={{ height: '90vh' }} src={charSpecifics.dndBeyondPage} title="Beyond Character sheet" />
        </section>
    );
}

BeyondCharSheet.propTypes = {
    charSpecifics: PropTypes.shape({
        charName: PropTypes.string.isRequired,
        roleplayPoints: PropTypes.arrayOf.isRequired,
        mainCharacteristics: PropTypes.shape.isRequired,
        dndBeyondPage: PropTypes.string.isRequired,
    }).isRequired,
};
