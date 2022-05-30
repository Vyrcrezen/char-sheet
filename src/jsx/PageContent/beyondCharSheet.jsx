import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function BeyondCharSheet({ cGeneralCollection }) {
    const [editingBeyondAddress, setEditingBeyondAddress] = useState(false);

    return (
        <section className="container">
            <div className="container d-flex justify-content-center align-items-center rounded-top m-0" style={{ backgroundColor: 'rgba(var(--vy-secondary), .7)' }}>
                {
                    (editingBeyondAddress === true)
                        ? (
                            <textarea
                                className="w-50 fs-3"
                                cols="30"
                                rows="1"
                                // eslint-disable-next-line jsx-a11y/no-autofocus
                                autoFocus
                                onBlur={(event) => { cGeneralCollection.setBeyondAddress(event.currentTarget.value); setEditingBeyondAddress(false); }}
                                onKeyDown={(event) => { if (event.key === 'Enter') { cGeneralCollection.setBeyondAddress(event.currentTarget.value); setEditingBeyondAddress(false); } }}
                            >
                                {(cGeneralCollection.getBeyondAddress() || 'https://www.dndbeyond.com/characters/0')}
                            </textarea>
                        )
                        : <h3 className="m-0" title="double click to change" onDoubleClick={() => { setEditingBeyondAddress(true); }}>{cGeneralCollection.getBeyondAddress() || 'https://www.dndbeyond.com/characters/0'}</h3>
                }
            </div>
            <iframe className="w-100" style={{ height: '90vh' }} src={(cGeneralCollection.getBeyondAddress() || 'https://www.dndbeyond.com/characters/0')} title="Beyond Character sheet" />
        </section>
    );
}

BeyondCharSheet.propTypes = {
    cGeneralCollection: PropTypes.shape.isRequired,
};
