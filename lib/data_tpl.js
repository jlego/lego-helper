'use babel';
import Util from './util';

export default `/**
 * 数据类: 类名称
 * 作者: 你的名称
 * ${Util.getNowDate()}
 */
class Data extends Lego.Data {
    constructor(opts = {}) {
        const options = {
        // 列表
        lists: {
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
    }
    lists(result, view){
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
