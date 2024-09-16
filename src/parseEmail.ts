import { MiddlewareObj } from '@middy/core';
import aws from 'aws-sdk';
import { simpleParser } from 'mailparser';
import { inspect } from 'util';

const s3 = new aws.S3();

const parseEmail = (): MiddlewareObj => ({
  before: async (handler: any): Promise<void> => {
    try {
      const rawMail: any = await s3
        .getObject({
          Bucket: handler.event.detail.bucket.name,
          Key: handler.event.detail.object.key
        })
        .promise();
      console.log('S3 Key:', handler.event.detail.object.key)
      if (handler.event.detail.requester == 'ses.amazonaws.com') {
        console.log('Raw email:\n' + rawMail.Body);

        const parsedEmail = await simpleParser(rawMail.Body);
        console.log('Parsed Email:\n', inspect(parsedEmail, {depth: null}));
        handler.event.email = parsedEmail;
      } else {
        console.log('Requester is not SES');
        console.log('Raw File:', rawMail)
        handler.event.file = rawMail
      }
    } catch (err) {
      console.log('Error occurred: ', err);
    }
  }
});

export default parseEmail;
