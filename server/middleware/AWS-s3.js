const { S3 } = require('aws-sdk');
const uuid = require('uuid');

exports.s3upload = async (file) => {
    const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${uuid.v4()}-${file.originalname}`,
        Body: file.buffer
    };
    
    return await s3.upload(params).promise();
}
