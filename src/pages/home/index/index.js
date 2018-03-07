
import BasePage from '../../BasePage'
import {userPresenter, bookPresenter} from '../../../presenter'

class HomeIndex extends BasePage{
	constructor(){
		super()
	}

	data = {

	}

	onLoad = function(options){
		
	}

	onShow = async function(){
		this._showLoading({})
		await this._login()
		await this._getHomeInfo()
		
		this._hideLoading()
	}

	_login = async function(){
		const {success, data, message} = await userPresenter.logIn()
		if(!success){
			this._showError({title: '提示', message})
		}
		return
	}

	_getHomeInfo = async function(){
		const {success, data, message} = await bookPresenter.homeInfo()
		if(!success){
			this._showError({title: '提示', message})
		}
		console.log(data)
	}

	searchTap = function(e){
		console.log('searchTap e===>', e)
	}

	scanTouch = this._scanTouch

}
const homeIndex = new HomeIndex()
Page(homeIndex)