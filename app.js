const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const graphQlSchema = require('./graphQl/schema');
const graphQlResolvers = require('./graphQl/resolvers');


app.use(bodyParser.json());

mongoose.connect('mongodb+srv://crud:DsAIUahDoaD6m6cB@crud.fg66fgt.mongodb.net/GRAPHQL?retryWrites=true&w=majority').then(() => {
    console.log('Database connected successfully!')
}).catch(() => {
    console.log("Connection Failed");
});

app.use('/graphql', graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
    customFormatErrorFn(err) {
        if (!err.originalError) {
            return err;
        }
        const data = err.originalError.data;
        const message = err.message || 'An error occured';
        const code = err.originalError.code || 500;
        return { message: message, status: code, data: data };
    }
})
);

app.listen(3000);