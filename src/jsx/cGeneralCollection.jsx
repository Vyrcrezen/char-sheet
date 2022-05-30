import _ from 'lodash';
import { initTinyMceEditor } from './tinyMceEditor.jsx';
import { convHexToRgb } from './utils/vyCommon.jsx';

const defaultRoleplayOverview = `<div>
<h3>Roleplay overview:</h3>
<ul>
    <li>create an overview of your character here</li>
    <li>multiple lists and other formattings are fine as well</li>
    <li>click the button on the top left to find out more</li>
</ul>
</div>`;

export class GeneralCollection {
    constructor(Content, idBackgroundImgContainer, collectionReactState, updateReactState, desigantion) {
        this.Content = Content;
        this.idBackgroundImgContainer = idBackgroundImgContainer;
        this.desigantion = desigantion;
        this.collectionReactState = collectionReactState;
        this.updateReactState = updateReactState;
        /*
        this.Content.color = {
            primary: { value: '107, 107, 107', var: '--vy-primary' },
            secondary: { value: '213, 233, 247', var: '--vy-secondary' },
            selected: { value: '211, 155, 112', var: '--vy-selected' },
            bgDialog: { value: '200, 200, 200', var: '--vy-bg-dialog' },
            bgPage: { value: '237, 237, 237', var: '--vy-bg-page' },
            fontMain: { value: '0, 0, 0', var: '--vy-font-color-main' },
            fontSecondary: { value: '0, 0, 0', var: '--vy-font-color-secondary' },
        };

        this.Content.font = {
            main: { value: 'Georgia', var: '--vy-main-font' },
        };

        this.Content.roleplayOverview = (
            `<div>
                <h3>Roleplay overview:</h3>
                <ul>
                    <li>create an overview of your character here</li>
                    <li>multiple lists and other formattings are fine as well</li>
                    <li>click the button on the top left to find out more</li>
                </ul>
            </div>`);

        this.Content.mainCharacteristics = '<p>species | penguin</p> <p>occupation | adventurer</p> <p>favourite food | pilchards</p>';

        this.Content.beyondAddress = 'https://www.dndbeyond.com/characters/0';
        */

        this.DataRequirements = {
            color: {
                primary: { value: { value: '107, 107, 107', type: 'string', exact: false }, var: { value: '--vy-primary', type: 'string', exact: true } },
                secondary: { value: { value: '213, 233, 247', type: 'string', exact: false }, var: { value: '--vy-secondary', type: 'string', exact: true } },
                selected: { value: { value: '211, 155, 112', type: 'string', exact: false }, var: { value: '--vy-selected', type: 'string', exact: true } },
                bgDialog: { value: { value: '200, 200, 200', type: 'string', exact: false }, var: { value: '--vy-bg-dialog', type: 'string', exact: true } },
                bgPage: { value: { value: '237, 237, 237', type: 'string', exact: false }, var: { value: '--vy-bg-page', type: 'string', exact: true } },
                fontMain: { value: { value: '0, 0, 0', type: 'string', exact: false }, var: { value: '--vy-font-color-main', type: 'string', exact: true } },
                fontSecondary: { value: { value: '0, 0, 0', type: 'string', exact: false }, var: { value: '--vy-font-color-secondary', type: 'string', exact: true } },
                secondaryAlpha: { value: { value: '.7', type: 'string', exact: false }, var: { value: '--vy-secondary-alpha', type: 'string', exact: true } },
            },
            beyondAddress: { value: 'https://www.dndbeyond.com/characters/0', type: 'string', exact: false },
            font: {
                main: { value: { value: 'Georgia', type: 'string', exact: false }, var: { value: '--vy-main-font', type: 'string', exact: true } },
            },
            mainCharacteristics: { value: '<p>species | penguin</p> <p>occupation | adventurer</p> <p>favourite food | pilchards</p>', type: 'string', exact: false },
            roleplayOverview: { value: defaultRoleplayOverview, type: 'string', exact: false },
        };

        this.rebuildDataset();
    }

    saveInLocalStorage() {
        localStorage.setItem(`content${this.desigantion}`, JSON.stringify(this.Content));
    }

    loadFromLocalStorage() {
        const localStorageData = localStorage.getItem(`content${this.desigantion}`, JSON.stringify(this.Content));

        if (typeof localStorageData === 'string') {
            this.replaceContent(JSON.parse(localStorageData));
            this.rebuildDataset();
            // this.saveInLocalStorage();
            // this.overwriteColorVariables();
            // this.renderBackground();
        }
    }

