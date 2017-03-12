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
                ANEventId = entity.ANEventId,
                CategoryId = entity.CategoryId
            };
        }

        public static List<ANEventCategoryModel> ToModel(IEnumerable<ANEventCategory> entities)
        {
            return entities == null ? null : entities.Select(ToModel).ToList();
        }

        public static ANEventCategory ToEntity(ANEventCategoryModel model)
        {
            return model == null ? null : new ANEventCategory()
            {
                Id = model.Id,
                ANEventId = model.ANEventId,
                CategoryId = model.CategoryId
            };
        }

        public static List<ANEventCategory> ToEntity(IEnumerable<ANEventCategoryModel> models)
        {
            return models == null ? null : models.Select(ToEntity).ToList();
        }
    }
}