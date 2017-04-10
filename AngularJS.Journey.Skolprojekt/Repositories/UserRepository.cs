using System;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Threading.Tasks;
using AngularJS.Journey.Skolprojekt.Models;
using AngularJS.Journey.Skolprojekt.DataAcess;
using System.Security.Claims;
using System.Security.Principal;

namespace AngularJS.Journey.Skolprojekt.Repositories
{
    public class UserRepository : IDisposable
    {
       private DbContext _ctx;

       private UserManager<IdentityUser> _userManager;

        public UserRepository()
        {
            _ctx = new DbContext();
            _userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(_ctx));
        }

        public async Task<IdentityResult> RegisterUser (User userModel)
        {
            IdentityUser user = new IdentityUser
            {
                UserName = userModel.UserName
            };

            var result = await _userManager.CreateAsync(user, userModel.Password);

            return result;
        }

        public async Task<IdentityUser> FindUser(string userName, string password)
        {
            IdentityUser user = await _userManager.FindAsync(userName, password);

            return user;
        }

        public IdentityUser GetUserById(string userId)
        {
            IdentityUser user = _userManager.FindById(userId);

            return user;
        }
           

        public void Dispose()
        {
            _ctx.Dispose();
            _userManager.Dispose();
        }
    }
}