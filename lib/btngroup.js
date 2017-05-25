'use babel';
import BaseView from './baseView';

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
                key: 'onClick',
                value: function(self, item, event){},
                description: '点击时回调'
            }]
        };
        Object.assign(options, opts);
        super(options);
    }
}
Lego.components('com_btngroup', View);
export default View;
