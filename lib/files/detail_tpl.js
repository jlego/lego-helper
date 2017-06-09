'use babel';
import Util from '../util';

export default `/**
* 视图类: 详情
* 作者: ${atom.config.get('lego-helper.author')}
* 创建日期: ${Util.getNowDate()}
*/
import Data from '../data/data';

class View extends Lego.UI.Baseview {
    constructor(opts = {}) {
        const options = {
            dataSource: {
                api: 'detail',
                server: Data,
                detail: {
                    body: {
                        data: {
                            id: opts.detailId
                        }
                    }
                }
            }
        };
        Object.assign(options, opts);
        super(options);
    }
    components(){
        let opts = this.options;
        if(opts.data){
            this.addCom([{
                el: '#formsId',
                showSubmit: false,
                layout: 'inline',
                style: {
                    margin: 20
                },
                data: [{
                    label: '名称',
                    component: {
                        comName: 'editcom',
                        name: 'name',
                        size: 'sm',
                        text: opts.data.name,
                        components: [{
                            comName: 'inputs',
                            onChange(self, value){
                                this.context.close(value);
                                Lego.UI.Util.saveRecrod(Data, 'update', {
                                    id: opts.detailId,
                                    name: value
                                }, '修改');
                            }
                        }]
                    }
                }
            }]);
        }
    }
    render() {
        let opts = this.options;
        return hx \`<div><forms id="formsId"></forms></div>\`;
    }
}
Lego.components('detail', View);
export default View;`;
