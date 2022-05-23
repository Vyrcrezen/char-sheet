import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { renderTinyMceEditor } from '../tinyMceEditor.jsx';
import { ContentCollection } from '../cContentCollection.jsx';
import {
    SvgDelete, SvgReader, SvgEdit, SvgNewEntry,
} from '../../img/pictography.jsx';

function JournaDeletionText({ title, designation }) {
    return (
        <span>
            You are about to delete:&nbsp;
            <b>{title}</b>
            &nbsp;from&nbsp;
            <b>{designation}</b>
            !
            <br />
            Do you wish to proceed?
        </span>
    );
}

function JournalArea({
    cCollection, stateSelectedEntry, divJournalTextArea, tinymce, setConfirmationModalContent,
}) {
    const [editorActive, setEditorActive] = useState(false);

    const journalTextRenderDiv = 'story-reader-area';
    const bEntrySelected = cCollection.Content[stateSelectedEntry.get] !== undefined;
    const displayedTitle = (bEntrySelected) ? cCollection.Content[stateSelectedEntry.get].title : 'No selection';
    const displayedText = (bEntrySelected) ? cCollection.Content[stateSelectedEntry.get].text : 'No selection';

    function fillJournalTextArea() {
        if (editorActive === true) { document.getElementById(journalTextRenderDiv).innerHTML = ''; renderTinyMceEditor(tinymce, divJournalTextArea, stateSelectedEntry.get, cCollection); }
        else if (document.getElementById(journalTextRenderDiv) !== null) { document.getElementById(journalTextRenderDiv).innerHTML = displayedText; }
    }

    function removeCollectionEntry() {
        if (editorActive === true) { tinymce.remove('textarea'); setEditorActive(false); }
        cCollection.removeEntry(stateSelectedEntry.get); stateSelectedEntry.set('');
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-end">
                <div>
                    <h3 className="fw-bold text-decoration-underline">{displayedTitle}</h3>
                </div>
                <div className="h-100" style={{ width: '6rem' }}>
                    <button
                        className="w-50 h-100 rounded p-0 vy-button-hover"
                        type="button"
                        disabled={!bEntrySelected}
                        onClick={() => {
                            if (editorActive === false) { setEditorActive(true); }
                            else { tinymce.remove('textarea'); setEditorActive(false); }
                        }}
                    >
                        {(editorActive) ? <SvgReader /> : <SvgEdit /> }
                    </button>
                    <button
                        className="w-50 h-100 rounded p-0 vy-button-hover"
                        disabled={!bEntrySelected}
                        data-bs-toggle="modal"
                        data-bs-target="#confirmationModal"
                        onClick={() => { setConfirmationModalContent({ text: <JournaDeletionText title={displayedTitle} designation={cCollection.desigantion} />, funSelectedYes: removeCollectionEntry }); }}
                        type="button"
                    >
                        <SvgDelete />
                    </button>
                </div>
            </div>
            <div id={divJournalTextArea} className="p-3 text-start vy-bg-journal-texture" style={{ overflowY: 'scroll', maxHeight: '75vh' }}>
                <textarea className="d-none" id="tinymce-text-area" />
                <div id={journalTextRenderDiv} />
                { fillJournalTextArea() }
            </div>
        </>
    );
}

function BookmarkButton({
    cCollection, entryId, stateSelectedEntry, stateEditingTitle,
}) {
    const btnClassnames = `container px-0${(entryId === stateSelectedEntry.get) ? ' vy-item-selected' : ''}`;

    return (
        <div className={btnClassnames}>
            <button
                className="btn fw-bold my-1 px-0"
                type="button"
                onClick={() => {
                    if (entryId !== stateSelectedEntry.get) { stateSelectedEntry.set(entryId); }
                    else { stateEditingTitle.set(true); }
                }}
            >
                {
                    (entryId === stateSelectedEntry.get && stateEditingTitle.get === true)
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        ? (<textarea className="h-100" autoFocus onBlur={(event) => { cCollection.updateEntryTitle(entryId, event.currentTarget.value); cCollection.updateReactState(); stateEditingTitle.set(false); }}>{cCollection.Content[entryId].title}</textarea>)
                        : cCollection.Content[entryId].title
                }
            </button>
        </div>
    );
}

