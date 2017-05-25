'use babel';
import Lego from 'lego-core';
import Util from './util';
import localforage from 'localforage';

class View extends Lego.View{
    constructor(opts) {
        let options = {
            data: []
        };
        Object.assign(options, opts);
        super(options);
    }
    components(){
        let that = this,
            opts = this.options;
        localforage.iterate(function(value, key, iterationNumber) {
            opts.data.push({
                id: iterationNumber,
                key: key,
                value: value
            });
        }).then(function() {
            console.log('Iteration has completed');
            that.refresh();
        }).catch(function(err) {
            console.log(err);
        });
    }
    render(){
        let opts = this.options;
        let vDom = hx`
        <atom-panel class='modal'>
            <h3 class='block'>我的收藏</h3>
            <div class='select-list'>
                <ol class='list-group'>
                ${opts.data.map(item => {
                    return hx`
                    <li class='favItem' id="${item.id}">
                        <button class='btn delBtn pull-right' id="${item.id}">删除</button>
                        <div class='icon icon-file-text'>${item.key}</div>
                    </li>
                    `;
                })}
                </ol>
            </div>
            <div class='block btnDiv'>
                <button class='btn cancelBtn' onclick=${this.clickCancel.bind(this)}>关闭</button>
            </div>
        </atom-panel>
        `;
        return vDom;
    }
    renderAfter(){
        this.$('.delBtn').forEach((el, index) => {
            el.removeEventListener('click', this.clickRemove.bind(this), false);
            el.addEventListener('click', this.clickRemove.bind(this), false);
        });
        this.$('.favItem').forEach((el, index) => {
            el.removeEventListener('click', this.clickItem.bind(this), false);
            el.addEventListener('click', this.clickItem.bind(this), false);
        });
    }
    serialize() {}
    destroy() {
        this.remove();
    }
    getElement(){
        return this.el;
    }
    // 删除收藏
    clickRemove(event){
        event.stopPropagation();
        let target = event.currentTarget,
            id = target.id,
            model = this.options.data.find(item => item.id == id);
        if(model){
            localforage.removeItem(model.key).then(function(value) {
                atom.notifications.addSuccess('删除成功');
            }).catch(function(err) {
                atom.notifications.addWarning(err);
            });
            this.options.context.AtomUseFavView.destroy();
        }
    }
    // 使用收藏
    clickItem(event){
        event.stopPropagation();
        let editor = atom.workspace.getActiveTextEditor(),
            opts = this.options,
            target = event.currentTarget,
            id = target.id,
            model = this.options.data.find(item => item.id == id);
        if (editor && model) {
            let selectionStr = editor.getSelectedText();
            localforage.getItem(model.key).then(function(value) {
                editor.insertText(value);
            }).catch(function(err) {
                atom.notifications.addWarning(err);
            });
            opts.context.AtomUseFavView.destroy();
        }
    }
    clickCancel(event){
        this.options.context.AtomUseFavView.destroy();
    }
}
export default View;
