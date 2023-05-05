const graphQl = require('graphql');

module.exports = graphQl.buildSchema(`
    type Product{
        _id:ID!
        name:String!
        quantity:Int!
    }

    type User{
        _id: ID!
        name: String!
        email: String!
        password: String!
        status: String!
        products: [Product!]!
    }
    type AuthData{
        token: String!
        userId: String!
    }

    input UserInputData{
        email:String!
        name:String!
        password:String!
    }
    input UserLoginInputData{
        email:String!
        password:String!
    }

    type RootMutation{
        createUser(userInput: UserInputData) : User!
    }

    type RootQuery{
        login(userLoginInput: UserLoginInputData): AuthData!
    }

    schema{
        query: RootQuery
        mutation: RootMutation
    }
`)