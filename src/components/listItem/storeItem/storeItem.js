
Component({
  properties: {
    item: {
			type: Object,
			value: {}
		},
		showDistance: {
			type: Boolean,
			value: false
		}
  },
  data: {
    locationIcon: '../../../sources/images/common/location.png'
  },
  methods: {
    itemTap: function(e){
			const {currentTarget = {}} = e
			const {dataset = {}} = currentTarget
			let itemData = dataset.item ? dataset.item : null
			let eventDetail = {itemData}
			let eventOptions = {}
			this.triggerEvent('itemClick', eventDetail, eventOptions)
		}
  }
})