using ActiveNetwork.Entities;

namespace ActiveNetwork.Repository
{
    public partial class ANEventUserFavouriteRepository : BaseRepository<ANEventUserFavourite, ANDBEntities>, IANEventUserFavouriteRepository
    {
        public ANEventUserFavouriteRepository(IBaseUnitOfWork<ANDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(ANEventUserFavourite model)
        {
            return model.Id;
        }
	}
}

