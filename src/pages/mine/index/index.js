
import BasePage from '../../BasePage'
import {storageApi} from '../../../libs'
import { COMMON_SERVICE_TEL } from '../../../constants'
import _ from 'lodash'

const MINE_HEADER_ICON = '../../../sources/images/mine/mine_header.png'
const CASH_CODE = 'mine_cash'
const VIP_CODE = 'mine_vipcard'
const COUPON_CODE = 'mine_coupon'
const INVITE_CODE = 'mine_invite'
const HISTORY_CODE = 'mine_history'
const SERVICE_CODE = 'mine_service'
const STORAGE_CODE = 'mine_storage'

class MinePage extends BasePage{
	constructor(){
		super()
	}

	data = {
		headerUrl: '',
		defaultHeaderUrl: MINE_HEADER_ICON,
		userName: '用户名',
		serviceTel: COMMON_SERVICE_TEL,

		cash: CASH_CODE,
		vip: VIP_CODE,
		coupon: COUPON_CODE,
		invite: INVITE_CODE,
		history: HISTORY_CODE,
		service: SERVICE_CODE,
		storage: STORAGE_CODE
	}

	onLoad = async function(options){
		 
	}

	onShow = async function(){
		await this._getUserInfo()
	}

	_getUserInfo = async function(){
		try{
			this._showLoading({})
			const userInfo = await storageApi.getUserInfo()
			console.log('mine userInfo==>', userInfo)
			this._hideLoading()

			if(_.isNil(userInfo)){
				const res = await this._showOptionDlg({
					title: '提示', message: '获取用户信息失败', showCancel: false
				})
				if(res.confirm){
					wx.switchTab({
						url: '../../home/index/index'
					})
				}
				return
			}
			const {nickName = '', avatarUrl = ''} = userInfo
			this.setData({
				userName: nickName,
				headerUrl: avatarUrl
			})
		}catch(e){
			console.log('_getUserInfo e===>', e)
		}
		return
	}

	optionTouch = function(e){
		const {detail = {}} = e
		const {code = ''} = detail
		switch(code){
			case CASH_CODE: 
				console.log('押金')
				break;
			case VIP_CODE: 
				console.log('畅读服务')
				break;
			case COUPON_CODE: 
				console.log('优惠券')
				break;
			case INVITE_CODE: 
				console.log('邀请')
				break;
			case HISTORY_CODE: 
				console.log('历史')
				break;
			case SERVICE_CODE: 
				console.log('服务')
				break;
			case STORAGE_CODE: 
				console.log('缓存')
				break;
			default: 
				console.log('code type not find.')
				break;
		}
	}

	scanTouch = this._scanTouch

}
const minePage = new MinePage()
Page(minePage)