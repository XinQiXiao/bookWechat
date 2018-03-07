
Component({
  properties: {
  },
  data: {
    scanIcon: '../../../sources/images/common/scan.png'
  },
  methods: {
    scanTap: function(e){
			let eventDetail = {}
			let eventOptions = {}
			this.triggerEvent('scanClick', eventDetail, eventOptions)
		}
  }
})