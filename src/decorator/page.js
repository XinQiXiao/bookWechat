
function locationAuth(val){
	return (target) => {
		target.prototype.needLocationAuth = val
	}
}

module.exports = {
	locationAuth
}