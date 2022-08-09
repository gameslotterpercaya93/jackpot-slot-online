'use babel';

import JackpotSlotOnlineView from './jackpot-slot-online-view';
import { CompositeDisposable } from 'atom';

export default {

  jackpotSlotOnlineView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.jackpotSlotOnlineView = new JackpotSlotOnlineView(state.jackpotSlotOnlineViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.jackpotSlotOnlineView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jackpot-slot-online:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.jackpotSlotOnlineView.destroy();
  },

  serialize() {
    return {
      jackpotSlotOnlineViewState: this.jackpotSlotOnlineView.serialize()
    };
  },

  toggle() {
    console.log('JackpotSlotOnline was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
