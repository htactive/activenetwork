using ActiveNetwork.Web.Mapper;
using ActiveNetwork.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using System.Threading;


namespace ActiveNetwork.Web.Controllers
{
    public class ANEventDetailController : BaseApiController
    {
        [Route("anevent-detail/get-event-detail"), HttpGet]
        public ANEventModel GetEventDetail(int Id)
        {
            var entity = this.ANDBUnitOfWork.ANEventRepository.GetAll().FirstOrDefault(x => x.Id == Id);
            if (entity == null) return null;
            return ANEventMapper.ToModel(entity);
        }

        [Route("anevent-detail/get-event-detail-header"), HttpGet]
        public ANEventDetailHeaderModel GetEventDetailHeader(int Id)
        {
            Thread.Sleep(2000);
            var entity = this.ANDBUnitOfWork.ANEventRepository.GetAll()
                .Include("ANEventInformations")
                .Include("ANEventImages")
                .Include("ANEventImages.Image")
                .FirstOrDefault(x => x.Id == Id);

            if (entity == null) return null;
            var firstInformation = entity.ANEventInformations.FirstOrDefault();
            var coverPhoto = entity.ANEventImages.FirstOrDefault(x => x.ANEventImageType == (int)Common.ANEventImageType.ANEventCoverImage);
            return new ANEventDetailHeaderModel()
            {
                EventID = entity.Id,
                EventTitle = firstInformation.Title,
                EventCoverPhoto = ImageMapper.ToModel(coverPhoto != null ? coverPhoto.Image : null)
            };
        }

        [Route("anevent-detail/get-event-detail-information"), HttpGet]
        public ANEventDetailInformationModel GetEventDetailInformation(int Id)
        {
            var entity = this.ANDBUnitOfWork.ANEventRepository.GetAll()
                .Include("ANEventInformations")
                .FirstOrDefault(x => x.Id == Id);
            if (entity == null) return null;
            var firstInformation = entity.ANEventInformations.FirstOrDefault();
            return new ANEventDetailInformationModel()
            {
                EventID = entity.Id,
                EventInformation = ANEventInformationMapper.ToModel(firstInformation != null ? 
                firstInformation : null),
            };
        }

        [Route("anevent-detail/get-event-detail-member"), HttpGet]
        public ANEventDetailMemberModel GetEventDetailMember(int Id)
        {
            var entity = this.ANDBUnitOfWork.ANEventRepository.GetAll()
                .Include("ANEventMembers")
                .FirstOrDefault(x => x.Id == Id);
            if (entity == null) return null;
            var firstInformation = entity.ANEventMembers.FirstOrDefault();
            return new ANEventDetailMemberModel()
            {
                EventId = entity.Id,
                ANEventMembers = ANEventMemberMapper.ToModel(firstInformation != null ?
                firstInformation : null),
            };
        }
    }
}