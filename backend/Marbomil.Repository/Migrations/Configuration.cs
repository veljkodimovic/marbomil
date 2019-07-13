namespace Marbomil.Repository.Migrations
{
    using Marbomil.Infrastructure.Entities.Database;
    using Marbomil.Infrastructure.Enums;
    using Marbomil.Infrastructure.Managers;
    using Marbomil.Repository.Stores;
    using Microsoft.AspNet.Identity;
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<MarbomilDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Marbomil.Repository.MarbomilDbContext context)
        {
            #region Create Roles

            ApplicationRoleStore roleStore = new ApplicationRoleStore(context);
            ApplicationRoleManager roleManager = new ApplicationRoleManager(roleStore);
            IEnumerable<string> roles = Enum.GetNames(typeof(UserRoles))
                                            .Where(r => !r.Equals($"{UserRoles.Undefined}"));

            foreach (var roleName in roles)
            {
                Role role = roleManager.FindByName(roleName);

                if (role == null)
                {
                    role = new Role
                    {
                        Name = roleName
                    };

                    roleManager.Create(role);
                }
            }

            #endregion

            #region Create Default Users

            ApplicationUserStore userStore = new ApplicationUserStore(context);
            ApplicationUserManager userManager = new ApplicationUserManager(userStore);
            PasswordHasher passwordHasher = new PasswordHasher();
            IEnumerable<User> users = new List<User>
            {
                new User
                {
                    UserName = "bojan.roganovic",
                    Email = "bojan.roganovic@marbomil.co.rs",
                    PasswordHash = passwordHasher.HashPassword("a"),
                    FirstName = "Bojan",
                    LastName = "Roganovic"
                },
                new User
                {
                    UserName = "marbomil.admin1",
                    Email = "marbomil.admin1@marbomil.co.rs",
                    PasswordHash = passwordHasher.HashPassword("a")
                },
                new User
                {
                    UserName = "marbomil.admin2",
                    Email = "marbomil.admin2@marbomil.co.rs",
                    PasswordHash = passwordHasher.HashPassword("a")
                }
            };

            foreach (var user in users)
            {
                User existsingUser = userManager.FindByName(user.UserName);

                if (existsingUser == null)
                {
                    userManager.Create(user);

                    userManager.AddToRole(user.Id, $"{UserRoles.Admin}");
                }
            }

            #endregion
        }
    }
}
