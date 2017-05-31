'use babel';
import Util from '../util';

export default `/**
 * 路由类: 类名称
 * 作者: ${atom.config.get('lego-helper.author')}
 * 创建日期: ${Util.getNowDate()}
 */
import Util from "lego-util";
import "./util/util";
import IndexView from './view/index';
import ListView from './view/list';
import DetailView from './view/detail';

class Router {
    constructor() {
        return {
            '/module_name': this.index.bind(this),
            '/module_name/add': [this.index.bind(this), this.create.bind(this)],    //创建
            '/module_name/read/:id': [this.index.bind(this), this.detail.bind(this)],    //详情
            '/module_name/edit/:id': [this.index.bind(this), this.update.bind(this)],    //编辑
            '/module_name/remove/:id': this.delete.bind(this)    //删除
        };
    }
    // 模块首页
    index(ctx, next) {
        if(!this.indexView){
            this.indexView = Lego.create(IndexView, {
                el: Lego.config.pageEl,
                title: '模块标题',
                scrollbar: {}
            });
        }
        next();
    }
    // 创建
    create(ctx, next){
        let id = ctx.params.id;
        Lego.UI.modal({
            type: 'layer',
            title: '创建xx',
            confirm: {
                msgType: 'warning',
                content: '确认离开，不保存数据',
                backdrop: true
            },
            okText: '保存',
            content: hx\`<create id="createId"></create>\`,
            components: [{
                el: '#createId'
            }],
            onCancel(self){},
            onClose(){
                page.redirect('/module_name');
            }
        });
    }
    // 编辑
    update(ctx, next){
        let id = ctx.params.id;
        Lego.UI.modal({
            type: 'layer',
            title: '编辑xx',
            confirm: {
                msgType: 'warning',
                content: '确认离开，不保存数据',
                backdrop: true
            },
            okText: '保存',
            content: hx\`<create id="createId"></create>\`,
            components: [{
                el: '#createId',
                detailId: id
            }],
            onCancel(self){},
            onClose(){
                page.redirect('/module_name');
            }
        });
    }
    // 详情
    detail(ctx, next){
        let id = ctx.params.id;
        Lego.UI.modal({
            type: 'layer',
            title: 'xx详情',
            content: hx\`<detail id="detailId"></detail>\`,
            components: [{
                el: '#detailId',
                detailId: id
            }],
            showFooter: false,
            onClose(){
                page.redirect('/module_name');
            }
        });
    }
    // 删除
    delete(ctx, next){
        page.redirect('/module_name');
        let id = ctx.params.id,
        listView = Lego.getView('#listId');
        if(listView){
            listView.delete(id);
        }
    }
}
Lego.router(new Router());`;
