import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
// import { ClickableImage } from '../utils/imageModal.jsx';
import SvgPenguin from '../../character/Character.svg';
import { GeneralCollection } from '../cGeneralCollection.jsx';
import { convRgbToHex } from '../utils/vyCommon.jsx';
import {
    SvgFilledBackgroundImg, SvgFilledProfileImg, SvgColorPalette, SvgFont, SvgTable, SvgEdit,
} from '../../img/pictography.jsx';

function loadSelectedImage(inputElementId, callback = undefined, callbackParentObject = undefined) {
    if (typeof document.getElementById(inputElementId).files[0] === 'object') {
        const mImgFile = document.getElementById(inputElementId).files[0];

        const mFileReader = new FileReader();
        mFileReader.onload = (() => {
            if (callbackParentObject !== undefined && Array.isArray(callback)) {
                callbackParentObject[callback[0]](mFileReader.result);
                callbackParentObject[callback[1]]();
            }
        });
        mFileReader.readAsDataURL(mImgFile);
    }
}

export function OverviewSection({ cGeneralCollection, tinymce, stateModalImage }) {
    const idCharImgInput = 'characterImageUpload';
    const idCharacterImageContainer = 'characterImageContainer';
    const idBackgroundImgInput = 'BackgroundImageUpload';
    const idTextareaCharOverview = 'tinymce-charOverview-textarea';
    const idTextareaMainCharacteristics = 'tinymce-mainCharacteristics-textarea';

    const [mainCharacteristicsEditorActive, setMainCharacteristicsEditorActive] = useState(false);
    const [selectionAreaOverImage, setSelectionAreaOverImage] = useState('none');
    const [selectedFont, setSelectedFont] = useState(cGeneralCollection.getFont('main'));

    const CharImageArea = useCallback(() => {
        const { imgCharacter } = cGeneralCollection.Content;

        return (
            <div id={idCharacterImageContainer} className="h-100 w-100">
                <button type="button" className="w-100 h-100 p-0 btn" data-bs-toggle="modal" data-bs-target="#imageModal" onClick={() => { stateModalImage.set(imgCharacter || SvgPenguin); }}>
                    <img
                        className="w-100 h-100 rounded vy-object-fit-cover"
                        // eslint-disable-next-line object-curly-newline
                        style={{ objectPosition: '55%', borderStyle: 'solid', borderColor: 'black', borderWidth: '1px' }}
                        src={imgCharacter || SvgPenguin}
                        alt="CharacterImage"
                    />
                </button>
            </div>
        );
    }, [cGeneralCollection.Content]);

    const FontSelectionItem = useCallback(({ font }) => (
        <tr>
            <td className="p-0">
                <button
                    className={`btn w-100 h-100 fs-3 p-0 ${(cGeneralCollection.getFont('main') === font) ? 'vy-item-selected' : ''}`}
                    type="button"
                    onClick={() => { cGeneralCollection.setFont('main', font); setSelectedFont(font); }}
                    style={{ fontFamily: font }}
                >
                    {font}
                </button>
            </td>
        </tr>
    ));

    const FontSelectionArea = useCallback(() => {
        const fontFamilies = ['Arial', 'Calibri', 'Catcafe', 'Courier New', 'Cursive', 'Georgia', 'Lucida Console', 'Sans-serif', 'Verdana'];
        const fontItems = [];

        fontFamilies.forEach((font) => fontItems.push(<FontSelectionItem font={font} />));

        return (
            <div>
                <table className="table table-striped vy-font-color-main">
                    <tbody>
                        {fontItems}
                    </tbody>
                </table>
            </div>
        );
    }, [selectedFont]);

    const ColorSelectionItem = useCallback(({ text, propName }) => {
        const ColorPickerInput = useCallback(({ getColor, setColor }) => (
            <input type="color" id="favcolor" name="favcolor" value={getColor} onChange={(event) => { setColor(event); }} />
        ), []);

        return (
            <tr>
                <td>{text}</td>
                <td><ColorPickerInput getColor={convRgbToHex(cGeneralCollection.getColor(propName))} setColor={(event) => { cGeneralCollection.setColor(propName, event.target.value); }} /></td>
            </tr>
        );
    });

    const ColorSelectionArea = useCallback(() => {
        const colorSelectionAttributes = [
            { text: 'Primary color:', propName: 'primary' }, { text: 'Secondary color:', propName: 'secondary' },
            /* { text: 'Secondary alpha:', propName: 'secondaryAlpha' }, */ { text: 'Selection color:', propName: 'selected' },
            { text: 'Dialog background color:', propName: 'bgDialog' }, { text: 'Page background color:', propName: 'bgPage' },
            { text: 'Font main:', propName: 'fontMain' }, { text: 'Font secondary:', propName: 'fontSecondary' },
        ];

        const colorTableItems = [];

        colorSelectionAttributes.forEach((colorAttributeItem) => { colorTableItems.push(<ColorSelectionItem text={colorAttributeItem.text} propName={colorAttributeItem.propName} />); });

        return (
            <div>
                <table className="table table-striped vy-font-color-main">
                    <tbody>
                        {colorTableItems}
                    </tbody>
                </table>
            </div>
        );
    }, []);

    const ImageAreaContent = useCallback(() => {
        switch (selectionAreaOverImage) {
        case 'font': return <FontSelectionArea />;
        case 'color': return <ColorSelectionArea />;
        default: return <CharImageArea />;
        }
    }, [selectionAreaOverImage]);

    const CharOverviewArea = useCallback(() => {
        const [overviewEditorActive, setOverviewEditorActive] = useState(false);
        const idCharOverviewMain = 'charOverview-main';

        useEffect(() => {
            if (overviewEditorActive) {
                document.getElementById(idCharOverviewMain).innerHTML = '';
                cGeneralCollection.openRoleplayOverviewEditor(tinymce, idTextareaCharOverview);
            }
            else {
                document.getElementById(idCharOverviewMain).innerHTML = cGeneralCollection.Content.roleplayOverview;
                tinymce.remove(`#${idTextareaCharOverview}`);
            }
        }, [overviewEditorActive]);

        return (
            <>
                <textarea className="d-none" id={idTextareaCharOverview} />
                <div id={idCharOverviewMain} className="text-start" />
                <button
                    type="button"
                    className={`position-absolute top-0 start-0 d-flex align-items-center justify-content-center border-0 rounded p-0 ${(overviewEditorActive ? 'vy-item-selected' : 'vy-faded-until-hover')}`}
                    style={{ width: '3rem', height: '3rem', transform: 'translateX(-100%)' }}
                    onClick={() => { setOverviewEditorActive(!overviewEditorActive); }}
                >
                    <SvgEdit />
                </button>
            </>
        );
    }, [cGeneralCollection.Content.roleplayOverview]);

    const MainCharacteristicsArea = useCallback(() => {
        const idCharacteristicsTbody = 'Characteristics-table';

        useEffect(() => {
            if (mainCharacteristicsEditorActive) {
                document.getElementById(idCharacteristicsTbody).innerHTML = '';
                cGeneralCollection.openMainCharacteristicsEditor(tinymce, idTextareaMainCharacteristics);
            }
            else {
                document.getElementById(idCharacteristicsTbody).innerHTML = `${cGeneralCollection.getMainCharacteristicsTable()}`;
                tinymce.remove(`#${idTextareaMainCharacteristics}`);
            }
        }, [mainCharacteristicsEditorActive]);
        return (
            <>
                <textarea className="d-none" id={idTextareaMainCharacteristics} />
                <table className="table table-sm table-striped text-center mt-2 vy-font-color-main">
                    <tbody id={idCharacteristicsTbody} />
                </table>
            </>
        );
    }, [cGeneralCollection.Content.mainCharacteristics, mainCharacteristicsEditorActive]);

    return (
        <section className="container" style={{ backgroundColor: 'rgba(var(--vy-secondary), .7)' }}>
            <div className="row pt-3">
                <div className="d-flex position-relative justify-content-center col text-center">
                    <div className="w-75 justify-content-center">
                        <div className="position-relative w-100 p-0" style={{ height: '50vh' }}>
                            <ImageAreaContent />
                        </div>
                        <MainCharacteristicsArea />
                    </div>
                    <div className="position-absolute start-0" style={{ transform: 'translateY( calc(50vh - 15rem) )' }}>
                        <button
                            type="button"
                            className={`d-flex align-items-center justify-content-center border-0 rounded p-0 ${(selectionAreaOverImage === 'font' ? 'vy-item-selected' : 'vy-faded-until-hover')}`}
                            style={{ width: '3rem', height: '3rem' }}
                            onClick={() => { setSelectionAreaOverImage((selectionAreaOverImage === 'font') ? 'none' : 'font'); }}
                        >
                            <SvgFont />
                        </button>
                        <button
                            type="button"
                            className={`d-flex align-items-center justify-content-center border-0 rounded p-0 ${(selectionAreaOverImage === 'color' ? 'vy-item-selected' : 'vy-faded-until-hover')}`}
                            style={{ width: '3rem', height: '3rem' }}
                            onClick={() => { setSelectionAreaOverImage((selectionAreaOverImage === 'color') ? 'none' : 'color'); }}
                        >
                            <SvgColorPalette />
                        </button>
                        <label
                            htmlFor={idCharImgInput}
                            className="d-flex align-items-center justify-content-center border-0 rounded vy-faded-until-hover vy-cursor-pointer"
                            style={{ width: '3rem', height: '3rem' }}
                            aria-label="change image"
                        >
                            <SvgFilledProfileImg />
                            <input
                                id={idCharImgInput}
                                className="invisible d-none"
                                type="file"
                                name="filename"
                                onChange={() => { loadSelectedImage(idCharImgInput, ['addCharacterImage', 'updateReactState'], cGeneralCollection); }}
                            />
                        </label>
                        <label
                            htmlFor={idBackgroundImgInput}
                            className="d-flex align-items-center justify-content-center border-0 rounded vy-faded-until-hover vy-cursor-pointer"
                            style={{ width: '3rem', height: '3rem' }}
                            aria-label="change image"
                        >
                            <SvgFilledBackgroundImg />
                            <input
                                id={idBackgroundImgInput}
                                className="invisible d-none"
                                type="file"
                                name="filename"
                                onChange={() => { loadSelectedImage(idBackgroundImgInput, ['addBackgroundImage', 'updateReactState'], cGeneralCollection); }}
                            />
                        </label>
                        <button
                            type="button"
                            className={`d-flex align-items-center justify-content-center border-0 rounded p-0 ${(mainCharacteristicsEditorActive ? 'vy-item-selected' : 'vy-faded-until-hover')}`}
                            style={{ width: '3rem', height: '3rem' }}
                            onClick={() => { setMainCharacteristicsEditorActive(!mainCharacteristicsEditorActive); }}
                        >
                            <SvgTable />
                        </button>
                    </div>
                </div>
                <div className="position-relative col text-center">
                    <CharOverviewArea />
                </div>
            </div>
        </section>
    );
}

OverviewSection.propTypes = {
    cGeneralCollection: PropTypes.instanceOf(GeneralCollection).isRequired,
    stateModalImage: PropTypes.shape({
        get: PropTypes.string.isRequired,
        set: PropTypes.func.isRequired,
    }).isRequired,
    tinymce: PropTypes.shape.isRequired,
};
