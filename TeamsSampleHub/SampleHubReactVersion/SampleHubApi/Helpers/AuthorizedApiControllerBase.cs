// <summary>
// Helper class for authentication.
// </summary>
// <copyright file="AuthorizedApiControllerBase.cs" company="Microsoft">
// Copyright (c) Microsoft. All Rights Reserved.
// </copyright>

namespace SampleHubApi.Helpers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Logging;
    using Microsoft.Identity.Client;
    using RestEase;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;

    /// <summary>
    /// Customized authorized controller base which inherits the Controller base with logging and configuration enabled and can be used as 
    /// replacement of Controlelrbase in designing api controller
    /// </summary>
    public abstract class AuthorizedApiControllerBase : ControllerBase
    {
        /// <summary>
        /// It is used in storing the token information to handle the authorization in the application
        /// </summary>
        protected string BearerToken
        {
            get
            {
                Microsoft.Extensions.Primitives.StringValues auth = Request.Headers["Authorization"];
                string bearer = auth[0].Substring(7);
                return bearer;
            }
        }
        /// <summary>
        /// Retrieved the access token based on the permission level given to the respective application
        /// </summary>
        /// <param name="app"></param>
        /// <returns></returns>
        protected async Task<string> GetAccessToken(IConfidentialClientApplication app)
        {
            string[] scopes = { "user.read.all" };
            UserAssertion userAssertion = new UserAssertion(BearerToken, "urn:ietf:params:oauth:grant-type:jwt-bearer");
            AuthenticationResult result = await app.AcquireTokenOnBehalfOf(scopes, userAssertion).ExecuteAsync();
            return result.AccessToken;
        }
        /// <summary>
        /// Async call which would help in triggering the service calls
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="serviceCall"></param>
        /// <returns></returns>
        protected async Task<IActionResult> TryServiceRequest<T>(Task<T> serviceCall)
        {
            try
            {
                T result = await serviceCall;
                return Ok(result);
            }
            catch (ApiException ex)
            {
                return MapException(ex);
            }
        }
        protected async Task<IActionResult> TryVoidServiceRequest(Task serviceCall)
        {
            try
            {
                await serviceCall;
                return Ok();
            }
            catch (ApiException ex)
            {
                return MapException(ex);
            }
        }
        /// <summary>
        /// Map exception with the respected Status code being returned
        /// </summary>
        /// <param name="ex">Exception parameter to check agains the status code to be returned</param>
        /// <returns></returns>
        protected IActionResult MapException(ApiException ex)
        {
            switch (ex.StatusCode)
            {
                case HttpStatusCode.NotFound:
                    return NotFound(ex.Content);
                case HttpStatusCode.BadRequest:
                    return BadRequest(ex.Content);
                case HttpStatusCode.Forbidden:
                    return Forbid(ex.Content);
                case HttpStatusCode.Unauthorized:
                    return Unauthorized(ex.Content);
                case HttpStatusCode.NoContent:
                    return NoContent();
                default:
                    return StatusCode(500);
            }
        }
    }
}