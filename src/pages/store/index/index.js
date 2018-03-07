
import BasePage from '../../BasePage'
import { locationAuth } from '../../../decorator'
import { storePresenter } from '../../../presenter'
import _ from 'lodash'

@locationAuth(true)
class StorePage extends BasePage{
	constructor(){
		super()
	}

	data = {
		stores: [],
		showDistance: false
	}

	_onLoad = async function(options){
		if(!_.isNil(this.location)){
			this.setData({
				showDistance: true
			})
		}
		
		this._showLoading({})
		await this._getStoreList()
		this._hideLoading()
	}

	_getStoreList = async function(){
		const {success, data, message} = await storePresenter.storeList(null, this.location)
		if(!success){
			this._showError({title: '提示', message})
			return
		}
		const {stores = []} = data
		this.setData({
			stores
		})
		console.log('data===>', this.data)
	}

	itemTouch = function(e){
		const {detail = {}} = e
		const {itemData} = detail
		if(!_.isNil(itemData)){
			// console.log('item itemData===>', itemData)
			let storeInfo = JSON.stringify(itemData)
			wx.navigateTo({
				url: `../mapDetail/mapDetail?storeInfo=${storeInfo}`
			})
		}
	}

	scanTouch = this._scanTouch
}
const storePage = new StorePage()
Page(storePage)