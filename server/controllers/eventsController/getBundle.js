// getBundle.js
var eventModels = require('../../models/eventModels');

module.exports = (req, res) => {
	if (!req.body.location || !req.body.userId) {
		res.status(400).send('Invalid Input');
		return;
	}
	eventModels.bundle(req.body.userId, req.body.location)
	.then( events => {
		var events2 = []
		events.forEach(function(event){
			if (event.endTime > new Date()) {
				events2.push(event);
			}
		})
		res.status(200).send(events2);
	})
	.catch( error => {
		console.log(error);
		res.status(400).send('An error occured');
	})
}
