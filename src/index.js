require('./db/mongoose')
const express=require('express')
const {graphqlHTTP}=require('express-graphql')
const graphqlSchema=require('./graphql/schema')
const graphqlResolver=require('./graphql/resolver')
const graphql_auth=require('./middleware/graphql-auth')


const PORT=3000
const app= express()
app.use(express.json())

app.use(graphql_auth)
app.use('/graphql',graphqlHTTP({
schema:graphqlSchema,
rootValue:graphqlResolver,
graphiql:true,
customFormatErrorFn(error)
{
    if(!error.originalError.code)
    {
        return error
    }
    const code=error.originalError.code
    const message=error.message||'an error occured'
    return ({message,status:code})
}
}))

app.listen(PORT,()=>{console.log('listening on port'+PORT)})