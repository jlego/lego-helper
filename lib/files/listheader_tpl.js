'use babel';
import Util from '../util';

export default `/**
 * 视图类: 表头
 * 作者: ${atom.config.get('lego-helper.author')}
 * 创建日期: ${Util.getNowDate()}
 */
import Data from '../data/data';
import '../asset/list_header.scss';

class HeaderView extends Lego.UI.Baseview {
    constructor(opts = {}) {
        const options = {
            listener: {
                showToolbar(data){
                    this.options.showToolbar = !!data;
                }
            },
            events: {
                'click #removeBtn': 'removeFun'
            }
        };
        Object.assign(options, opts);
        super(options);
    }
    components(){
        let that = this,
            opts = this.options;
        this.addCom([{
            el: '#searchId',
            placeholder: '搜索',
            style: {
                width: 200,
                marginRight: 10
            },
            onSearch(self, result) {
                let listView = this.context.options.context;
                listView.options.pagination.current = 1;
                listView.fetch({ body: {
                    page: {
                        pageNum: 1
                    },
                    filters: [{
                        operation: "like",
                        property: "_role.name",
                        value: result.keyword
                    }]
                }});
            }
        }, {
            el: '#addbtnId',
            type: 'success',
            html: '创建xx',
            onClick(self){
                window.location.hash = '#/module_name/add';
            }
        }]);
    }
    render() {
        const opts = this.options;
        const vDom = hx\`
        <div class="row">
            <div class="col-sm-6">
            \${opts.showToolbar ? hx\`<div class="listToolbar">
                <a href="javascript:;" id="removeBtn">删除</a>
                </div>\` : hx\`<div class="listTitle"><h6>角色权限 </h6></div>\`
            }
            </div>
            <div class="col-xs-6" style="text-align:right">
                <div class="form-inline">
                  <div class="form-group">
                    <search id="searchId"></search>
                  </div>
                  <buttons id="addbtnId"></buttons>
                </div>
            </div>
        </div>
        \`;
        return vDom;
    }
    removeFun(event){
        let listView = Lego.getView('#tablesId');
        if(listView){
            let selectedArr = listView.getSelected();
            if(selectedArr.length){
                let ids = selectedArr.map(item => item.id);
                Lego.UI.modal({
                    msgType: 'warning',
                    title: '提示信息',
                    content: '你确定要删除选中的记录吗?',
                    onOk(self) {
                        Lego.UI.Util.saveRecrod(Data, 'remove', {ids: ids}, function(result){
                            Lego.UI.message('success', '删除成功');
                            listView.fetch();
                            self.close();
                        });
                    }
                });
            }
        }
    }
}
Lego.components('listheader', HeaderView);
export default HeaderView;`;
