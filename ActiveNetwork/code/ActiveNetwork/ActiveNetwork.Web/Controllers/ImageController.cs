using ActiveNetwork.Common;
using ActiveNetwork.Web.Models;
using HTActive.Authorize.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Net;
using System.Net.Http;
using ActiveNetwork.Web.Mapper;

namespace ActiveNetwork.Web.Controllers
{
    public class ImageController : BaseApiController
    {
        [Route("image/upload-new-image"), HttpPost]
        [HTActiveAuthorize(Roles = ANRoleConstant.USER)]
        public async Task<ImageModel> UploadNewImage()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                return null;
            }
            var currentProfile = this.ANDBUnitOfWork.UserProfileRepository.GetAll().FirstOrDefault(x => x.UserId.HasValue && x.UserId.Value == CurrentUser.Id);
            if (currentProfile == null) return null;
            var filesReadToProvider = await Request.Content.ReadAsMultipartAsync();

            if (filesReadToProvider.Contents.Count == 0) return null;
            var stream = await filesReadToProvider.Contents[0].ReadAsStreamAsync();
            var fileKey = string.Format("common/img/img_{0}.png", Guid.NewGuid().ToString());

            var image = await this.CreateNewImage(stream, fileKey);

            return ImageMapper.ToModel(image);
        }
    }
}