using ActiveNetwork.Entities;
using ActiveNetwork.Repository;
using ActiveNetwork.SearchingSandbox.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace ActiveNetwork.SearchingSandbox
{
    public class ANEventSearchingSandbox
    {
        private List<ISearchingRule> rules;
        private ANDBUnitOfWork andbUnitOfWork;
        public ANEventSearchingSandbox(ANDBUnitOfWork andbUnitOfWork)
        {
            rules = new List<ISearchingRule>();
            this.andbUnitOfWork = andbUnitOfWork;
        }

        public List<int> Search(SearchCriteria searchModel)
        {
            var user = this.andbUnitOfWork.UserRepository.GetAll().Include(x => x.UserProfiles).FirstOrDefault(x => x.Id == searchModel.UserId);
            if (user == null) return new List<int>();
            var query = this.andbUnitOfWork.ANEventRepository.GetAll().Take(10000).ToList();

            foreach (var rule in rules)
            {
                query = query.Where(x => rule.IsMatched(user, x)).ToList();
            }

            var searchingResults = query.Select(x => new ANEventSearchingResultModel()
            {
                ANEvent = x,
                Score = this.rules.Sum(r => r.GetMatchingPriority(user, x))
            }).ToList();

            return searchingResults.OrderByDescending(x => x.Score).Select(x => x.ANEvent.Id).ToList();
        }
    }
}
