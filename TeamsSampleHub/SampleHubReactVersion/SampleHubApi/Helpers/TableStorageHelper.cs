// <copyright file="TableStorageHelper.cs" company="Microsoft">
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
    using System.Threading.Tasks;

    /// <summary>
    /// Helper class related to storage table
    /// </summary>
    public class TableStorageHelper : ITableStorage
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
        /// Initializes a new instance of the <see cref="TableStorageHelper"/> class.
        /// </summary>
        /// <param name="configuration">IConfiguration instance</param>
        /// <param name="telemetry">TelemetryClient instance</param>
        /// <param name="httpClientFactory">IHttpClientFactory instance</param>
        public TableStorageHelper(IConfiguration configuration, TelemetryClient telemetry, IHttpClientFactory httpClientFactory)
        {
            _configuration = configuration;
            _telemetry = telemetry;
            _httpClientFactory = httpClientFactory;
        }

        /// <summary>
        /// Retrieve Adoptive card from the table
        /// </summary>
        /// <returns>Storage Table Data</returns>
        public async Task<CompanyCommunicatorTableData> GetAdaptiveCardAsync()
        {
            _telemetry.TrackEvent("GetAdaptiveCardAsync");
            string endpoint = _configuration["StorageTableEndPoint"];
            CompanyCommunicatorTableData storageTableData = null;
            HttpClient client = _httpClientFactory.CreateClient("TableStorageWebClient");
            using (HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, endpoint))
            {
                request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                using (HttpResponseMessage response = await client.SendAsync(request))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        string json = await response.Content.ReadAsStringAsync();
                        try
                        {
                            storageTableData = JsonConvert.DeserializeObject<CompanyCommunicatorTableData>(json);
                        }
                        catch (Exception ex)
                        {
                            _telemetry.TrackException(ex);
                        }
                    }
                }
            }

            return storageTableData;
        }
    }
}