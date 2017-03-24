using ActiveNetwork.Entities;

namespace ActiveNetwork.Repository
{
    public partial class GenderRepository : BaseRepository<Gender, ANDBEntities>, IGenderRepository
    {
        public GenderRepository(IBaseUnitOfWork<ANDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(Gender model)
        {
            return model.Id;
        }
	}
}

