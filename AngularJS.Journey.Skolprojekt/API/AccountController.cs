using AngularJS.Journey.Skolprojekt.Models;
using AngularJS.Journey.Skolprojekt.Repositories;
using Microsoft.AspNet.Identity;
using System.Threading.Tasks;
using System.Web.Http;

namespace AngularJS.Journey.Skolprojekt.API
{
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private UserRepository _repo = null;

        public AccountController()
        {
            _repo = new UserRepository();
        }

        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Register (User userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await _repo.RegisterUser(userModel);

            if (result == null) return InternalServerError();

            return Ok();
        }
    }
}