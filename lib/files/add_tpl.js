'use babel';
import Util from '../util';

export default `/**
 * 视图类: 创建
 * 作者: ${atom.config.get('lego-helper.author')}
 * 创建日期: ${Util.getNowDate()}
 */
class View extends Lego.UI.Baseview {
    constructor(opts = {}) {
        const options = {

        };
        Object.assign(options, opts);
        super(options);
    }
    components(){
        let opts = this.options;
        this.addCom([{
            el: '#formsId',
            layout: 'inline',
            style: {
                marginRight: '10%',
                marginLeft: 20
            },
            data: [{
                label: '字段名称',
                rule: {
                    required: true
                },
                message: {
                    required: '请先填写名称'
                },
                component: {
                    comName: 'inputs',
                    name: 'name'
                }
            }],
            submitEl: this.options.context.$('button.ok:not(:disabled)'),
            onSubmit(self, data) {
                let params = {body: {data: data}};
                Lego.UI.Util.saveRecrod(Data, 'add', {data: data}, function(result){
                    Lego.UI.message('success', '创建成功');
                    let listView = Lego.getView('#tablesId');
                    if(listView) listView.fetch();
                    self.close();
                });
            }
        }]);
    }
    render() {
        let opts = this.options;
        return hx \`<div><forms id="formsId"></forms></div>\`;
    }
}
Lego.components('create', View);
export default View;`;
