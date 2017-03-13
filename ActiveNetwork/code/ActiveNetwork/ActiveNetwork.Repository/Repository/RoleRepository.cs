using ActiveNetwork.Entities;

namespace ActiveNetwork.Repository
{
    public partial class RoleRepository : BaseRepository<Role, ANDBEntities>, IRoleRepository
    {
        public RoleRepository(IBaseUnitOfWork<ANDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(Role model)
        {
            return model.Id;
        }
	}
}

