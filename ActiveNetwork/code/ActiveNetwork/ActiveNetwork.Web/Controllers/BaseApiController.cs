using ActiveNetwork.Entities;
using ActiveNetwork.Repository;
using Amazon.S3;
using Amazon.S3.Model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace ActiveNetwork.Web.Controllers
{
    public class BaseApiController : ApiController
    {
        protected static readonly string _awsAccessKey = ConfigurationManager.AppSettings["AWS_S3_AccessKey"];

        protected static readonly string _awsSecretKey = ConfigurationManager.AppSettings["AWS_S3_SecretKey"];

        protected static readonly string _bucketName = ConfigurationManager.AppSettings["AWS_S3_BucketName"];
        protected User CurrentUser
        {
            get
            {
                if (User == null || User.Identity == null || string.IsNullOrEmpty(User.Identity.Name)) return null;
                return this.ANDBUnitOfWork.UserRepository.GetAll().FirstOrDefault(x => x.Username == User.Identity.Name);
            }
        }
        private ANDBUnitOfWork andbUnitOfWork;

        protected ANDBUnitOfWork ANDBUnitOfWork
        {
            get { return andbUnitOfWork ?? (andbUnitOfWork = new ANDBUnitOfWork(new Entities.ANDBEntities())); }
        }

        private async Task UploadImageStreamToAWSS3(string s3FileKey, System.IO.Stream stream)
        {

            try
            {
                IAmazonS3 client;
                using (client = Amazon.AWSClientFactory.CreateAmazonS3Client(_awsAccessKey, _awsSecretKey, Amazon.RegionEndpoint.APSoutheast1))
                {
                    var request = new PutObjectRequest()
                    {
                        BucketName = _bucketName,
                        AutoResetStreamPosition = true,
                        AutoCloseStream = true,
                        CannedACL = S3CannedACL.PublicRead,
                        Key = s3FileKey,
                        InputStream = stream,
                        ContentType = "image/png"
                    };

                    var response = await client.PutObjectAsync(request);

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        protected async Task<Image> CreateNewImage(System.IO.Stream stream, string fileKey)
        {

            await this.UploadImageStreamToAWSS3(fileKey, stream);

            var image = new Image() { Id = 0, S3FileKey = fileKey };
            this.ANDBUnitOfWork.ImageRepository.Save(image);
            this.ANDBUnitOfWork.Commit();
            return image;
        }

    }
}