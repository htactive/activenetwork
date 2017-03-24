using ActiveNetwork.Entities;

namespace ActiveNetwork.Repository
{
    public partial class ANEventInformationRepository : BaseRepository<ANEventInformation, ANDBEntities>, IANEventInformationRepository
    {
        public ANEventInformationRepository(IBaseUnitOfWork<ANDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(ANEventInformation model)
        {
            return model.Id;
        }
	}
}

