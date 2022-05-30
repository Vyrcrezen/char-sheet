import React from 'react';
import PropTypes from 'prop-types';
import { GeneralCollection } from './cGeneralCollection.jsx';
import { ContentCollection } from './cContentCollection.jsx';

function loadCharContentFile(inputElementId, persistentContents) {
    if (typeof document.getElementById(inputElementId).files[0] === 'object') {
        const charContentFile = document.getElementById(inputElementId).files[0];

        const mFileReader = new FileReader();
        mFileReader.onload = (() => {
            const mergedCharData = JSON.parse(mFileReader.result);

            if (typeof mergedCharData.general === 'object') {
                persistentContents.general.replaceContent(mergedCharData.general); persistentContents.general.renderBackground(); persistentContents.general.overwriteColorVariables(); persistentContents.general.overwriteFontVariables(); persistentContents.general.updateReactState();
            }
            if (typeof mergedCharData.journal === 'object') { persistentContents.journal.replaceContent(mergedCharData.journal); persistentContents.journal.updateReactState(); }
            if (typeof mergedCharData.history === 'object') { persistentContents.history.replaceContent(mergedCharData.history); persistentContents.history.updateReactState(); }
        });
        mFileReader.readAsText(charContentFile);
    }
}

export function Navbar({ statePageSelection, persistentContents }) {
    const charDataImportId = '-nav-char-data-import';

    function setNavitemClassnames(activeSelection) {
        let mCommonClassnames = 'nav-item nav-link btn fs-4 btn fw-bold';
        if (activeSelection === statePageSelection.get) { mCommonClassnames += ' vy-item-selected'; }
        return mCommonClassnames;
    }

    function downloadCharContent() {
        const charData = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify({ general: persistentContents.general.Content, journal: persistentContents.journal.Content, history: persistentContents.history.Content }))}`;
        const dataDownloadAnchor = document.createElement('a');
        dataDownloadAnchor.setAttribute('href', charData);
        dataDownloadAnchor.setAttribute('download', 'charData.json');
        dataDownloadAnchor.click();
    }

    return (
        <div className="container-xl vy-bg-primary">
            <nav className="navbar navbar-expand-xl p-0 navbar-light">
                <div className="container-lg d-flex flex-row p-0">
                    <div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarItems" aria-controls="navbarItems" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                    </div>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarItems">
                        <div className="navbar-nav">
                            <button className={setNavitemClassnames('overview')} type="button" onClick={() => statePageSelection.set('overview')}>Overview</button>
                            <button className={setNavitemClassnames('journal')} type="button" onClick={() => statePageSelection.set('journal')}>Journal</button>
                            <button className={setNavitemClassnames('history')} type="button" onClick={() => statePageSelection.set('history')}>History</button>
                            <button className={setNavitemClassnames('codex')} type="button" onClick={() => statePageSelection.set('codex')}>Codex</button>
                            <button className={setNavitemClassnames('misc')} type="button" onClick={() => statePageSelection.set('misc')}>Misc</button>
                            <button className={setNavitemClassnames('charSheet')} type="button" onClick={() => statePageSelection.set('charSheet')}>Beyond</button>
                        </div>
                        <div className="navbar-nav">
                            <label htmlFor={charDataImportId}>
                                <div className={setNavitemClassnames('not-selectable')}> Import </div>
                                <input id={charDataImportId} className="invisible d-none" type="file" name="filename" onChange={() => { loadCharContentFile(charDataImportId, persistentContents); }} />
                            </label>
                            <button className={setNavitemClassnames('not-selectable')} type="button" onClick={() => downloadCharContent()}>Export</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

Navbar.propTypes = {
    statePageSelection: PropTypes.shape({
        get: PropTypes.string.isRequired,
        set: PropTypes.func.isRequired,
    }).isRequired,
    persistentContents: PropTypes.shape({
        general: PropTypes.instanceOf(GeneralCollection).isRequired,
        journal: PropTypes.instanceOf(ContentCollection).isRequired,
        history: PropTypes.instanceOf(ContentCollection).isRequired,
    }).isRequired,
};
