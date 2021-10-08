import OSS from 'ali-oss'
const OSSClient = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAI5tCaviD9jE8NkYMUgk4y',
  accessKeySecret: 'axakmYu0PZfcoR2YtLFxeVHuO35S5Y',
  bucket: 'buyi-teacher'
})
export default OSSClient