'use babel';
import Lego from 'lego-core';
import components from './components';
import Util from './util';

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
            <h3 class='block'>${opts.type}组件</h3>
            <div class='select-list'>
                ${comTag}
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
            opts = this.options,
            comView = Lego.getView('#' + opts.type + '_' + opts.vid),
            valObj = {};
        if (editor) {
            if(comView){
                comView.options.attributes.forEach((item, index) => {
                    if(item.selected){
                        let theVal = item.value;
                        if(item.realVal){
                            theVal = item.realVal;
                        }else{
                            theVal = Array.isArray(item.value) ? item.value[0] : item.value;
                        }
                        valObj[item.key] = theVal;
                    }
                });
                valObj.data = [];
                valObj.el = '#' + opts.type + '_' + valObj.el;
                editor.insertText(Util.getObjStr(valObj));
            }
            opts.context.AtomModalView.destroy();
        }
    }
    clickCancel(event){
        this.options.context.AtomModalView.destroy();
    }
}
export default View;
