'use babel';

import Lego from 'lego-core';
import 'lego-ui';
import LegoView from './view';
import { CompositeDisposable } from 'atom';

class Main {
    constructor() {
        this.LegoView = null;
        this.modalPanel = null;
        this.subscriptions = null;
    }
    activate(state) {
        this.LegoView = new LegoView(state.LegoViewState);
        this.modalPanel = atom.workspace.addModalPanel({
            item: this.LegoView.getElement(),
            visible: false
        });

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'lego-helper:toggle': () => this.toggle(),
            'lego-helper:createView': () => this.showModal()
        }));
    }
    deactivate() {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
        this.LegoView.destroy();
    }
    serialize() {
        return {
            LegoViewState: this.LegoView.serialize()
        };
    }
    toggle() {
        console.log('LegoHelper was toggled!');
        return (
            this.modalPanel.isVisible() ?
            this.modalPanel.hide() :
            this.modalPanel.show()
        );
    }
    showModal(){
        console.log('ddddddd');
        Lego.UI.modal({
            type: 'layer',
            content: '这是内容啊',
            confirm: {
                msgType: 'error',
                content: '你确定要退出吗？'
            },
            onOk(event){
                console.warn('是真的');
            }
        });
    }
    fetch() {
        let editor
        if (editor = atom.workspace.getActiveTextEditor()) {
            let selection = editor.getSelectedText();
            selection = selection.split('').reverse().join('');
            editor.insertText(selection);
        }
    }
}
export default new Main();
