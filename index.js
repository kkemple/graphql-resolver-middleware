// @flow
type MiddlewareInterface = (
  parent: Object,
  args: Object,
  context: Object,
  info: Object
) => Promise<void> | void;

type ResolverInterface = (
  parent: Object,
  args: Object,
  context: Object,
  info: Object
) => Promise<any>;

export default function compose(...middleware: Array<MiddlewareInterface>) {
  return function applyMiddleware(next: ResolverInterface) {
    return async function resolve(...params: Array<Object>) {
      try {
        for (const m: MiddlewareInterface of middleware) {
          await m(...params);
        }

        return next(...params);
      } catch (error) {
        return error;
      }
    };
  };
}
