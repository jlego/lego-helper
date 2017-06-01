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
Lego.components('detail', View);
export default View;`;
