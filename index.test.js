import chainPromiseData from './index';

function createUser() {
  return Promise.resolve({ id: 1, name: 'Chainy McChainFace'});
}

describe('chainPromiseData', () => {
  it('Should return a function', () => {
    expect(typeof chainPromiseData(createUser)).toBe('function');
  });
});