var mongoose = require('mongoose');
var _ = require('underscore');

var DomoModel;

var setName = function(name) {
	return _.escape(name).trim();
};

var setJob = function(job) {
	return _.escape(job).trim();
};

var DomoSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		set: setName
	},
	
	age: {
		type: Number,
		min: 0,
		required: true
	},
	
	job: {
		type: String,
		required: false,
		trim: true,
		set: setJob
	},
	
	owner: {
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Account'
	},
	
	createdData: {
		type: Date,
		default: Date.now
	}
});

DomoSchema.methods.toAPI = function() {
	return {
		name: this.name,
		age: this.age,
		job: this.job
	};
};

DomoSchema.statics.findByOwner = function(ownerId, callback) {
	var search = {
		owner: mongoose.Types.ObjectId(ownerId)
	};
	
	return DomoModel.find(search).select("name age job").exec(callback);
};

DomoSchema.statics.findByName = function(ownerId, name, callback) {
    var search = {
		owner: mongoose.Types.ObjectId(ownerId),
        name: name
    };

    return DomoModel.findOne(search).select("name age job").exec(callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;