using ActiveNetwork.Entities;

namespace ActiveNetwork.Repository
{
    public partial class UserProfileRepository : BaseRepository<UserProfile, ANDBEntities>, IUserProfileRepository
    {
        public UserProfileRepository(IBaseUnitOfWork<ANDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(UserProfile model)
        {
            return model.Id;
        }
	}
}

