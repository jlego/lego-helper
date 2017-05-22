'use babel';
import { Emitter, CompositeDisposable } from 'atom';
import Modal from '../lib/modal';
import ViewTpl from '../lib/view_tpl';
import DataTpl from '../lib/data_tpl';

class Main {
    constructor() {
        this.subscriptions = null;
        this.emitter = new Emitter();
    }
    activate(state) {
        let that = this;
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
        this.subscriptions.dispose();
    }
    toggle() {
        console.log('LegoHelper was toggled!');
    }
    createFile(name) {
        console.log('createFile:', name);
        let editor = atom.workspace.getActiveTextEditor();
        if (editor) {
            switch(name){
                case 'view':
                    editor.insertText(ViewTpl);
                    break;
                case 'data':
                    editor.insertText(DataTpl);
                    break;
            }
        }
    }
    insertCode(name) {
        let ModalView = Lego.create(Modal, {
            type: name,
            context: this
        });
        this.AtomModalView = atom.workspace.addModalPanel({ item: ModalView.el, visible: true });
    }
}
export default new Main();
