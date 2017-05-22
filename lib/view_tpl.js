'use babel';
export default `
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
export default View;
`;
