// <copyright file="SharePointHelper.cs" company="Microsoft">
// Copyright (c) Microsoft. All Rights Reserved.
// </copyright>

namespace SampleHubApi.Helper
{
    using Microsoft.ApplicationInsights;
    using Microsoft.Extensions.Configuration;
    using Newtonsoft.Json;
    using SampleHubApi.Interfaces;
    using SampleHubApi.Models;
    using System;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// Helper class related to SharePoint
    /// </summary>
    public class SharePointHelper : ISharePoint
    {
        /// <summary>
        /// TelemetryClient instance.
        /// </summary>
        private readonly TelemetryClient _telemetry;

        /// <summary>
        /// IHttpClientFactory instance.
        /// </summary>
        private readonly IHttpClientFactory _httpClientFactory;

        /// <summary>
        /// IConfiguration instance.
        /// </summary>
        private readonly IConfiguration _configuration;

        /// <summary>
        /// Initializes a new instance of the <see cref="SharePointHelper"/> class.
        /// </summary>
        /// <param name="configuration">IConfiguration instance</param>
        /// <param name="telemetry">TelemetryClient instance</param>
        /// <param name="httpClientFactory">IHttpClientFactory instance</param>
        public SharePointHelper(IConfiguration configuration, TelemetryClient telemetry, IHttpClientFactory httpClientFactory)
        {
            _configuration = configuration;
            _telemetry = telemetry;
            _httpClientFactory = httpClientFactory;
        }

        /// <summary>
        /// Retrieve SharePoint Authentication token
        /// </summary>
        /// <returns>Access token</returns>
        public async Task<string> GetAuthenticationToken()
        {
            _telemetry.TrackEvent("GetAuthenticationToken");
            string url = "https://accounts.accesscontrol.windows.net/tokens/OAuth/2";
            string body = $"grant_type=client_credentials&client_id={_configuration["SharePointClientId"]}&client_secret={_configuration["AppSecret"]}&resource={_configuration["Resource"]}";
            HttpClient httpclient = _httpClientFactory.CreateClient("SharePointWebClient");
            using (HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, url))
            {
                request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                request.Content = new StringContent(body, Encoding.UTF8, "application/x-www-form-urlencoded");
                using (HttpResponseMessage response = await httpclient.SendAsync(request))
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    if (!response.IsSuccessStatusCode)
                    {
                        throw new Exception(responseBody);
                    }

                    return JsonConvert.DeserializeObject<TokenResponse>(responseBody).Access_token;
                }
            }
        }

        /// <summary>
        /// Retrieve news from SharePoint component
        /// </summary>
        /// <returns>News object</returns>
        public async Task<News> GetNewsFromSharePoint()
        {
            _telemetry.TrackEvent("GetNewsFromSharePoint");
            string token = await GetAuthenticationToken();
            string endpoint = $"{_configuration["TenantSharePointDomain"]}/sites/News/_api/Web/Lists(guid'{_configuration["ListId"]}')/items";
            News news = null;
            HttpClient client = _httpClientFactory.CreateClient("SharePointWebClient");
            using (HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, endpoint))
            {
                request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
                using (HttpResponseMessage response = await client.SendAsync(request))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        string json = await response.Content.ReadAsStringAsync();
                        try
                        {
                            news = JsonConvert.DeserializeObject<News>(json);
                        }
                        catch (Exception ex)
                        {
                            _telemetry.TrackException(ex);
                        }
                    }
                }
            }

            return news;
        }
    }
}