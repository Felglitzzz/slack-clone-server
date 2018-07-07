import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema';
import resolvers from './resolvers';

export const myGraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

const graphqlEndpoint = '/graphql';

// bodyParser is needed just for POST.
app.use(graphqlEndpoint, bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

const PORT = 3000;
app.listen(PORT);
