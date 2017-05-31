'use babel';
import Util from '../util';

export default `/**
 * 视图类: 列表
 * 作者: ${atom.config.get('lego-helper.author')}
 * 创建日期: ${Util.getNowDate()}
 */
import Data from '../data/data';
import Listheader from './header';

class ListView extends Lego.UI.Baseview {
    constructor(opts = {}){
        let options = {};
        Object.assign(options, opts);
        super(options);
    }
    components(){
        let opts = this.options;
        this.addCom([{
            el: '#tablesId',
            className: 'table-striped',
            style: {
                height: '100%'
            },
            rowSelection: {
                type: 'checkbox'
            },
            pagination: {
                pageRang: 5,
                pageSize: 20,
                onChange(self, num){
                    self.options.context.fetch({ body: {page: {pageNum: num}}});
                },
                onPageSizeChange(self, num){
                    self.options.context.fetch({ body: {page: {pageNum: 1, limit: num}}});
                }
            },
            showHeader: true,
            showSetting: true,
            title: hx\`<listheader id="listheaderId"></listheader>\`,
            onSetting(self, event){
                Lego.UI.Util.showTableSetting(Data, self, event);
            },
            onSelect(self, selectedArr){
                Lego.Eventer.trigger('showToolbar', selectedArr.length);
            },
            dataSource: {
                api: 'list',
                server: Data
            },
            columns(self){
                return [{
                    title: '名称',
                    dataIndex: 'name',
                    key: 'name',
                    width: '300px',
                    format(val, row, col){
                        return hx\`<a href="#/module_name/read/\${row.id}">\${val}</a>\`;
                    }
                }, {
                    title: '用户数',
                    dataIndex: 'userCount',
                    key: 'userCount',
                    width: '150px'
                }, {
                    title: '创建者',
                    dataIndex: 'displayName',
                    key: 'displayName',
                    width: '200px'
                }, {
                    title: '创建时间',
                    dataIndex: 'createdDate',
                    key: 'createdDate',
                    width: '250px',
                    format(val, row, col){
                        return moment(val).format("YYYY-MM-DD hh:mm:ss");
                    },
                    sorter(self, col){
                        Lego.UI.Util.sorterFun(Data, self, 't.createdDate', col.sortOrder);
                    }
                }, {
                    title: '操作',
                    dataIndex: 'operate',
                    key: 'operate',
                    width: '300px',
                    format(val, row, col){
                        return hx\`
                        <div>
                            <a href="#/module_name/delete/\${row.id}">删除</a> |
                        </div>
                        \`;
                    }
                }];
            },
            components: [{
                el: '#listheaderId'
            }]
        }]);
    }
    render(){
        let opts = this.options;
        return hx\`
        <div style="height:100%">
          <tables id="tablesId"></tables>
        </div>
        \`;
    }
}
Lego.components('list', ListView);
export default ListView;`;
