'use babel';

import Lego from 'lego-core';
import 'lego-ui';

class LegoView extends Lego.UI.Baseview {
    constructor(opts = {}) {
        let options = {
            title: '隐藏'
        };
        Object.assign(options, opts);
        super(options);
    }
    render() {
        return hx `
        <div class="lego-view">
        The LegoHelper package is Alive! It\'s ALIVE!
        </div>
        `;
    }
    // Returns an object that can be retrieved when package is activated
    serialize() {

    }
    destroy() {
        this.remove();
    }
    getElement() {
        return this.el;
    }
}
export default LegoView;
