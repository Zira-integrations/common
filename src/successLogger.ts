import { MiddlewareObj } from '@middy/core';

const successLogger = (): MiddlewareObj => ({
  before: function (handler: any): void {
    handler.event.successes = 0;
    handler.event.failures = [];
    handler.event.addSuccess = () => {
      handler.event.successes++;
    }
    handler.event.addFailure = (failData: any) => {
      console.log('Failed with data:', failData)
      handler.event.failures.push(failData);
    }
  },
  after: function (handler: any): void {
    console.log({ successCount: handler.event.successes });
    console.log({ failureCount: handler.event.failures.length });
    console.log({ failures: handler.event.failures });
  }
});

export default successLogger;
