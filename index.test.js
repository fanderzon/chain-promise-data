import chainPromiseData from './index';

const user = { id: 1, name: 'Chainy McChainFace'};

function createUser() {
  return Promise.resolve(user);
}

describe('chainPromiseData', () => {
  it('Should return a function', () => {
    expect(typeof chainPromiseData(createUser)).toBe('function');
  });
  it('Should apply a mapper function if provided', () => {
    chainPromiseData(
      createUser,
      ({ id, name }) => ({ userId: id, userName: name })
    )()
      .then(data => {
        expect(data.userId).toBe(user.id);
        expect(data.userName).toBe(user.name);
      });
  });
  it('Should apply a filter array if provided', () => {
    chainPromiseData(
      createUser,
      ['name']
    )()
      .then(data => {
        expect(data.id).toBeUndefined();
        expect(data.name).toBe(user.name);
      });
  })
});