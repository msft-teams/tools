// <copyright file="GraphHelper.cs" company="Microsoft">
// Copyright (c) Microsoft. All Rights Reserved.
// </copyright>

using SampleHubApi.Helper;

namespace SampleHubApi.Helpers
{
    using Microsoft.ApplicationInsights;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Newtonsoft.Json;
    using SampleHubApi.Interfaces;
    using SampleHubApi.Models;
    using System;
    using System.IO;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;

    /// <summary>
    /// Helper class for Graph API calls
    /// </summary>
    public class GraphHelper : IGraph
    {
        /// <summary>
        ///  TelemetryClient instance
        /// </summary>
        private readonly TelemetryClient _telemetry;

        /// <summary>
        ///  IHttpClientFactory instance
        /// </summary>
        private readonly IHttpClientFactory _httpClientFactory;

        /// <summary>
        /// Application access token using client credentials.
        /// </summary>
        private string _accessToken;

        /// <summary>
        /// IWebHostEnvironment instance
        /// </summary>
        private readonly IWebHostEnvironment _webHostEnvironment;

        /// <summary>
        /// IConfiguration instance
        /// </summary>
        private readonly IConfiguration _configuration;

        /// <summary>
        /// Initializes a new instance of the <see cref="GraphHelper"/> class.
        /// </summary>
        /// <param name="webHostEnvironment">IWebHostEnvironment instance</param>
        /// <param name="configuration">IConfiguration instance</param>
        /// <param name="telemetry">TelemetryClient instance</param>
        /// <param name="httpClientFactory">IHttpClientFactory instance</param>
        public GraphHelper(
            IWebHostEnvironment webHostEnvironment,
            IConfiguration configuration,
            TelemetryClient telemetry,
            IHttpClientFactory httpClientFactory)
        {
            _webHostEnvironment = webHostEnvironment;
            _configuration = configuration;
            _telemetry = telemetry;
            _httpClientFactory = httpClientFactory;
        }

        /// <summary>
        /// Retrieve Profile Photo of User
        /// </summary>
        /// <param name="token">Access token</param>
        /// <param name="userObjectId">AAD user object ID</param>
        /// <returns>Profile photo URL</returns>
        public async Task<string> GetPhoto(string userObjectId)
        {
            _telemetry.TrackEvent("GetPhoto");
            string profilePhotoUrl = string.Empty;
            string endpoint = $"{_configuration["UsersEndPoint"]}{userObjectId}/photo/$value";
            HttpClient client = _httpClientFactory.CreateClient("GraphWebClient");
            using (HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, endpoint))
            {
                request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _accessToken);
                using (HttpResponseMessage response = await client.SendAsync(request))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        Stream photo = await response.Content.ReadAsStreamAsync();
                        try
                        {

                            using (MemoryStream memoryStream = new MemoryStream())
                            {
                                photo.CopyTo(memoryStream);
                                return profilePhotoUrl = "data:image/png; base64," + Convert.ToBase64String(memoryStream.ToArray());
                            }

                        }
                        catch (Exception ex)
                        {
                            profilePhotoUrl = _configuration["BaseUrl"] + "/images/Deafult-Profile.png";
                            _telemetry.TrackException(ex);
                        }
                    }
                    else
                    {
                        profilePhotoUrl = _configuration["BaseUrl"] + "/images/Deafult-Profile.png";
                    }
                }
            }

            return profilePhotoUrl;
        }

        /// <summary>
        /// Retrieve team members in a team
        /// </summary>
        /// <param name="token">User access token</param>
        /// <returns>Team members</returns>
        public async Task<TeamMembers> GetTeamMembers()
        {
            _telemetry.TrackEvent("GetTeamMembers");
            _accessToken = await AuthenticationHelper.GetAccessTokenAsync(_configuration, _httpClientFactory, _telemetry);
            string endpoint = $"{_configuration["GroupsEndPoint"]}{_configuration["TeamId"]}/members?$top={_configuration["TeamMembersCount"]}";
            TeamMembers teamMembers = null;
            HttpClient client = _httpClientFactory.CreateClient("GraphWebClient");
            using (HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, endpoint))
            {
                request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _accessToken);
                using (HttpResponseMessage response = await client.SendAsync(request))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        string groupMembers = await response.Content.ReadAsStringAsync();
                        try
                        {
                            teamMembers = JsonConvert.DeserializeObject<TeamMembers>(groupMembers);
                        }
                        catch (Exception ex)
                        {
                            _telemetry.TrackException(ex);
                        }
                    }
                }
            }

            return teamMembers;
        }

        /// <summary>
        /// Get the access token
        /// </summary>
        /// <param name="idToken">token input</param>
        /// <returns>returns the token</returns>
        public async Task<string> GetAccessTokenOnBehalfUserAsync(string idToken)
        {
            _telemetry.TrackEvent("GetAccessTokenOnBehalfUserAsync");
            _accessToken = await AuthenticationHelper.GetAccessTokenOnBehalfUserAsync(_configuration, _httpClientFactory, _telemetry, idToken);
            return _accessToken;
        }

    }
}