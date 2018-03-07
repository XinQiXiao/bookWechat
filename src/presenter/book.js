
import _ from 'lodash'
import { restApi } from '../libs'

class BookPresenter{

	/**
	 * 首页信息
	 */
	homeInfo = async function(){
		try{
			const data = await restApi.homeInfo()
			return {success: true, data}
		}catch(e){
			return {success: false, message: e.message}
		}
	}

}

const bookPresenter = new BookPresenter()
export default bookPresenter