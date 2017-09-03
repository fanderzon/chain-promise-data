import chainPromiseData from './index';

const user = { id: 1, name: 'Chainy McChainFace'};
const food = { food: 'Burger' };

function createUser() {
  return Promise.resolve(user);
}

function makeFood() {
  return Promise.resolve(food);
}

function returnsNothing() {
  return Promise.resolve();
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
  });
  it('Should hold on to data through longer chains', () => {
    createUser()
      .then(chainPromiseData(makeFood))
      .then(chainPromiseData(returnsNothing))
      .then(data => {
        expect(data.id).toBe(user.id);
        expect(data.name).toBe(user.name);
        expect(data.food).toBe(food.food);
      })
  });
});