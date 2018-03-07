
import _ from 'lodash'
import wechatApi from '../wechat'
import * as Constants from '../../constants'

// token
export async function getSessionToken(){
	const res = await wechatApi.getStorage({key: Constants.STORAGE_TOKEN_KEY})
	if(!_.isNil(res)){
		return res.data
	}
	return null
}

export async function setSessionToken(data){
	await wechatApi.setStorage({key: Constants.STORAGE_TOKEN_KEY, data})
}

export async function removeToken(){
	try{
		await wechatApi.removeStorage({key: Constants.STORAGE_TOKEN_KEY})
		return true
	}catch(e){
		console.log('storage removeToken fail e===>', e)
		return false
	}
}

// user info
export async function getUserInfo(){
	const res = await wechatApi.getStorage({key: Constants.STORAGE_USERINFO_KEY})
	if(!_.isNil(res)){
		return res.data
	}
	return null
}

export async function setUserInfo(data){
	await wechatApi.setStorage({key: Constants.STORAGE_USERINFO_KEY, data})
}

// total
export async function clearLocationStorage(){
	try{
		await wechatApi.clearStorageSync()
		return true
	}catch(e){

	}
	return false
}