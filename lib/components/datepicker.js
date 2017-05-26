'use babel';
import BaseView from '../baseView';

class View extends BaseView{
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
}
Lego.components('com_datepicker', View);
export default View;
