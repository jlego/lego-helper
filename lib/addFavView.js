'use babel';
import Lego from 'lego-core';
import Util from './util';
import localforage from 'localforage';

class View extends Lego.View{
    constructor(opts) {
        let options = {
            type: ''
        };
        Object.assign(options, opts);
        super(options);
    }
    render(){
        let opts = this.options;
        let vDom = hx`
        <atom-panel class='modal'>
            <h3 class='block'>添加收藏</h3>
            <div class='select-list'>
                <input class='input-text' id='favNameInput' type='text' placeholder='输入收藏名称'>
            </div>
            <div class='block btnDiv'>
                <button class='btn okBtn' onclick=${this.clickOk.bind(this)}>确定</button>
                <button class='btn cancelBtn' onclick=${this.clickCancel.bind(this)}>取消</button>
            </div>
        </atom-panel>
        `;
        return vDom;
    }
    components(){
        let opts = this.options;
        this.addCom({
            el: '#' + opts.type + '_' + opts.vid
        });
    }
    serialize() {}
    destroy() {
        this.remove();
    }
    getElement(){
        return this.el;
    }
    clickOk(event){
        let editor = atom.workspace.getActiveTextEditor(),
            opts = this.options;
        if (editor) {
            let selectionStr = editor.getSelectedText();
            localforage.setItem(this.$('#favNameInput')[0].value, selectionStr).then(function(value) {
                atom.notifications.addSuccess('收藏成功');
            }).catch(function(err) {
                atom.notifications.addWarning(error);
            });
            opts.context.AtomAddFavView.destroy();
        }
    }
    clickCancel(event){
        this.options.context.AtomAddFavView.destroy();
    }
}
export default View;
