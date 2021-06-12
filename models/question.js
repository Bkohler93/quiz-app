const mongoose = require("mongoose")
const Schema = mongoose.Schema

const questionSchema = new Schema(
	{
		number: {
			type: Number,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		answerA: {
			type: String,
			required: true,
		},
		answerB: {
			type: String,
			required: true,
		},
		answerC: {
			type: String,
			required: true,
		},
		answerD: {
			type: String,
			required: true,
		}

	}
)