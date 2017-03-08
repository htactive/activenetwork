using ActiveNetwork.Entities;

namespace ActiveNetwork.Repository
{
    public partial class TestRepository : BaseRepository<Test, ANDBEntities>, ITestRepository
    {
        public TestRepository(IBaseUnitOfWork<ANDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(Test model)
        {
            return model.Id;
        }
	}
}

