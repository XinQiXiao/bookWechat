
Component({
	properties: {
		code: {
			type: String,
			value: ''
		},
		title: {
			type: String,
			value: ''
		},
		message: {
			type: String,
			value: ''
		},
		showMessage: {
			type: Boolean,
			value: false
		},
		des: {
			type: String,
			value: ''
		},
		showDes: {
			type: Boolean,
			value: false
		},
		showBottom: {
			type: Boolean,
			value: true
		}
	},
	data: {
		arrowIcon: '../../../sources/images/common/arrow_gray_right.png'
	},
	methods: {
		optionClick: function(e){
			const {currentTarget = {}} = e
			const {dataset = {}} = currentTarget
			let code = dataset.code ? dataset.code : ''
			let eventDetail = {code}
			let eventOptions = {}
			this.triggerEvent('optionTap', eventDetail, eventOptions)
		}
	}
})