using ActiveNetwork.Entities;

namespace ActiveNetwork.Repository
{
    public partial class ANEventRepository : BaseRepository<ANEvent, ANDBEntities>, IANEventRepository
    {
        public ANEventRepository(IBaseUnitOfWork<ANDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(ANEvent model)
        {
            return model.Id;
        }
	}
}

