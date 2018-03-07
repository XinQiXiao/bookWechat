
import { restApi, storageApi } from '../libs'
import _ from 'lodash'

class StorePresenter{

	/**
	 * 获取门店列表（通过isbn_id[非必须]）
	 * @param  {Number} isbn_id {书的isbn_id, 没有传null}
	 * @param  {Object} location  {位置，没有传null}
	 * @param  {Object} page  {翻页}
	 * @param  {Object} sort_by  {排序，现在默认传null}
	 * @return {Object}           
	 */
	storeList = async function(isbn_id = null, location = null, page = null, sort_by = null ){
		if(_.isNil(page)){
			page = {limit: 15}
		}else{
			const {limit = 15, next_key = 0} = page
			page.limit = limit
			page.next_key = next_key
		}
		try{
			const hqxUser = await storageApi.getUserInfo()
			let repData = {hqxUser, page, isbn_id, location, sort_by}
			if(!_.isNil(location)){
				const {longitude, latitude} = location
				repData.coords = {lng: longitude, lat: latitude}
			}
			const data = await restApi.storeList(repData)
			return {success: true, data}
		}catch(e){
			return {success: false, message: e.message}
		}
	}

}

const storePresenter = new StorePresenter()
export default storePresenter