import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GeneralCollection } from './cGeneralCollection.jsx';

export function HeroTitle({ cGeneralCollection }) {
    const { characterName } = cGeneralCollection.Content;

    const [editingHeroTitle, setEditingHeroTitle] = useState(false);

    return (
        <div className="container d-flex justify-content-center align-items-center rounded-top mt-4 mb-0" style={{ height: '8rem', backgroundColor: 'rgba(var(--vy-secondary), .7)' }}>
            {
                (editingHeroTitle === true)
                    ? (
                        <textarea
                            id="heroTitleTextArea"
                            className="vy-primary h-50"
                            cols="30"
                            rows="1"
                            // eslint-disable-next-line jsx-a11y/no-autofocus
                            autoFocus
                            onBlur={(event) => { cGeneralCollection.setCharacterName(event.currentTarget.value); setEditingHeroTitle(false); }}
                            onKeyDown={(event) => { if (event.key === 'Enter') { cGeneralCollection.setCharacterName(event.currentTarget.value); setEditingHeroTitle(false); } }}
                        >
                            {(characterName || 'Penguin')}
                        </textarea>
                    )
                    : <h1 className="display-3 m-0 vy-primary" title="double click to change" onDoubleClick={() => { setEditingHeroTitle(true); }}>{characterName || 'Penguin'}</h1>
            }
        </div>
    );
}

HeroTitle.propTypes = {
    cGeneralCollection: PropTypes.instanceOf(GeneralCollection).isRequired,
    stateModalImage: PropTypes.shape({
        get: PropTypes.string.isRequired,
        set: PropTypes.func.isRequired,
    }).isRequired,
};
