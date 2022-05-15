export class ContentCollection {
    constructor(Content, collectionReactState, updateReactState, desigantion) {
        this.Content = Content;
        this.desigantion = desigantion;
        this.collectionReactState = collectionReactState;
        this.updateReactState = updateReactState;
    }

    saveInLocalStorage() {
        localStorage.setItem(`content${this.desigantion}`, JSON.stringify(this.Content));
    }

    loadFromLocalStorage() {
        const localStorageData = localStorage.getItem(`content${this.desigantion}`, JSON.stringify(this.Content));

        if (typeof localStorageData === 'string') {
            this.replaceContent(JSON.parse(localStorageData));
        }
    }

    addNewEntry() {
        const mEntryId = (new Date()).getTime();
        this.Content[mEntryId] = { title: 'New entry', text: 'Let the story begin here..' };

        return mEntryId;
    }

    replaceContent(newContent) {
        this.Content = JSON.parse(JSON.stringify(newContent));
        this.saveInLocalStorage();
    }

    updateEntryText(entryId, newText) {
        this.Content[entryId].text = newText;
        this.saveInLocalStorage();
    }

    updateEntryTitle(entryId, newTitle) {
        this.Content[entryId].title = newTitle;
        this.saveInLocalStorage();
    }

    removeEntry(entryId) {
        delete this.Content[entryId];
        this.saveInLocalStorage();
    }
}
