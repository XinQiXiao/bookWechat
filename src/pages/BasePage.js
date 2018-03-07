
import { wechatApi } from '../libs'
import { userPresenter } from '../presenter'
import _ from 'lodash'

export default class BasePage{
	constructor(){

	}

	location = null

	onLoad = async function(options){
		const { needLocationAuth } = this
		if(needLocationAuth){
			const res = await userPresenter.getUserLocation({ type: 'gcj02' })
			// console.log('location res===>', res)
			if(!_.isNil(res)){
				const {latitude, longitude} = res
				this.location = {latitude, longitude}
			}
		}
		if(this._onLoad){
			this._onLoad(options)
		}
	}

	/****** UI ******/
	_showLoading = function({title= '加载中', mask = true, ...rest}){
		wechatApi.showLoading({title, mask, ...rest})
	}

	_hideLoading = function(){
		wechatApi.hideLoading()
	}

	_showToast = function({title = '', image = '/sources/images/common/wonder_black.png', icon = null, ...rest}){
		if(_.isNull(icon)){
			wechatApi.showToast({
				title,
				image,
				...rest
			})
		}else{
			wechatApi.showToast({
				title,
				icon,
				...rest
			})
		}
	}

	_showError = async function({title = '错误提示', message = '未知错误', ...rest}){
		return await wechatApi.showModal({
			title,
			content: message,
			showCancel: false,
			...rest
		})
	}

	_showOptionDlg = async function({title = '', message = '未知消息', confirmText = '确认', cancelText = '取消', ...rest}){
		return await wechatApi.showModal({
			title,
			content: message,
			confirmText,
			cancelText,
			...rest
		})
	}
	/****** ******/

	/***** 扫码 *****/
	_scanTouch = function(e){
		console.log('_scanTouch e===>', e)
	}
	/****** ******/
}