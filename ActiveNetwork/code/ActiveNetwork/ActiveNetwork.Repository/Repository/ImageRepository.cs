using ActiveNetwork.Entities;

namespace ActiveNetwork.Repository
{
    public partial class ImageRepository : BaseRepository<Image, ANDBEntities>, IImageRepository
    {
        public ImageRepository(IBaseUnitOfWork<ANDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(Image model)
        {
            return model.Id;
        }
	}
}

