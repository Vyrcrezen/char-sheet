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
import charSpecifics from '../character/constantIdentifiers.json';

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

let cJournalCollection;
let cHistoryCollection;

function Main() {
    const [modalImage, setModalImage] = useState('');
    const [pageSelection, setPageSelection] = useState('overview');
    let prevPageSelection = useRef('overview');
    let selectionChanged = useRef(false);
    const [initWebApp, setInitWebApp] = useState(true);
    const [confirmationModalContent, setConfirmationModalContent] = useState({ text: '', funSelectedYes: (() => false) });

    const [journalCharState, updateJournalChar] = useReducer((collectionState) => !collectionState, true);
    const [historyCharState, updateHistoryChar] = useReducer((collectionState) => !collectionState, true);

    if (initWebApp === true) {
        cJournalCollection = new ContentCollection({}, journalCharState, updateJournalChar, 'Journal');
        cJournalCollection.loadFromLocalStorage();
        cHistoryCollection = new ContentCollection({}, historyCharState, updateHistoryChar, 'History');
        cHistoryCollection.loadFromLocalStorage();
        setInitWebApp(false);
    }

    function getPageSelection() {
        switch (pageSelection) {
        case 'journal': return <StoryReader cCollection={cJournalCollection} pageSelections={{ prev: prevPageSelection, now: pageSelection, changed: selectionChanged }} tinymce={tinymce} setConfirmationModalContent={setConfirmationModalContent} />;
        case 'history': return <StoryReader cCollection={cHistoryCollection} pageSelections={{ prev: prevPageSelection, now: pageSelection, changed: selectionChanged }} tinymce={tinymce} setConfirmationModalContent={setConfirmationModalContent} />;
        case 'codex': return <CodexSection />;
        case 'misc': return <MiscSection />;
        case 'charSheet': return <BeyondCharSheet charSpecifics={charSpecifics} />;
        default: return <OverviewSection stateModalImage={{ get: modalImage, set: setModalImage }} charSpecifics={charSpecifics} />;
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
                    <div id="parallax-foreground">
                        <HeroTitle charSpecifics={charSpecifics} />
                        <Navbar statePageSelection={{ get: pageSelection, set: setPageSelection }} persistentContents={{ journal: cJournalCollection, history: cHistoryCollection }} />
                        {getPageSelection(pageSelection)}
                    </div>
                    <div className="background-tile" />
                    <div className="background-image" />
                </div>
            </div>
        </>
    );
}

render(
    <Main />,
    document.getElementById('reactApp'),
);