    replaceContent(newContent) {
        this.Content = JSON.parse(JSON.stringify(newContent));
        this.rebuildDataset();
        this.saveInLocalStorage();
    }

    addCharacterImage(newImageBinary) {
        this.Content.imgCharacter = newImageBinary;
        this.saveInLocalStorage();
    }

    renderBackground() {
        if (document.getElementById(this.idBackgroundImgContainer) !== null && this.Content.imgBackground !== undefined) {
            document.getElementById(this.idBackgroundImgContainer).style.backgroundImage = `url("${this.Content.imgBackground}")`;
        }
    }

    setCharacterName(newCharacterName) {
        this.Content.characterName = newCharacterName;
        this.saveInLocalStorage();
    }

    addBackgroundImage(newImageBinary) {
        this.Content.imgBackground = newImageBinary;
        this.renderBackground();
        this.saveInLocalStorage();
    }

    getColor(colorName) {
        let requestedColor = '0, 0, 0';

        if (typeof this.Content.color[colorName] === 'object') {
            requestedColor = this.Content.color[colorName].value;
        }

        return requestedColor;
    }

    setColor(colorName, colorVale) {
        if (typeof this.Content.color[colorName] === 'object') {
            const Rgb = convHexToRgb(colorVale);
            this.Content.color[colorName].value = `${Rgb.r}, ${Rgb.g}, ${Rgb.b}`;
            document.documentElement.style.setProperty(this.Content.color[colorName].var, this.Content.color[colorName].value);
            this.saveInLocalStorage();
            // this.updateReactState();
        }
    }

    overwriteColorVariables() {
        Object.keys(this.Content.color).forEach((colorName) => {
            document.documentElement.style.setProperty(this.Content.color[colorName].var, this.Content.color[colorName].value);
        });
    }

    getFont(fontDesignation) {
        let requestedFont = 'Arial';

        if (typeof this.Content.font[fontDesignation] === 'object') {
            requestedFont = this.Content.font[fontDesignation].value;
        }

        return requestedFont;
    }

    setFont(fontDesignation, fontVale) {
        if (typeof this.Content.font[fontDesignation] === 'object') {
            this.Content.font[fontDesignation].value = fontVale;
            document.documentElement.style.setProperty(this.Content.font[fontDesignation].var, this.Content.font[fontDesignation].value);
            this.saveInLocalStorage();
            // this.updateReactState();
        }
    }

    getBeyondAddress() { return this.Content.beyondAddress; }

    setBeyondAddress(newBeyondAddress) {
        this.Content.beyondAddress = newBeyondAddress;
        this.saveInLocalStorage();
    }

    overwriteFontVariables() {
        Object.keys(this.Content.font).forEach((fontName) => {
            document.documentElement.style.setProperty(this.Content.font[fontName].var, this.Content.font[fontName].value);
        });
    }

    addRoleplayOverview(newRoleplayOverview) {
        this.Content.roleplayOverview = newRoleplayOverview;
        this.saveInLocalStorage();
    }

    openRoleplayOverviewEditor(tinymce, idTextArea) {
        tinymce.remove(`#${idTextArea}`);

        document.getElementById(idTextArea).value = (this.Content.roleplayOverview || 'What is your character like?');

        initTinyMceEditor(tinymce, idTextArea, (event) => { this.addRoleplayOverview(`${event.target.getContent()}`); });
    }

    addMainCharacteristics(newMainCharacteristics) {
        this.Content.mainCharacteristics = newMainCharacteristics;
        this.saveInLocalStorage();
    }

    openMainCharacteristicsEditor(tinymce, idTextArea) {
        tinymce.remove(`#${idTextArea}`);

        document.getElementById(idTextArea).value = (this.Content.mainCharacteristics || '');

        initTinyMceEditor(tinymce, idTextArea, (event) => { this.addMainCharacteristics(`${event.target.getContent()}`); });
    }

