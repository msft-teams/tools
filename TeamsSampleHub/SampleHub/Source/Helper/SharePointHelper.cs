// <copyright file="SharePointHelper.cs" company="Microsoft">
// Copyright (c) Microsoft. All Rights Reserved.
// </copyright>

namespace BrandHome.Helper
{
    using System;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Text;
    using System.Threading.Tasks;
    using BrandHome.Interfaces;
    using BrandHome.Models;
    using Microsoft.ApplicationInsights;
    using Microsoft.Extensions.Configuration;
    using Newtonsoft.Json;

    /// <summary>
    /// Helper class related to SharePoint
    /// </summary>
    public class SharePointHelper : ISharePoint
    {
        /// <summary>
        /// TelemetryClient instance.
        /// </summary>
        private readonly TelemetryClient telemetry;

        /// <summary>
        /// IHttpClientFactory instance.
        /// </summary>
        private readonly IHttpClientFactory httpClientFactory;

        /// <summary>
        /// IConfiguration instance.
        /// </summary>
        private IConfiguration configuration;

        /// <summary>
        /// Initializes a new instance of the <see cref="SharePointHelper"/> class.
        /// </summary>
        /// <param name="configuration">IConfiguration instance</param>
        /// <param name="telemetry">TelemetryClient instance</param>
        /// <param name="httpClientFactory">IHttpClientFactory instance</param>
        public SharePointHelper(IConfiguration configuration, TelemetryClient telemetry, IHttpClientFactory httpClientFactory)
        {
            this.configuration = configuration;
            this.telemetry = telemetry;
            this.httpClientFactory = httpClientFactory;
        }

        /// <summary>
        /// Retrieve SharePoint Authentication token
        /// </summary>
        /// <returns>Access token</returns>
        public async Task<string> GetAuthenticationToken()
        {
            this.telemetry.TrackEvent("GetAuthenticationToken");
            string url = "https://accounts.accesscontrol.windows.net/tokens/OAuth/2";
            string body = $"grant_type=client_credentials&client_id={this.configuration["SharePointClientId"]}&client_secret={this.configuration["AppSecret"]}&resource={this.configuration["Resource"]}";
            var httpclient = this.httpClientFactory.CreateClient("SharePointWebClient");
            using (var request = new HttpRequestMessage(HttpMethod.Post, url))
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
            this.telemetry.TrackEvent("GetNewsFromSharePoint");
            string token = await this.GetAuthenticationToken();
            string endpoint = $"{this.configuration["TenantSharePointSiteUrl"]}/_api/Web/Lists(guid'{this.configuration["ListId"]}')/items";
            News news = null;
            var client = this.httpClientFactory.CreateClient("SharePointWebClient");
            using (var request = new HttpRequestMessage(HttpMethod.Get, endpoint))
            {
                request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
                using (HttpResponseMessage response = await client.SendAsync(request))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        var json = await response.Content.ReadAsStringAsync();
                        try
                        {
                            news = JsonConvert.DeserializeObject<News>(json);
                        }
                        catch (Exception ex)
                        {
                            this.telemetry.TrackException(ex);
                        }
                    }
                }
            }

            return news;
        }
    }
}
