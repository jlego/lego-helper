'use babel';
import { Emitter, CompositeDisposable } from 'atom';
import localforage from 'localforage';
import AddFav from '../lib/addFavView';
import UseFav from '../lib/useFavView';
import Modal from '../lib/modalView';
import files from '../lib/files';

class Main {
    constructor() {
        this.subscriptions = null;
        this.emitter = new Emitter();
        this.open = false;
    }
    activate() {
        let that = this;
        localforage.config({
            driver: localforage.INDEXEDDB,
            name: 'lego-helper-db',
            storeName: 'favStore'
        });
        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptionsOfCommands = atom.commands.add('atom-workspace', {
            'lego-helper:toggle': () => this.toggle(),
            'lego-helper:createView': () => this.createFile('view'),
            'lego-helper:createData': () => this.createFile('data'),
            'lego-helper:createApp': () => this.createFile('app'),
            'lego-helper:createIndex': () => this.createFile('index'),
            'lego-helper:createList': () => this.createFile('list'),
            'lego-helper:createListheader': () => this.createFile('listheader'),
            'lego-helper:createAdd': () => this.createFile('add'),
            'lego-helper:createDetail': () => this.createFile('detail'),
            'lego-helper:createUtil': () => this.createFile('util'),
            'lego-helper:createCss': () => this.createFile('css'),
            'lego-helper:fav': () => this.favCode('use'),
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
        });
    }
    deactivate () {
        this.subscriptions.dispose();
        this.subscriptions = null;
        this.subscriptionsOfCommands.dispose();
        this.subscriptionsOfCommands = null;
    }
    toggle() {
        if(!this.open){
            atom.notifications.addSuccess('成功启动lego-helper');
            this.open = true;
            if(!this.subscriptions) this.activate();
        }else{
            atom.notifications.addSuccess('成功关闭lego-helper');
            this.open = false;
            this.subscriptions.dispose();
        }
    }
    // 创建文件
    createFile(name) {
        if(!this.open) return;
        let editor = atom.workspace.getActiveTextEditor();
        if (editor) {
            let tpl = files[name + 'Tpl'];
            if(tpl) editor.insertText(tpl);
        }
    }
    // 收藏
    favCode(type){
        if(!this.open) return;
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
        if(!this.open) return;
        let ModalView = Lego.create(Modal, {
            type: name,
            context: this
        });
        this.AtomModalView = atom.workspace.addModalPanel({ item: ModalView.el, visible: true });
    }
}
export default new Main();
