// 
class AppPage{

	globalData = {

	}

	onLaunch(options){
		const {path, query, scene, shareTicket, referrerInfo} = options
		// console.log(`path=>${path} -- query=>${scene} -- shareTicket=>${shareTicket} 
		// -- referrerInfo=>${referrerInfo}`)
	}

	onError(e){
		console.log('app onError e===>', e)
	}

}
App(new AppPage())