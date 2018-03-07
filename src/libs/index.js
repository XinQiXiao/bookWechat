
import wechatApi from './wechat'
import * as storageApi from './storage'
import RestApi from './rest'
import * as config from '../config'
import _ from 'lodash'

const restApi = new RestApi({
	prefix: config.restRoot,
	request: wechatApi.request
})

_.forIn(restApi.attrs, (item) => {
	const { path = null} = item
	if(!_.isNull(path)){
		item.path = restApi.prefix + path
	}
})

module.exports = {
	wechatApi,
	storageApi,
	restApi
}