'use babel';
import Util from '../util';

export default `/**
 * 数据类: 类名称
 * 作者: ${atom.config.get('lego-helper.author')}
 * 创建日期: ${Util.getNowDate()}
 */
class Data extends Lego.UI.Basedata {
    constructor(opts = {}) {
        const options = {
            // 列表
            list: {
                url: '/api',
                body: {
                    page: {limit: 20, pageNum: 1},
                    sorts: [{}]
                },
                reset: true
            },
            // 创建
            save: {
                url: '/api/save',
            },
            // 更新
            update: {
                url: '/api/update',
            },
            // 删除
            delete: {
                url: '/api/delete'
            },
            // 详情
            detail: {
                url: '/api/detail/get',
                reset: true
            },
            // 上传token
            uploadToken: {
                url: Lego.config.uploadToken,
                reset: true
            },
            // 保存附件
            saveAttachment: {
                url: Lego.config.saveAttachment,
            },
        };
        Object.assign(options, opts);
        super(options);
    }
    uploadToken(result, view){
        if(result.data){
            return result.data.uploadToken;
        }
        return result;
    }
    list(result, view){
        if(result.data){
            view.options.pagination.totalCount = result.data.count;
            return result.data.items;
        }
        return [];
    }
    detail(result, view){
        if(result.data){
            return result.data;
        }
        return {};
    }
}
export default new Data();`;
