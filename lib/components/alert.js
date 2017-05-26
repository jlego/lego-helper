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
                key: 'type',
                value: ['success', 'info', 'warning', 'error'],
                description: '风格类型'
            }, {
                key: 'closeAble',
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
}
Lego.components('com_alert', View);
export default View;
