import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_REGION,
});

const s3 = new AWS.S3();



export const getS3ObjectUrl = async (url) => {
  const { Bucket, Key } =await extractBucketAndKey(url);

  const params = {
    Bucket,
    Key,
    Expires: 60, // URL expiration time in seconds
  };
  return s3.getSignedUrlPromise('getObject', params);
};




 const extractBucketAndKey =async (url) => {
  const match = url.match(/^https:\/\/([^\.]+)\.s3\.([^\.]+)\.amazonaws\.com\/(.+)$/);
  if (!match) {
    throw new Error('Invalid S3 URL');
  }
  return {
    Bucket: match[1],
    Key: match[3],
  };
};


