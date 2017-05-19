'use babel';
import Lego from 'lego-core';

class View extends Lego.View{
    constructor(opts) {
        let options = {
            type: 'info',
            closable: false,
            closeText: '',
            message: '',
            description: '',
            onClose(self){},
            showIcon: true,
            banner: false
        };
        Object.assign(options, opts);
        super(options);
    }
    render(){
        let VDom = hx`
        <ol class='list-group'>
            <li>
                <div class='pull-right'>
                    <label class='input-label'>
                        <input class='input-toggle' type='checkbox' checked='checked'>
                    </label>
                </div>
                <span class='icon icon-file-text'>Some file</span>
            </li>
            <li>
                <div class='pull-right key-bindings'>
                    <label class='input-label'>
                        <input class='input-toggle' type='checkbox'>
                    </label>
                </div>
                <span class='icon icon-file-text'>Another file with a long name</span>
            </li>
            <li>
                <div class='pull-right'>
                    <label class='input-label'>
                        <input class='input-toggle' type='checkbox'>
                    </label>
                </div>
                <span class='icon icon-file-text'>Yet another file</span>
            </li>
        </ol>
        `;
        return VDom;
    }
    clickOk(event){
        // let editor = atom.workspace.getActiveTextEditor(),
        //     opts = this.options;
        // if (editor) {
        //     console.warn(opts.type, components);
        //     editor.insertText(JSON.stringify(components[opts.type]));
        //     opts.context.AtomModalView.destroy();
        // }
    }
}
Lego.components('com_alert', View);
export default View;
