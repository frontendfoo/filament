import graphqlHttp from 'express-graphql';
import express from 'express';
import rc from 'rc';

import * as queries from './queries';
import schema from './schema';

const config = rc('filament', {
  host: '0.0.0.0',
  graphiql: true,
  port: 8080,
});

const graphqlEndpoint = graphqlHttp({
  graphiql: config.graphiql === true,
  rootValue: queries,
  schema,
});

const app = express();
app.use(graphqlEndpoint);

app.listen(config.port, config.host);