import { bridge, query, createScene, createLight } from '../../test-utils';

describe('Scene resolver', () => {
  let scene, endpoint;

  beforeEach(() => {
    scene = createScene();
    endpoint = bridge.get('/scenes/KseUksCEskA9Al2').reply(200, scene);
  });

  afterEach(() => {
    endpoint.done();
  });

  it('works', async () => {
    const { hue } = await query`{
      hue {
        scene(id: "KseUksCEskA9Al2") {
          name id
        }
      }
    }`;

    expect(hue.scene).toEqual({
      id: 'KseUksCEskA9Al2',
      name: scene.name,
    });
  });

  it('resolves light data when requested', async () => {
    const endpoints = [
      bridge.get('/lights/41').reply(200, createLight()),
      bridge.get('/lights/42').reply(200, createLight()),
    ];

    const result = await query`{
      hue {
        scene(id: "KseUksCEskA9Al2") {
          lights { id name }
        }
      }
    }`;

    expect(result.hue.scene.lights).toEqual([
      { id: '41', name: 'Light name' },
      { id: '42', name: 'Light name' },
    ]);

    endpoints.forEach(endpoint => endpoint.done());
  });
});
