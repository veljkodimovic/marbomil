using AutoMapper.QueryableExtensions;
using Marbomil.Infrastructure;
using Marbomil.Infrastructure.Entities.Database;
using Marbomil.Infrastructure.Entities.Dtos;
using Marbomil.Infrastructure.Managers;
using Marbomil.Infrastructure.Services;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace Marbomil.Services
{
    public class UserService : ServiceBase, IUserService
    {
        private readonly IRepository repository;
        private readonly ApplicationUserManager userManager;
        private readonly ApplicationRoleManager roleManager;

        public UserService(IRepository repository, ApplicationUserManager userManager, ApplicationRoleManager roleManager)
        {
            this.repository = repository;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }


        #region Private methods

        private string GenerateErrorMessage(string mainErrorMessage, IdentityResult operationResult)
        {
            string errorMessages = operationResult.Errors
                                                  .Aggregate((s1, s2) => $"{s1}{Environment.NewLine}{s2}");

            return $"{mainErrorMessage}{Environment.NewLine}{Environment.NewLine}{errorMessages}";
        }

        #endregion

        #region IUserService implementations

        public void Create(UserCrud userData)
        {
            User user = this.mapper.Map<User>(userData);

            using (DbContextTransaction transaction = this.repository.OpenTransaction())
            {
                try
                {
                    // Creating User
                    IdentityResult userCreationResult = this.userManager.Create(user, userData.Password);
                    if (!userCreationResult.Succeeded)
                    {
                        throw new Exception(this.GenerateErrorMessage("User creation failed", userCreationResult));
                    }

                    // Setting roles
                    IdentityResult addUserToRoleResult = this.userManager.AddToRole(user.Id, $"{userData.Role}");
                    if (!addUserToRoleResult.Succeeded)
                    {
                        throw new Exception(this.GenerateErrorMessage("User creation failed", addUserToRoleResult));
                    }

                    transaction.Commit();
                }
                catch
                {
                    transaction.Rollback();

                    throw;
                }
            }            
        }

        public void Delete(int id)
        {
            User user = this.userManager.FindById(id);

            using (var transaction = this.repository.OpenTransaction())
            {
                try
                {
                    IdentityResult deleteUserResult = this.userManager.Delete(user);

                    if (!deleteUserResult.Succeeded)
                    {
                        throw new Exception(this.GenerateErrorMessage("User deletion failed", deleteUserResult));
                    }

                    transaction.Commit();
                }
                catch
                {
                    transaction.Rollback();

                    throw;
                }
            }
        }

        public UserCrud Edit(int id)
        {
            User user = this.userManager.FindById(id);

            return this.mapper.Map<UserCrud>(user);
        }

        public bool Exists(int id)
        {
            User user = this.userManager.FindById(id);

            return user != null;
        }

        public bool Exists(string username)
        {
            User user = this.userManager.FindByName(username);

            return user != null;
        }

        public bool ExistsByEmail(string email)
        {
            User user = this.userManager.FindByEmail(email);

            return user != null;
        }

        public UserView Select(int id)
        {
            User user = this.userManager.FindById(id);

            return this.mapper.Map<UserView>(user);
        }

        public IEnumerable<UserView> Select()
        {
            return this.userManager.Users
                                   .ToList()
                                   .AsQueryable()
                                   .ProjectTo<UserView>(this.mapper.ConfigurationProvider)
                                   .ToList();
        }

        public void Update(UserCrud userData)
        {
            User user = this.userManager.FindById(userData.Id);
            user = this.mapper.Map<UserCrud, User>(userData, user);

            using (var transaction = this.repository.OpenTransaction())
            {
                try
                {
                    // Update User data
                    IdentityResult updateUserResult = this.userManager.Update(user);

                    if (!updateUserResult.Succeeded)
                    {
                        throw new Exception(this.GenerateErrorMessage("User update failed", updateUserResult));
                    }

                    // Update User role
                    if (!this.userManager.IsInRole(user.Id, $"{userData.Role}"))
                    {
                        IEnumerable<UserRole> userRoles = user.Roles
                                                              .ToList();

                        // Remove User's existing roles
                        foreach (var userRole in userRoles)
                        {
                            Role role = this.roleManager.FindById(userRole.RoleId);
                            IdentityResult removeUserRoleResult = this.userManager.RemoveFromRole(user.Id, role.Name);

                            if (!removeUserRoleResult.Succeeded)
                            {
                                throw new Exception(this.GenerateErrorMessage("User update failed", updateUserResult));
                            }
                        }

                        // Add new role
                        IdentityResult addUserToRole = this.userManager.AddToRole(user.Id, $"{userData.Role}");
                    }

                    transaction.Commit();
                }
                catch
                {
                    transaction.Rollback();

                    throw;
                }
            }
        }

        #endregion
    }
}
