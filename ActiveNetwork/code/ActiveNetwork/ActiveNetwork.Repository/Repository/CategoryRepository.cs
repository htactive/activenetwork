using ActiveNetwork.Entities;

namespace ActiveNetwork.Repository
{
    public partial class CategoryRepository : BaseRepository<Category, ANDBEntities>, ICategoryRepository
    {
        public CategoryRepository(IBaseUnitOfWork<ANDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(Category model)
        {
            return model.Id;
        }
	}
}

