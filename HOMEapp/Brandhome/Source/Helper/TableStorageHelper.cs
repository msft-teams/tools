// <copyright file="TableStorageHelper.cs" company="Microsoft">
// Copyright (c) Microsoft. All Rights Reserved.
// </copyright>

namespace BrandHome.Helper
{
    using System;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;
    using BrandHome.Interfaces;
    using BrandHome.Models;
    using Microsoft.ApplicationInsights;
    using Microsoft.Extensions.Configuration;
    using Newtonsoft.Json;

    /// <summary>
    /// Helper class related to storage table
    /// </summary>
    public class TableStorageHelper : ITableStorage
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
        /// Initializes a new instance of the <see cref="TableStorageHelper"/> class.
        /// </summary>
        /// <param name="configuration">IConfiguration instance</param>
        /// <param name="telemetry">TelemetryClient instance</param>
        /// <param name="httpClientFactory">IHttpClientFactory instance</param>
        public TableStorageHelper(IConfiguration configuration, TelemetryClient telemetry, IHttpClientFactory httpClientFactory)
        {
            this.configuration = configuration;
            this.telemetry = telemetry;
            this.httpClientFactory = httpClientFactory;
        }

        /// <summary>
        /// Retrieve Adoptive card from the table
        /// </summary>
        /// <returns>Storage Table Data</returns>
        public async Task<CompanyCommunicatorTableData> GetAdaptiveCardAsync()
        {
            this.telemetry.TrackEvent("GetAdaptiveCardAsync");
            string endpoint = this.configuration["StorageTableEndPoint"];
            CompanyCommunicatorTableData storageTableData = null;
            var client = this.httpClientFactory.CreateClient("TableStorageWebClient");
                using (var request = new HttpRequestMessage(HttpMethod.Get, endpoint))
                {
                    request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    using (HttpResponseMessage response = await client.SendAsync(request))
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            var json = await response.Content.ReadAsStringAsync();
                            try
                            {
                                storageTableData = JsonConvert.DeserializeObject<CompanyCommunicatorTableData>(json);
                            }
                            catch (Exception ex)
                            {
                                this.telemetry.TrackException(ex);
                            }
                        }
                    }
                }

            return storageTableData;
        }
    }
}