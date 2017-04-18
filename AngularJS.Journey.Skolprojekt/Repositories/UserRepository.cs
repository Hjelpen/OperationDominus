using System;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Threading.Tasks;
using AngularJS.Journey.Skolprojekt.Models;
using AngularJS.Journey.Skolprojekt.DataAcess;
using AngularJS.Journey.Skolprojekt.Providers;

namespace AngularJS.Journey.Skolprojekt.Repositories
{
    public class UserRepository : IDisposable
    {
     
       private DbContext _ctx;

       private UserManager<ApplicationUser> _userManager;

        public UserRepository()
        {
            _ctx = DbContextProvider.Instance.DbContext;
            _userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(_ctx));
        }

        public async Task<IdentityResult> RegisterUser (User userModel)
        {

            ApplicationUser user = new ApplicationUser
            {
                UserName = userModel.UserName
            };

            var result = await _userManager.CreateAsync(user, userModel.Password);

            return result;
        }

        public async Task<ApplicationUser> FindUser(string userName, string password)
        {
            ApplicationUser user = await _userManager.FindAsync(userName, password);

            return user;
        }

        public ApplicationUser GetUserByUserName(string userName)
        {
            ApplicationUser user = _userManager.FindByName(userName);

            return user;
        }

        public void Dispose()
        {
            DbContextProvider.Instance.DisposeContext();
            _ctx = null;
            _userManager.Dispose();
        }
    }
}