import compose from '../index';

describe('compose', () => {
  it('should call each middleware, passing resolver args', () => {
    const spy = jest.fn();
    const middleware = compose(spy);
    const resolver = middleware();
    resolver('test');
    expect(spy).toHaveBeenLastCalledWith('test');
  });

  it('should call each middleware serially', async () => {
    const parent = {};
    const args = {};
    const context = {};
    const info = {};

    const firstMiddleware = (_, __, context) => {
      context.str = 'test';
    };
    const secondMiddleware = (_, __, context) => {
      context.str = 'test1';
    };
    const middleware = compose(firstMiddleware, secondMiddleware);
    const resolver = middleware(() => {});

    await resolver(parent, args, context, info);

    expect(context.str).toEqual('test1');
  });

  it('should support async middleware', async () => {
    const sleep = duration =>
      new Promise(resolve => {
        setTimeout(resolve, duration);
      });

    const middlewareSpy = jest.fn(async param => {
      await sleep(100);
    });
    const callbackSpy = jest.fn();

    const middleware = compose(middlewareSpy);
    const resolver = middleware(callbackSpy);

    await resolver('test');
    expect(callbackSpy).toHaveBeenCalled();
  });

  it('should return an error if something 💩', async () => {
    const middleware = compose(() => {
      throw new Error('error');
    });
    const resolver = middleware(() => {});

    const error = await resolver();
    expect(error).toEqual(new Error('error'));
  });
});
