using ActiveNetwork.Entities;

namespace ActiveNetwork.Repository
{
    public partial class ANEventMemberRepository : BaseRepository<ANEventMember, ANDBEntities>, IANEventMemberRepository
    {
        public ANEventMemberRepository(IBaseUnitOfWork<ANDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(ANEventMember model)
        {
            return model.Id;
        }
	}
}

