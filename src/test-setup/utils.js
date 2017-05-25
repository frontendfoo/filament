import { graphql } from 'graphql';
import nock from 'nock';

import { url } from '../utils';
import schema from '../schema';

export const query = ([request]) => graphql(schema, request);

export const bridge = nock(url());

export const createLight = (fields = {}) => ({
  uniqueid: '75:45:12:38:00:fa:0c:26-1b',
  type: 'Extended color light',
  manufacturername: 'Philips',
  swversion: '5.23.1.13452',
  name: 'Light name',
  modelid: 'LCT001',

  state: {
    xy: [0.3144, 0.3301],
    reachable: true,
    colormode: 'xy',
    effect: 'none',
    alert: 'none',
    hue: 34076,
    sat: 251,
    bri: 254,
    on: true,
    ct: 153,
  },

  ...fields,
});

export const createGroup = (fields = {}) => ({
  name: 'Group name',
  class: 'Hallway',
  lights: [1, 2],
  recycle: true,
  type: 'Room',

  action: {
    alert: 'select',
    colormode: 'ct',
    effect: 'none',
    xy: [0.5, 0.5],
    hue: 10000,
    sat: 254,
    bri: 254,
    on: true,
    ct: 250,
  },

  state: {
    'all_on': false,
    'any_on': true,
  },

  ...fields,
});