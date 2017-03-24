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
            entity.Configuration.LazyLoadingEnabled = false;
            entity.Configuration.AutoDetectChangesEnabled = false;
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

        private ICategoryRepository categoryRepository;
        public ICategoryRepository CategoryRepository
        {
            get
            {
                return categoryRepository ?? (categoryRepository = new CategoryRepository(this));
            }
        }
        private IANEventRepository anEventRepository;
        public IANEventRepository ANEventRepository
        {
            get
            {
                return anEventRepository ?? (anEventRepository = new ANEventRepository(this));
            }
        }
        private IRoleRepository roleRepository;
        public IRoleRepository RoleRepository
        {
            get
            {
                return roleRepository ?? (roleRepository = new RoleRepository(this));
            }
        }
        private IGenderRepository genderRepository;
        public IGenderRepository GenderRepository
        {
            get
            {
                return genderRepository ?? (genderRepository = new GenderRepository(this));
            }
        }

        private IANEventRequestToJoinRepository anEventRequestToJoinRepository;
        public IANEventRequestToJoinRepository ANEventRequestToJoinRepository
        {
            get
            {
                return anEventRequestToJoinRepository ?? (anEventRequestToJoinRepository = new ANEventRequestToJoinRepository(this));
            }
        }
        private IImageRepository imageRepository;
        public IImageRepository ImageRepository
        {
            get
            {
                return imageRepository ?? (imageRepository = new ImageRepository(this));
            }
        }

        private IANEventMemberRepository anEventMemberRepository;
        public IANEventMemberRepository ANEventMemberRepository
        {
            get
            {
                return anEventMemberRepository ?? (anEventMemberRepository = new ANEventMemberRepository(this));
            }
        }
        private IANEventUserFavouriteRepository anEventUserFavouriteRepository;
        public IANEventUserFavouriteRepository ANEventUserFavouriteRepository
        {
            get
            {
                return anEventUserFavouriteRepository ?? (anEventUserFavouriteRepository = new ANEventUserFavouriteRepository(this));
            }
        }
        private IANEventInformationRepository anEventInformationRepository;
        public IANEventInformationRepository ANEventInformationRepository
        {
            get
            {
                return anEventInformationRepository ?? (anEventInformationRepository = new ANEventInformationRepository(this));
            }
        }
        private IANEventImageRepository anEventImageRepository;
        public IANEventImageRepository ANEventImageRepository
        {
            get
            {
                return anEventImageRepository ?? (anEventImageRepository = new ANEventImageRepository(this));
            }
        }
        #endregion
    }
}
