using ActiveNetwork.Entities;

namespace ActiveNetwork.Repository
{
    public partial class UserRepository : BaseRepository<User, ANDBEntities>, IUserRepository
    {
        public UserRepository(IBaseUnitOfWork<ANDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(User model)
        {
            return model.Id;
        }
	}
}

