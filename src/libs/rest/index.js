
import { pathDecorator as path } from '../../decorator'

export default class RestApi{
	constructor(setting){
		this.prefix = setting.prefix
		this.request = setting.request
	}

	@path('/user/wechat/codeLogin')
	async login(data){
		const { path } = this.attrs.login
		return await _request(this.request, {
			url: path,
			data
		})
	}

	@path('/business/book/homeInfo')
	async homeInfo(data){
		const {path} = this.attrs.homeInfo
		return await _request(this.request, {
			url: path,
			data
		})
	}

	@path('/business/book/storeListByIsbn')
	async storeList(data){
		const {path} = this.attrs.storeList
		return await _request(this.request, {
			url: path,
			data
		})
	}
}

async function _request(request, options = {}) {
	options.method = 'POST'
	options.dataType = 'json'
	options.header = {
			'content-type': 'application/json'
	}
	console.log(`${options.url} request===>`, options)
	const res = await request(options)
	console.log(`${options.url} response===>`, res)
	if (res.statusCode == 200) {
		// return res.data
		const {code = 0, msg, data, message} = res.data
		if (code == 0) {
			return data
		} else {
			throw new Error(msg || message)
		}
	} else {
		throw new Error(`请求返回[${res.statusCode}]`)
	}
}