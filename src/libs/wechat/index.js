
class WechatApi{
	/****** 网络 ******/
	request(options){
		return _wrapwx(wx.request, options)
	}
	/************/

	/****** UI ******/
	showModal(options){
		return _wrapwx(wx.showModal, options)
	}
	showToast(options){
		return _wrapwx(wx.showToast, options)
	}
	showLoading(options){
		if(wx.showLoading){
			wx.showLoading(options)
		}
	}
	hideLoading(){
		if(wx.hideLoading){
			wx.hideLoading()
		}
	}
	/************/

	/****** 位置 ******/
	async getLocation(options){
		return _wrapwx(wx.getLocation, {
			type: 'gcj02',
			...options
		})
	}
	/************/

	/****** 设备、设置、扫码 ******/
	async getSystemInfo(options){
		try{
			return await _wrapwx(wx.getSystemInfo, options)
		}catch(e){
			console.log('getSystemInfo e===>', e)
		}
		return null
	}

	authorize(options){
		if(wx.authorize)
			return _wrapwx(wx.authorize, options)
		else 
			return new Promise((resolve, reject) => {
				resolve('')
			})
	}

	getSetting(){
		if(wx.getSetting){
			return _wrapwx(wx.getSetting)
		} else {
			return new Promise((resolve, reject) => {
				resolve({authSetting: {'scope.userInfo': true, 'scope.userLocation': true} })
			})
		}
	}

	async openSetting(){
		try{
			if(wx.openSetting){
				return await _wrapwx(wx.openSetting)
			}
		}catch(e){
			console.log('wechat openSetting fail e===>', e)
		}
		return null
	}

	scanCode(options){
		if(wx.scanCode){
			return _wrapwx(wx.scanCode, options)
		} 
		return null
	}
	/************/

	/****** 登录、授权 ******/
	login(){
		return _wrapwx(wx.login)
	}

	async checkSession(){
		try{
			return await _wrapwx(wx.checkSession)
		}catch(e){
			console.log('checkSession e===>', e)
		}
		return null
	}
	/************/

	/****** 存储 ******/
	async setStorage(options){
		return await _wrapwx(wx.setStorage, options)
	}
	async getStorage(options){
		try{
			return await _wrapwx(wx.getStorage, options)
		}catch(e){

		}
		return null
	}
	async removeStorage(options){
		return await _wrapwx(wx.removeStorage, options)
	}
	async clearStorageSync(options){
		return await _wrapwx(wx.clearStorageSync, options)
	}
	/************/
}

function _wrapwx(wxapi, options={}){
	return new Promise((resolve, reject) => {
		options.success = (res) =>{
			const {errMsg, ...rest} = res 
			resolve(rest)
		}
		options.fail = (e) => {
			e.message = e.errMsg
			reject(e)
		}
		try{
			wxapi.call(this, options)
		}catch(e){
			reject(e)
		}
	})
}

const wechatApi = new WechatApi();
export default wechatApi