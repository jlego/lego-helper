'use babel';

import { CompositeDisposable } from 'atom';
import components from '../lib/components';

class Main {
    constructor() {
        this.subscriptions = null;
    }
    activate(state) {
        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'lego-helper:toggle': () => this.toggle(),
            'lego-helper:createView': () => this.createFile('view'),
            'lego-helper:createData': () => this.createFile('data'),
            'lego-helper:alert': () => this.insertCode('alert'),
        }));
    }
    deactivate() {
        // this.modalPanel.destroy();
        this.subscriptions.dispose();
        // this.LegoView.destroy();
    }
    toggle() {
        console.log('LegoHelper was toggled!');
    }
    createFile(name) {
        console.log('createFile:', name);
    }
    insertCode(name) {
        let editor;
        if (editor = atom.workspace.getActiveTextEditor()) {
            console.warn(name, components);
            // let selection = editor.getSelectedText();
            // selection = selection.split('').reverse().join('');
            editor.insertText(components[name]);
        }
    }
}
export default new Main();
