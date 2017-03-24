using ActiveNetwork.Entities;

namespace ActiveNetwork.Repository
{
    public partial class ANEventRequestToJoinRepository : BaseRepository<ANEventRequestToJoin, ANDBEntities>, IANEventRequestToJoinRepository
    {
        public ANEventRequestToJoinRepository(IBaseUnitOfWork<ANDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(ANEventRequestToJoin model)
        {
            return model.Id;
        }
	}
}

