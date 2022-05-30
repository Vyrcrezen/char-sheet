import React, { useState, useReducer, useRef } from 'react';
import tinymce from 'tinymce';
import { render } from 'react-dom';
import { HeroTitle } from './heroTitle.jsx';
import { Navbar } from './navbar.jsx';
import { OverviewSection } from './PageContent/overview.jsx';
import { StoryReader } from './PageContent/storyReader.jsx';
import { CodexSection } from './PageContent/codex.jsx';
import { MiscSection } from './PageContent/misc.jsx';
import { BeyondCharSheet } from './PageContent/beyondCharSheet.jsx';
import { ImageDisplayModal } from './utils/imageModal.jsx';
import { ConfirmationModal } from './utils/confirmationModal.jsx';
import { ContentCollection } from './cContentCollection.jsx';
import { GeneralCollection } from './cGeneralCollection.jsx';

import 'bootstrap';
import '../scss/style.scss';

function unloadPageResources(prevSelection) {
    switch (prevSelection) {
    case 'journal':
    case 'history':
        tinymce.remove('textarea');
        break;
    default:
    }
}

let cGeneralCollection;
let cJournalCollection;
let cHistoryCollection;

const idBackgroundImgContainer = 'background-image';

function Main() {
    const [modalImage, setModalImage] = useState('');
    const [pageSelection, setPageSelection] = useState('overview');
    let prevPageSelection = useRef('overview');
    let selectionChanged = useRef(false);
    const [initWebApp, setInitWebApp] = useState(true);
    const [confirmationModalContent, setConfirmationModalContent] = useState({ text: '', funSelectedYes: (() => false) });

    const [generalCharState, updateGeneralChar] = useReducer((collectionState) => !collectionState, true);
    const [journalCharState, updateJournalChar] = useReducer((collectionState) => !collectionState, true);
    const [historyCharState, updateHistoryChar] = useReducer((collectionState) => !collectionState, true);

    if (initWebApp === true) {
        cGeneralCollection = new GeneralCollection({}, idBackgroundImgContainer, generalCharState, updateGeneralChar, 'General');
        cGeneralCollection.loadFromLocalStorage();
        cGeneralCollection.overwriteColorVariables();
        cGeneralCollection.overwriteFontVariables();
        cJournalCollection = new ContentCollection({}, journalCharState, updateJournalChar, 'Journal');
        cJournalCollection.loadFromLocalStorage();
        cHistoryCollection = new ContentCollection({}, historyCharState, updateHistoryChar, 'History');
        cHistoryCollection.loadFromLocalStorage();
        setInitWebApp(false);
    }

    window.onload = (() => {
        cGeneralCollection.renderBackground();
    });

    function getPageSelection() {
        switch (pageSelection) {
        case 'journal': return <StoryReader cCollection={cJournalCollection} pageSelections={{ prev: prevPageSelection, now: pageSelection, changed: selectionChanged }} tinymce={tinymce} setConfirmationModalContent={setConfirmationModalContent} />;
        case 'history': return <StoryReader cCollection={cHistoryCollection} pageSelections={{ prev: prevPageSelection, now: pageSelection, changed: selectionChanged }} tinymce={tinymce} setConfirmationModalContent={setConfirmationModalContent} />;
        case 'codex': return <CodexSection />;
        case 'misc': return <MiscSection />;
        case 'charSheet': return <BeyondCharSheet cGeneralCollection={cGeneralCollection} />;
        default: return <OverviewSection cGeneralCollection={cGeneralCollection} tinymce={tinymce} stateModalImage={{ get: modalImage, set: setModalImage }} />;
        }
    }

    if (prevPageSelection !== pageSelection) {
        prevPageSelection = pageSelection;
        selectionChanged = true;
        unloadPageResources(prevPageSelection);
    }
    else { selectionChanged = false; }

    return (
        <>
            <ImageDisplayModal modalImage={modalImage} />
            <ConfirmationModal confirmationModalContent={confirmationModalContent} />
            <div id="pageContent">
                <div className="parallax-container">
                    <div id="parallax-foreground" className="vy-font-color-main">
                        <HeroTitle cGeneralCollection={cGeneralCollection} />
                        <Navbar statePageSelection={{ get: pageSelection, set: setPageSelection }} persistentContents={{ general: cGeneralCollection, journal: cJournalCollection, history: cHistoryCollection }} />
                        {getPageSelection(pageSelection)}
                    </div>
                    <div className="background-tile" />
                    <div id="background-image" />
                </div>
            </div>
        </>
    );
}

render(
    <Main />,
    document.getElementById('reactApp'),
);