    normalizeMainCharacteristics() {
        const normalizedMainCharacteristics = this.Content.mainCharacteristics.split('<p>').reduce((normalizeCharacteristic, itemCharacteristic) => {
            const mCharacteristicEntry = itemCharacteristic.substring(0, itemCharacteristic.indexOf('</p>'));
            if (
                (mCharacteristicEntry.length > 0)
                && (mCharacteristicEntry.includes('|') || itemCharacteristic.includes('/') || itemCharacteristic.includes('\\'))
            ) {
                // eslint-disable-next-line no-param-reassign
                normalizeCharacteristic += `${mCharacteristicEntry};;`;
            }
            return normalizeCharacteristic;
        }, '');

        return normalizedMainCharacteristics;
    }

    getMainCharacteristicsTable() {
        const normalizedMainCharacteristics = this.normalizeMainCharacteristics();

        const tBodyRows = normalizedMainCharacteristics.split(';;').reduce((characteristicsTBody, characteristicLine) => {
            const characteristicItems = characteristicLine.split('|');

            if (characteristicItems[0] && characteristicItems[1]) {
                characteristicsTBody.push(
                    (
                        `<tr>
                            <td>${characteristicItems[0]}</td>
                            <td>${characteristicItems[1]}</td>
                        </tr>`
                    ),
                );
            }

            return characteristicsTBody;
        }, []);

        return tBodyRows.join('');
    }

    recEnsureData(inputObject, objectPropPath) {
        return Object.keys(inputObject).reduce((rebuiltObject, objectProperty) => {
            if (typeof inputObject[objectProperty] === 'object'
                && JSON.stringify(Object.keys((typeof inputObject[objectProperty] === 'object') ? inputObject[objectProperty] : {})) !== JSON.stringify(['value', 'type', 'exact'])
            ) {
                _.merge(rebuiltObject, this.recEnsureData(inputObject[objectProperty], `${objectPropPath};${objectProperty}`));
            }
            else {
                const rRebuiltDataObject = {};
                const fullPropPath = `${objectPropPath};${objectProperty}`.split(';');

                fullPropPath.reduce((thisUnwrapper, propName, propIndex, inputArray) => {
                    // Element before last element (guaranteed one more element after current, which contains a value in this.DataRequirements)
                    if (inputArray.length - 1 === propIndex + 1) {
                        let bValueAssigned = false;
                        thisUnwrapper.twinStructureDeepestChild[propName] = {};
                        if (thisUnwrapper.thisIncludePath) {
                            // eslint-disable-next-line valid-typeof
                            if ((typeof thisUnwrapper.thisRollingRef[propName][inputArray[inputArray.length - 1]] === inputObject[objectProperty].type) && !inputObject[objectProperty].exact) {
                                // eslint-disable-next-line no-undef
                                thisUnwrapper.twinStructureDeepestChild[propName][inputArray[inputArray.length - 1]] = thisUnwrapper.thisRollingRef[propName][inputArray[inputArray.length - 1]];
                                bValueAssigned = true;
                            }
                        }
                        if (!bValueAssigned) {
                            thisUnwrapper.twinStructureDeepestChild[propName][inputArray[inputArray.length - 1]] = inputObject[objectProperty].value;
                        }
                    }
                    // Don't do this for the last two element
                    else if (propIndex < inputArray.length - 2) {
                        // See if this object has this path chain
                        if (thisUnwrapper.thisIncludePath) {
                            if (typeof thisUnwrapper.thisRollingRef[propName][inputArray[propIndex + 1]] === 'undefined') { thisUnwrapper.thisIncludePath = false; }
                            else { thisUnwrapper.thisRollingRef = thisUnwrapper.thisRollingRef[propName]; }
                        }
                        // Keep building the new object, and preserve its deepest element's ref in twinStructureDeepestChild
                        thisUnwrapper.twinStructureDeepestChild[propName] = {};
                        thisUnwrapper.twinStructureDeepestChild = thisUnwrapper.twinStructureDeepestChild[propName];
                    }
                    return thisUnwrapper;
                }, {
                    thisRollingRef: JSON.parse(JSON.stringify(this)), thisIncludePath: true, twinStructureDeepestChild: rRebuiltDataObject,
                });
                _.merge(rebuiltObject, rRebuiltDataObject);
            }
            return rebuiltObject;
        }, {});
    }

    rebuildDataset() {
        const mRebuiltObject = {};

        _.merge(mRebuiltObject, this.recEnsureData(this.DataRequirements, 'Content'));

        Object.keys(mRebuiltObject.Content).forEach((propName) => { this.Content[propName] = mRebuiltObject.Content[propName]; });
    }
}
