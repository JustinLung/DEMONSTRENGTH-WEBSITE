import { GraphQLClient } from 'graphql-request';
import { __dirname } from './constants.mjs';
import dotenv from 'dotenv';

dotenv.config({
  path: __dirname + '/.env',
});


export const client = new GraphQLClient(process.env.DATO_URL || '', {
  headers: {
    Authorization: `Bearer ${process.env.DATO_KEY}`,
  },
});
