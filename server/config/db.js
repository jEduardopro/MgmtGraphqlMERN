const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB connected ${conn.connection.host}`.cyan.underline.bold);
	} catch (error) {
		console.log('Connection Error', error.message.red.bold);
	}
}

module.exports = connectDB;