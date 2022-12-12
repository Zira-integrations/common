
import { MiddlewareObj } from '@middy/core'
import aws from 'aws-sdk'
import { simpleParser } from 'mailparser'


const s3 = new aws.S3();


export const parseEmail = (): MiddlewareObj => ({
    before: async (handler: any): Promise<void> => {
        try {
            const rawMail: any = await s3
                .getObject({
                    Bucket: handler.event.detail.bucket.name,
                    Key: handler.event.detail.object.key,
                })
                .promise();
            console.log("Raw email:\n" + rawMail.Body);

            const parsedEmail = await simpleParser(rawMail.Body);
            console.log("Parsed Email: ", parsedEmail);
            handler.event.email = parsedEmail
        } catch (err) {
            console.log("Error occurred: ", err);
        }
    }
})
