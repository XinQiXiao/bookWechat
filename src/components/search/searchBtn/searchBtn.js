
Component({
	properties: {
		searchText: {
			type: String,
			value: ''
		}
	},
	data: {
		searchIcon: '../../../sources/images/home/search.png'
	}, 
	methods: {
		searchClick: function(e){
			let eventDetail = {}
			let eventOptions = {}
			this.triggerEvent('searchTouch', eventDetail, eventOptions)
		}
	}
})