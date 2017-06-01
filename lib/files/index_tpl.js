'use babel';
import Util from '../util';

export default `/**
 * 视图类: 模块首页
 * 作者: ${atom.config.get('lego-helper.author')}
 * 创建日期: ${Util.getNowDate()}
 */
import Data from '../data/data';
import '../asset/index.scss';

class IndexView extends Lego.UI.Baseview {
    constructor(opts = {}){
        let options = {
            animateIn: 'fadeIn'
        };
        Object.assign(options, opts);
        super(options);
    }
    components(){
        let opts = this.options,
            that = this;
        this.addCom({
            el: '#listId'
        });
    }
    render(){
        let opts = this.options;
        return hx\`
        <div class="page-container">
          <h1 class="page-title">\${opts.title}</h1>
          <div class="page-panel" id="moduleId">
              <div class="page-content page-panel-bg">
                <list id="listId"></list>
              </div>
          </div>
        </div>
        \`;
    }
    renderAfter(){
        let opts = this.options;
        if (opts.animateIn) Lego.UI.Util.animateCss(this.$el, opts.animateIn);
    }
}
export default IndexView;`;
