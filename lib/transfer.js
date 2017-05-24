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
                key: 'name',
                value: '',
                description: '表单字段名'
            }, {
                key: 'size',
                value: ['default', 'sm', 'lg'],
                description: '尺寸大小'
            }, {
                key: 'multiple',
                value: false,
                description: '多选'
            }, {
                key: 'readonly',
                value: false,
                description: '只读'
            }, {
                key: 'radius',
                value: '50%',
                description: '圆角'
            }, {
                key: 'showName',
                value: true,
                description: '显示名称'
            }, {
                key: 'width',
                value: '',
                description: '宽度'
            }, {
                key: 'height',
                value: '',
                description: '高度'
            }, {
                key: 'onAdd',
                value: function(self, event){},
                description: '添加时回调'
            }, {
                key: 'onRemove',
                value: function(self, key, deleteFun){},
                description: '删除时回调'
            }, {
                key: 'onChange',
                value: function(self, key){},
                description: '更改时回调'
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
Lego.components('com_avatar', View);
export default View;
