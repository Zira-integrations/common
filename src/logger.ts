import { MiddlewareObj } from '@middy/core';

const logger = (): MiddlewareObj => {
  let successes = 0;
  let failures: any[] = [];
  return {
    before: function (handler: any): void {
      handler.event.addSuccess = () => {
        successes++;
      };
      handler.event.addFailure = (reason: string, failData: any) => {
        console.warn(reason, 'DATA::', failData);
        failures.push(failData);
      };
    },
    after: function (): void {
      console.log({ successCount: successes });
      console.log({ failureCount: failures.length });
      console.log({ failures: failures });
    }
  };
};

export default logger;
