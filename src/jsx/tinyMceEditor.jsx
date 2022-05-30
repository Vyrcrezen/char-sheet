import 'tinymce/models/dom/model.js';
import 'tinymce/icons/default/icons.js';
import 'tinymce/themes/silver/theme.js';
import 'tinymce/skins/ui/oxide/skin.css';
import 'tinymce/plugins/advlist/plugin.js';
import 'tinymce/plugins/code/plugin.js';
import 'tinymce/plugins/emoticons/plugin.js';
import 'tinymce/plugins/emoticons/js/emojis.js';
import 'tinymce/plugins/link/plugin.js';
import 'tinymce/plugins/lists/plugin.js';
import 'tinymce/plugins/table/plugin.js';

import 'tinymce/plugins/preview/plugin.js';

import contentUiCss from 'tinymce/skins/ui/oxide/content.css';
import contentCss from 'tinymce/skins/content/default/content.css';

export function renderTinyMceEditor(tinymce, idDivContainer, entryId, cCollection) {
    function updateCollectionText(event) {
        cCollection.updateEntryText(entryId, `${event.target.getContent()}`);
    }

    const idTextArea = 'tinymce-text-area';

    tinymce.remove(`#${idTextArea}`);

    document.getElementById(idTextArea).value = cCollection.Content[entryId].text;

    tinymce.init({
        selector: `textarea#${idTextArea}`,
        /* All plugins need to be imported and added to the plugins option. */
        plugins: 'advlist code emoticons link lists table',
        toolbar: 'bold italic | bullist numlist | link emoticons',
        skin: false,
        content_css: false,
        content_style: `${contentUiCss.toString()}\n${contentCss.toString()}`,
        setup: (editor) => {
            editor.on('change', updateCollectionText);
        },
    });
}

export function initTinyMceEditor(tinymce, idTextArea, callbackOnEditorChange) {
    tinymce.init({
        selector: `textarea#${idTextArea}`,
        /* All plugins need to be imported and added to the plugins option. */
        plugins: 'advlist code emoticons link lists table',
        toolbar: 'bold italic | fontsize | bullist numlist | link emoticons',
        skin: false,
        content_css: false,
        browser_spellcheck: true,
        fontsize_formats: '8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt',
        content_style: `${contentUiCss.toString()}\n${contentCss.toString()}`,
        setup: (editor) => {
            editor.on('change', callbackOnEditorChange);
        },
    });
}
