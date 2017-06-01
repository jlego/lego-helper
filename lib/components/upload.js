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
                key: 'keyRoot',
                value: '',
                description: 'key前缀'
            }, {
                key: 'type',
                value: ['file', 'photos', 'avatar'],
                description: '类型'
            }, {
                key: 'multiple',
                value: true,
                description: '多选'
            }, {
                key: 'readonly',
                value: false,
                description: '只读'
            }, {
                key: 'buttonText',
                value: '添加附件',
                description: '按钮文本'
            }, {
                key: 'buttonIcon',
                value: '',
                description: '按钮图标'
            }, {
                key: 'showZoom',
                value: true,
                description: '是否放大预览'
            }, {
                key: 'token',
                value: '',
                description: 'token'
            }, {
                key: 'params',
                value: {},
                description: '其他参数'
            }, {
                key: 'accept',
                value: [],
                description: '接受上传的文件mime类型'
            }, {
                key: 'acceptSuffix',
                value: [],
                description: '接受上传的文件后缀'
            }, {
                key: 'previewImg',
                value: {
                    width: 0,
                    height: 0,
                    quality: 1
                },
                description: '缩略图参数'
            }, {
                key: 'template',
                value: '',
                description: '模板'
            }, {
                key: 'maxFileSize',
                value: '5mb',
                description: '最大上传文件大小5MB'
            }, {
                key: 'maxFilesCount',
                value: 9,
                description: '最大上传文件数'
            }, {
                key: 'isAuto',
                value: true,
                description: '是否自动开始上传'
            }, {
                key: 'disabled',
                value: false,
                description: '是否禁用'
            }, {
                key: 'hasCookie',
                value: false,
                description: '上传请求时是否携带 cookie'
            }, {
                key: 'showUploadList',
                value: true,
                description: '是否展示上传列表'
            }, {
                key: 'onAddFile',
                value: function(self, event){},
                description: '添加文件时回调'
            }, {
                key: 'onBegin',
                value: function(self, file){},
                description: '开始上传时回调'
            }, {
                key: 'onProgress',
                value: function(self, file, percent){},
                description: '上传进度时回调'
            }, {
                key: 'onComplete',
                value: function(self, result){},
                description: '上传完成时回调'
            }, {
                key: 'onFail',
                value: function(self, error){},
                description: '上传失败时回调'
            }, {
                key: 'onRemove',
                value: function(self, fileId){},
                description: '删除已传文件时回调'
            }, {
                key: 'onCancel',
                value: function(self, fileId){},
                description: '取消上传时回调'
            }]
        };
        Object.assign(options, opts);
        super(options);
    }
}
Lego.components('com_upload', View);
export default View;
