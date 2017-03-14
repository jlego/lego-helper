'use babel';

import LegoHelperView from './lego-helper-view';
import { CompositeDisposable } from 'atom';

export default {

  legoHelperView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.legoHelperView = new LegoHelperView(state.legoHelperViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.legoHelperView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'lego-helper:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.legoHelperView.destroy();
  },

  serialize() {
    return {
      legoHelperViewState: this.legoHelperView.serialize()
    };
  },

  toggle() {
    console.log('LegoHelper was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
