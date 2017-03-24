using ActiveNetwork.Entities;

namespace ActiveNetwork.Repository
{
    public partial class ANEventImageRepository : BaseRepository<ANEventImage, ANDBEntities>, IANEventImageRepository
    {
        public ANEventImageRepository(IBaseUnitOfWork<ANDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(ANEventImage model)
        {
            return model.Id;
        }
	}
}

