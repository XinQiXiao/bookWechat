
import _ from 'lodash'
import { locationAuth } from '../../../decorator'
import BasePage from '../../BasePage'

const CALLOUT = {
	color: '#fff',
	bgColor: '#00000080',
	fontSize: 12,
	display: 'ALWAYS',
	padding: 5,
}
@locationAuth(true)
class MapDetail extends BasePage{
	constructor(){
		super()
	}

	data = {
	}

	_onLoad = function(options){

		const {storeInfo} = options
		if(!_.isNil(storeInfo))
			this.store = JSON.parse(storeInfo)

		const mapCtx = wx.createMapContext('storeMap')

		const { store = null, location = null } = this

		let points = []
		let markers = []
		if(!_.isNil(store)){
			points.push({
				latitude: store.location.latitude,
				longitude: store.location.longitude
			})
			markers.push({
				id: 0,
				latitude: store.location.latitude,
				longitude: store.location.longitude,
				callout: {
					...CALLOUT,
					content: store.name
				}
			})
		}

		if(!_.isNil(location)){
			points.push({
				latitude: location.latitude,
				longitude: location.longitude
			})
			markers.push({
				id: 1,
				latitude: location.latitude,
				longitude: location.longitude,
				callout: {
					...CALLOUT,
					content: '我的位置'
				}
			})
		}

		if(mapCtx.includePoints){
			mapCtx.includePoints({
				padding: [60, 60, 60, 60],
				points
			})
		}

		this.setData({
			markers
		})
		console.log('data===>', this.data)
	}

}
const mapDetail = new MapDetail()
Page(mapDetail)