'use babel';
import { Emitter, CompositeDisposable } from 'atom';
import localforage from 'localforage';
import AddFav from '../lib/addFavView';
import UseFav from '../lib/useFavView';
import Modal from '../lib/modalView';
import ViewTpl from '../lib/view_tpl';
import DataTpl from '../lib/data_tpl';

class Main {
    constructor() {
        this.subscriptions = null;
        this.emitter = new Emitter();
        localforage.config({
            driver: localforage.INDEXEDDB,
            name: 'lego-helper-db',
            storeName: 'favStore'
        });
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
            'lego-helper:addFav': () => this.favCode('add'),
            'lego-helper:alert': () => this.insertCode('alert'),
            'lego-helper:avatar': () => this.insertCode('avatar'),
            'lego-helper:btngroup': () => this.insertCode('btngroup'),
            'lego-helper:btntoolbar': () => this.insertCode('btntoolbar'),
            'lego-helper:buttons': () => this.insertCode('buttons'),
            'lego-helper:chkgroup': () => this.insertCode('chkgroup'),
            'lego-helper:collapse': () => this.insertCode('collapse'),
            'lego-helper:datepicker': () => this.insertCode('datepicker'),
            'lego-helper:dropdown': () => this.insertCode('dropdown'),
            'lego-helper:dropdownbtn': () => this.insertCode('dropdownbtn'),
            'lego-helper:editcom': () => this.insertCode('editcom'),
            'lego-helper:facial': () => this.insertCode('facial'),
            'lego-helper:forms': () => this.insertCode('forms'),
            'lego-helper:inputs': () => this.insertCode('inputs'),
            'lego-helper:listgroup': () => this.insertCode('listgroup'),
            'lego-helper:loading': () => this.insertCode('loading'),
            'lego-helper:message': () => this.insertCode('message'),
            'lego-helper:modal': () => this.insertCode('modal'),
            'lego-helper:navs': () => this.insertCode('navs'),
            'lego-helper:nodata': () => this.insertCode('nodata'),
            'lego-helper:notification': () => this.insertCode('notification'),
            'lego-helper:pagination': () => this.insertCode('pagination'),
            'lego-helper:permis': () => this.insertCode('permis'),
            'lego-helper:popover': () => this.insertCode('popover'),
            'lego-helper:progressbar': () => this.insertCode('progressbar'),
            'lego-helper:rating': () => this.insertCode('rating'),
            'lego-helper:reply': () => this.insertCode('reply'),
            'lego-helper:search': () => this.insertCode('search'),
            'lego-helper:selects': () => this.insertCode('selects'),
            'lego-helper:steps': () => this.insertCode('steps'),
            'lego-helper:slider': () => this.insertCode('slider'),
            'lego-helper:switchs': () => this.insertCode('switchs'),
            'lego-helper:tables': () => this.insertCode('tables'),
            'lego-helper:tabs': () => this.insertCode('tabs'),
            'lego-helper:tags': () => this.insertCode('tags'),
            'lego-helper:tooltip': () => this.insertCode('tooltip'),
            'lego-helper:transfer': () => this.insertCode('transfer'),
            'lego-helper:tree': () => this.insertCode('tree'),
            'lego-helper:treeselect': () => this.insertCode('treeselect'),
            'lego-helper:upload': () => this.insertCode('upload'),
        }));
    }
    deactivate() {
        this.subscriptions.dispose();
    }
    toggle() {
        console.log('LegoHelper was toggled!');
    }
    // 创建文件
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
    // 收藏
    favCode(type){
        switch(type){
            case 'add':
                let AddFavView = Lego.create(AddFav, {type: name, context: this});
                this.AtomAddFavView = atom.workspace.addModalPanel({ item: AddFavView.el, visible: true });
                break;
            case 'use':
                let UseFavView = Lego.create(UseFav, {type: name, context: this});
                this.AtomUseFavView = atom.workspace.addModalPanel({ item: UseFavView.el, visible: true });
                break;
        }
    }
    // 插入组件
    insertCode(name) {
        let ModalView = Lego.create(Modal, {
            type: name,
            context: this
        });
        this.AtomModalView = atom.workspace.addModalPanel({ item: ModalView.el, visible: true });
    }
}
export default new Main();
