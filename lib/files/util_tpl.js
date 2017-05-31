'use babel';
import Util from '../util';

export default `/**
 * 函数库
 * 作者: ${atom.config.get('lego-helper.author')}
 * 创建日期: ${Util.getNowDate()}
 */
Lego.ns('Lego.在此输入类名称.Util', {
    // XXX函数
    fun(opts) {
        return true;
    }
});`;
