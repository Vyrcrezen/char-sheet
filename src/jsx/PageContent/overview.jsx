import React from 'react';
import PropTypes from 'prop-types';
import { ClickableImage } from '../utils/imageModal.jsx';
import CharacterImage from '../../character/Character.jpg';

export function OverviewSection({ stateModalImage, charSpecifics }) {
    const mainCharacteristics = [];
    Object.keys(charSpecifics.mainCharacteristics).forEach((characteristicName) => {
        mainCharacteristics.push((
            <tr>
                <td>{characteristicName}</td>
                <td>{charSpecifics.mainCharacteristics[characteristicName]}</td>
            </tr>
        ));
    });

    const roleplayPoints = [];
    Object.keys(charSpecifics.roleplayPoints).forEach((roleplayTopic) => {
        roleplayPoints.push((<h3>{roleplayTopic.replaceAll('_', ' ')}</h3>));
        roleplayPoints.push((
            <ul>
                {charSpecifics.roleplayPoints[roleplayTopic].forEach((roleplayItem) => { roleplayPoints.push((<li>{roleplayItem}</li>)); })}
            </ul>
        ));
    });

    return (
        <section className="container" style={{ backgroundColor: 'rgba(197, 191, 180, 0.5)' }}>
            <div className="row pt-3">
                <div className="d-flex justify-content-center col text-center">
                    <div className="w-75 justify-content-center">
                        <ClickableImage className="w-100 rounded" style={{ objectFit: 'cover', height: '50vh', objectPosition: '55%' }} src={CharacterImage} stateModalImage={stateModalImage} alt="CharacterImage" />
                        <table className="table table-sm table-striped text-center mt-2">
                            <tbody>
                                {mainCharacteristics}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="col text-center">
                    <ul className="text-start">
                        {roleplayPoints}
                    </ul>
                </div>
            </div>
        </section>
    );
}

OverviewSection.propTypes = {
    stateModalImage: PropTypes.shape({
        get: PropTypes.string.isRequired,
        set: PropTypes.func.isRequired,
    }).isRequired,
    charSpecifics: PropTypes.shape({
        charName: PropTypes.string.isRequired,
        roleplayPoints: PropTypes.arrayOf.isRequired,
        mainCharacteristics: PropTypes.shape.isRequired,
        dndBeyondPage: PropTypes.string.isRequired,
    }).isRequired,
};
