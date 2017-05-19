'use babel';
import Lego from 'lego-core';
import components from './components';

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
        let comTag = opts.type ?
            hx(`<com_${opts.type} id=${opts.type + '_' + opts.vid}></com_${opts.type}>`) : '';
        let vDom = hx`
        <atom-panel class='modal'>
            <h3 class='block'>${opts.type}</h3>
            <div class='select-list'>
                ${comTag}
            </div>
            <div class='block'>
                <button class='btn okBtn' onclick=${this.clickOk.bind(this)}>确定</button>
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
            // console.warn(opts.type, components);
            editor.insertText('fffffffffffff');
            opts.context.AtomModalView.destroy();
        }
    }
}
export default View;