function JournalBookmark({ cCollection, stateSelectedEntry }) {
    const [editingSelectionTitle, setEditingSelectionTitle] = useState(false);

    function genBookmarks() {
        const rBookmarks = [];

        Object.keys(cCollection.Content).forEach((entryId) => {
            rBookmarks.push(
                <BookmarkButton
                    cCollection={cCollection}
                    entryId={entryId}
                    stateSelectedEntry={stateSelectedEntry}
                    stateEditingTitle={{ get: editingSelectionTitle, set: setEditingSelectionTitle }}
                />,
            );
        });
        return rBookmarks;
    }

    return (
        <div className="w-75 justify-content-center vy-bg-bookmark">
            <div className="d-flex flex-column h-100 vy-bookmark-content">
                {genBookmarks()}
                <hr style={{ height: '2px' }} />
                <button className="btn" type="button" style={{ height: '3rem' }} onClick={() => { cCollection.addNewEntry(); cCollection.updateReactState(); }}>
                    <SvgNewEntry />
                </button>
            </div>
        </div>
    );
}

export function StoryReader({
    cCollection, pageSelections, tinymce, setConfirmationModalContent,
}) {
    const divJournalTextArea = 'story-content-area';
    const [selectedEntryId, setSelectedEntryId] = useState('');

    if (pageSelections.changed) { tinymce.remove('textarea'); }

    return (
        <section className="container" style={{ backgroundColor: 'rgba(197, 191, 180, 0.5)' }}>
            <div className="row pt-4">
                <div className="d-flex justify-content-center col-3 text-center">
                    <JournalBookmark cCollection={cCollection} stateSelectedEntry={{ get: selectedEntryId, set: setSelectedEntryId }} />
                </div>
                <div className="col-9 text-center">
                    <div className="me-3 mb-3">
                        <JournalArea
                            cCollection={cCollection}
                            stateSelectedEntry={{ get: selectedEntryId, set: setSelectedEntryId }}
                            divJournalTextArea={divJournalTextArea}
                            tinymce={tinymce}
                            setConfirmationModalContent={setConfirmationModalContent}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

// Photo courtesy photos-public-domain.com

JournaDeletionText.propTypes = {
    title: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
};

JournalBookmark.propTypes = {
    cCollection: PropTypes.instanceOf(ContentCollection).isRequired,
    stateSelectedEntry: PropTypes.shape({
        get: PropTypes.string.isRequired,
        set: PropTypes.func.isRequired,
    }).isRequired,
};

JournalArea.propTypes = {
    cCollection: PropTypes.instanceOf(ContentCollection).isRequired,
    stateSelectedEntry: PropTypes.shape({
        get: PropTypes.string.isRequired,
        set: PropTypes.func.isRequired,
    }).isRequired,
    stateJournalHtml: PropTypes.shape({
        get: PropTypes.string.isRequired,
        set: PropTypes.func.isRequired,
    }).isRequired,
    divJournalTextArea: PropTypes.string.isRequired,
    tinymce: PropTypes.shape.isRequired,
    setConfirmationModalContent: PropTypes.shape({
        text: PropTypes.string.isRequired,
        funSelectedYes: PropTypes.func.isRequired,
    }).isRequired,
};

BookmarkButton.propTypes = {
    cCollection: PropTypes.instanceOf(ContentCollection).isRequired,
    entryId: PropTypes.string.isRequired,
    stateSelectedEntry: PropTypes.shape({
        get: PropTypes.string.isRequired,
        set: PropTypes.func.isRequired,
    }).isRequired,
    stateEditingTitle: PropTypes.shape({
        get: PropTypes.string.isRequired,
        set: PropTypes.func.isRequired,
    }).isRequired,
};

StoryReader.propTypes = {
    cCollection: PropTypes.instanceOf(ContentCollection).isRequired,
    pageSelections: PropTypes.shape({
        prev: PropTypes.string.isRequired,
        now: PropTypes.string.isRequired,
        changed: PropTypes.bool.isRequired,
    }).isRequired,
    tinymce: PropTypes.shape.isRequired,
    setConfirmationModalContent: PropTypes.shape({
        text: PropTypes.string.isRequired,
        funSelectedYes: PropTypes.func.isRequired,
    }).isRequired,
};

// <button className="btn" type="button" onClick={() => { renderTinyMceEditor('tinymce-text-area', cCollection.addNewEntry(), cCollection); cCollection.updateReactState(); }}> Add new </button>
