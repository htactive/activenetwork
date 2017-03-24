using ActiveNetwork.Entities;
using ActiveNetwork.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActiveNetwork.Web.Mapper
{
    public class ANEventCategoryMapper
    {
        public static ANEventCategoryModel ToModel(ANEventCategory entity)
        {
            return entity == null ? null : new ANEventCategoryModel()
            {
                Id = entity.Id,
                ANEvent = new ANEventModel() { Id = entity.ANEventId.GetValueOrDefault() },
                Category = new CategoryModel() { Id = entity.CategoryId.GetValueOrDefault() }
            };
        }

        public static List<ANEventCategoryModel> ToModel(IEnumerable<ANEventCategory> entities)
        {
            return entities == null ? null : entities.Select(ToModel).ToList();
        }
    }
}