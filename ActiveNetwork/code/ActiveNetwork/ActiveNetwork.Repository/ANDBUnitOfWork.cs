﻿using ActiveNetwork.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ActiveNetwork.Repository
{
    public class ANDBUnitOfWork : BaseUnitOfWork<ANDBEntities>
    {
        public ANDBUnitOfWork(ANDBEntities entity)
            : base(entity)
        {
            //entity.Configuration.LazyLoadingEnabled = false;
            //entity.Configuration.AutoDetectChangesEnabled = false;
            entity.Database.CommandTimeout = 180;
        }
        #region Repositories

        private IUserRepository userRepository;
        public IUserRepository UserRepository
        {
            get
            {
                return userRepository ?? (userRepository = new UserRepository(this));
            }
        }

        private IUserProfileRepository userProfileRepository;
        public IUserProfileRepository UserProfileRepository
        {
            get
            {
                return userProfileRepository ?? (userProfileRepository = new UserProfileRepository(this));
            }
        }

        private ITopicRepository topicRepository;
        public ITopicRepository TopicRepository
        {
            get
            {
                return topicRepository ?? (topicRepository = new TopicRepository(this));
            }
        }
        #endregion
    }
}
