
import {wechatApi, storageApi, restApi} from '../libs'
import _ from 'lodash'

class UserPresenter{

	/**
	 * 登录
	 */
	logIn = async () =>{
		let res = await wechatApi.checkSession()
		let token = await storageApi.getSessionToken()
		if(_.isNil(res) || _.isNil(token)){
			res = await wechatApi.login()
			if(_.isNil(res)){
				return {success: false, message: 'wechat login api fail.'}
			}
			const {code} = res  
			token = await restApi.login({code})
			if(_.isNil(token)){
				return {success: false, message: 'api login fail'}
			}
			await storageApi.setSessionToken(token._AT)
		}
		let hqxUser = await storageApi.getUserInfo()
		if(_.isNil(hqxUser)){
			await storageApi.setUserInfo({
				"uid":5914,
				"hasWechatPhone":true,
				"hasPhone":true,
				"nickName":"你说呢",
				"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK2VaRw1OyJdbVI8LPqgKR8cntiafLoEhgzsswB9JXmOxNlO0UYqR7icoWwiaCepIAe6cFhYhia3qYfrQ/0"
			})
		}
		return {success: true, data: {}}
	}

	getUserLocation = async (options)=>{
		try{
			let res = await wechatApi.getSetting()
			if(!res.authSetting['scope.userLocation']){
				await wechatApi.authorize({scope: 'scope.userLocation'})
			}
		}catch(e){
			await wechatApi.openSetting()
			console.log('getUserLocation fail e===>', e)
		}
		try{
			return await wechatApi.getLocation(options)
		}catch(e){}
		return null
	}

}

const userPresenter = new UserPresenter()
export default userPresenter