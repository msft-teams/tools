// <copyright file="GraphHelper.cs" company="Microsoft">
// Copyright (c) Microsoft. All Rights Reserved.
// </copyright>

namespace BrandHome.Helper
{
    using System;
    using System.IO;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;
    using BrandHome.Interfaces;
    using BrandHome.Models;
    using Microsoft.ApplicationInsights;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Newtonsoft.Json;

    /// <summary>
    /// Helper class for Graph API calls
    /// </summary>
    public class GraphHelper : IGraph
    {
        /// <summary>
        ///  TelemetryClient instance
        /// </summary>
        private readonly TelemetryClient telemetry;

        /// <summary>
        ///  IHttpClientFactory instance
        /// </summary>
        private readonly IHttpClientFactory httpClientFactory;

        /// <summary>
        /// Application access token using client credentials.
        /// </summary>
        private string accessToken;

        /// <summary>
        /// IWebHostEnvironment instance
        /// </summary>
        private IWebHostEnvironment webHostEnvironment;

        /// <summary>
        /// IConfiguration instance
        /// </summary>
        private IConfiguration configuration;

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
            this.webHostEnvironment = webHostEnvironment;
            this.configuration = configuration;
            this.telemetry = telemetry;
            this.httpClientFactory = httpClientFactory;
        }

        /// <summary>
        /// Retrieve Profile Photo of User
        /// </summary>
        /// <param name="token">Access token</param>
        /// <param name="userObjectId">AAD user object ID</param>
        /// <returns>Profile photo URL</returns>
        public async Task<string> GetPhoto(string userObjectId)
        {
            this.telemetry.TrackEvent("GetPhoto");
            string profilePhotoUrl = string.Empty;
            string endpoint = $"{this.configuration["UsersEndPoint"]}{userObjectId}/photo/$value";
            var client = this.httpClientFactory.CreateClient("GraphWebClient");
            using (var request = new HttpRequestMessage(HttpMethod.Get, endpoint))
            {
                request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                using (HttpResponseMessage response = await client.SendAsync(request))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        var photo = await response.Content.ReadAsStreamAsync();
                        try
                        {

                            using (var memoryStream = new MemoryStream())
                            {
                                photo.CopyTo(memoryStream);
                                return profilePhotoUrl = "data:image/png; base64," + Convert.ToBase64String(memoryStream.ToArray());
                            }

                        }
                        catch (Exception ex)
                        {
                            profilePhotoUrl = this.configuration["BaseUrl"] + "/images/Deafult-Profile.png";
                            this.telemetry.TrackException(ex);
                        }
                    }
                    else
                    {
                        profilePhotoUrl = this.configuration["BaseUrl"] + "/images/Deafult-Profile.png";
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
            this.telemetry.TrackEvent("GetTeamMembers");
            accessToken = await AuthenticationHelper.GetAccessTokenAsync(configuration, httpClientFactory, telemetry);
            string endpoint = $"{this.configuration["GroupsEndPoint"]}{this.configuration["TeamId"]}/members?$top={this.configuration["TeamMembersCount"]}";
            TeamMembers teamMembers = null;
            var client = this.httpClientFactory.CreateClient("GraphWebClient");
            using (var request = new HttpRequestMessage(HttpMethod.Get, endpoint))
            {
                request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                using (HttpResponseMessage response = await client.SendAsync(request))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        var groupMembers = await response.Content.ReadAsStringAsync();
                        try
                        {
                            teamMembers = JsonConvert.DeserializeObject<TeamMembers>(groupMembers);
                        }
                        catch (Exception ex)
                        {
                            this.telemetry.TrackException(ex);
                        }
                    }
                }
            }

            return teamMembers;
        }
    }
}