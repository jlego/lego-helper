'use babel';
import Util from '../util';

export default `/**
 * 视图类: 类名称
 * 作者: 你的名称
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
        this.addCom([]);
    }
    render() {
        let opts = this.options;
        return hx \`<div></div>\`;
    }
}
Lego.components('viewName', View);
export default View;`;
