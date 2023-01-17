
import { MiddlewareObj } from '@middy/core'
import aws from 'aws-sdk'

const s3 = new aws.S3();


const getS3Object = (): MiddlewareObj => ({
    before: async (handler: any): Promise<void> => {
        try {
            const s3Object: any = await s3
                .getObject({
                    Bucket: handler.event.detail.bucket.name,
                    Key: handler.event.detail.object.key,
                })
                .promise();

            handler.event.s3Object = s3Object
        } catch (err) {
            console.log("Error occurred: ", err);
        }
    }
})

export default getS3Object