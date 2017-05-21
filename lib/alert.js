'use babel';
import Lego from 'lego-core';
import Util from './util';

class View extends Lego.View{
    constructor(opts) {
        let options = {
            attributes: [{
                key: 'el',
                value: '',
                description: ''
            }, {
                key: 'type',
                value: ['success', 'info', 'warning', 'error'],
                description: '风格类型'
            }, {
                key: 'closable',
                value: true,
                description: '可否关闭'
            }, {
                key: 'closeText',
                value: '',
                description: '自定义关闭按钮'
            }, {
                key: 'message',
                value: '',
                description: '内容'
            }, {
                key: 'description',
                value: '',
                description: '描述'
            }, {
                key: 'showIcon',
                value: true,
                description: '是否显示图标'
            }, {
                key: 'banner',
                value: false,
                description: '是否横幅布局'
            }, {
                key: 'onClose',
                value: function(self){},
                description: '点击关闭后回调'
            }]
        };
        Object.assign(options, opts);
        super(options);
    }
    render(){
        let opts = this.options;
        let VDom = hx`
        <ol class='list-group mark-active'>
            ${opts.attributes.map(item => {
                return hx`
                <li id="${item.key}" class="${item.selected ? 'selected active' : ''}" onclick=${this.clickItem.bind(this)}>
                    <div class='pull-right' onclick=${this.clickItemRight.bind(this)}>
                        <label class='input-label'>
                            ${Util.getComType(item)}
                        </label>
                    </div>
                    <span>${item.key} ${item.description}</span>
                </li>
                `;
            })}
        </ol>
        `;
        return VDom;
    }
    renderAfter(){
        this.$('[name]').forEach((el, index) => {
            el.removeEventListener('change', Util.comCallback.bind(this), false);
            el.addEventListener('change', Util.comCallback.bind(this), false);
        });
    }
    clickItemRight(event){
        event.stopPropagation();
    }
    clickItem(event){
        event.stopPropagation();
        let target = event.currentTarget,
            opts = this.options,
            id = target.id,
            model = opts.attributes.find(item => item.key == id);
        if(model) model.selected = !model.selected;
        this.refresh();
    }
}
Lego.components('com_alert', View);
export default View;
