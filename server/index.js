const express = require('express');
const colors = require('colors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');
const port = process.env.PORT || 3000;

const app = express();

const main = async () => {
	try {
		
		await connectDB();
		
		app.use('/graphql', graphqlHTTP({
			schema,
			graphiql: process.env.NODE_ENV === 'development'
		}))

		app.listen(port, console.log(`Server running on port ${port}`.yellow.bold));

	} catch (error) {
		console.log('Server Error ', error.message.red.bold);
	}
}

main()