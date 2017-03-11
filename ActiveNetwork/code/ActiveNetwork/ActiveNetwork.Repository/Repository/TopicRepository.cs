using ActiveNetwork.Entities;

namespace ActiveNetwork.Repository
{
    public partial class TopicRepository : BaseRepository<Topic, ANDBEntities>, ITopicRepository
    {
        public TopicRepository(IBaseUnitOfWork<ANDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(Topic model)
        {
            return model.Id;
        }
	}
}

