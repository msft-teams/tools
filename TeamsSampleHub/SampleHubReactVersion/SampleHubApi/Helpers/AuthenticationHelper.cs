// <summary>
// Helper class for authentication.
// </summary>
// <copyright file="AuthenticationHelper.cs" company="Microsoft">
// Copyright (c) Microsoft. All Rights Reserved.
// </copyright>
namespace SampleHubApi.Helper
{
    using Microsoft.ApplicationInsights;
    using Microsoft.Extensions.Configuration;
    using Microsoft.IdentityModel.Tokens;
    using Newtonsoft.Json;
    using SampleHubApi.Models;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// Authentication Helper.
    /// </summary>
    public static class AuthenticationHelper
    {
        /// <summary>
        /// Azure Client Id.
        /// </summary>
        private static readonly string ClientIdConfigurationSettingsKey = "AzureAd:ClientId";

        /// <summary>
        /// Azure Tenant Id.
        /// </summary>
        private static readonly string TenantIdConfigurationSettingsKey = "AzureAd:TenantId";

        /// <summary>
        /// Azure Application Id URI.
        /// </summary>
        private static readonly string ApplicationIdUriConfigurationSettingsKey = "AzureAd:ApplicationIdURI";

        /// <summary>
        /// Azure Valid Issuers.
        /// </summary>
        private static readonly string ValidIssuersConfigurationSettingsKey = "AzureAd:ValidIssuers";

        /// <summary>
        /// Azure AppSecret .
        /// </summary>
        private static readonly string AppsecretConfigurationSettingsKey = "AzureAd:AppSecret";

        /// <summary>
        /// Azure Url .
        /// </summary>
        private static readonly string AzureInstanceConfigurationSettingsKey = "AzureAd:Instance";

        /// <summary>
        /// Azure Auth Url .
        /// </summary>
        private static readonly string AzureAuthUtrlConfigurationSettingsKey = "AzureAd:AuthUrl";

        /// <summary>
        /// Retrieve Valid Audiences.
        /// </summary>
        /// <param name="configuration">IConfiguration instance.</param>
        /// <returns>Valid Audiences.</returns>
        public static IEnumerable<string> GetValidAudiences(IConfiguration configuration)
        {
            string clientId = configuration[ClientIdConfigurationSettingsKey];
            string applicationIdUri = configuration[ApplicationIdUriConfigurationSettingsKey];
            List<string> validAudiences = new List<string> { clientId, applicationIdUri.ToLower() };
            return validAudiences;
        }

        /// <summary>
        /// Retrieve Valid Issuers.
        /// </summary>
        /// <param name="configuration">IConfiguration instance.</param>
        /// <returns>Valid Issuers.</returns>
        public static IEnumerable<string> GetValidIssuers(IConfiguration configuration)
        {
            string tenantId = configuration[TenantIdConfigurationSettingsKey];

            IEnumerable<string> validIssuers = GetSettings(configuration);

            validIssuers = validIssuers.Select(validIssuer => validIssuer.Replace("TENANT_ID", tenantId));

            return validIssuers;
        }

        /// <summary>
        /// Audience Validator.
        /// </summary>
        /// <param name="tokenAudiences">Token audiences.</param>
        /// <param name="securityToken">Security token.</param>
        /// <param name="validationParameters">Validation parameters.</param>
        /// <returns>Audience validator status.</returns>
        public static bool AudienceValidator(
            IEnumerable<string> tokenAudiences,
            SecurityToken securityToken,
            TokenValidationParameters validationParameters)
        {
            if (tokenAudiences == null || tokenAudiences.Count() == 0)
            {
                throw new ApplicationException("No audience defined in token!");
            }

            IEnumerable<string> validAudiences = validationParameters.ValidAudiences;
            if (validAudiences == null || validAudiences.Count() == 0)
            {
                throw new ApplicationException("No valid audiences defined in validationParameters!");
            }

            foreach (string tokenAudience in tokenAudiences)
            {
                if (validAudiences.Any(validAudience => validAudience.Equals(tokenAudience, StringComparison.OrdinalIgnoreCase)))
                {
                    return true;
                }
            }

            return false;
        }

        /// <summary>
        /// Retrieve Settings.
        /// </summary>
        /// <param name="configuration">IConfiguration instance.</param>
        /// <returns>Configuration settings for valid issuers.</returns>
        private static IEnumerable<string> GetSettings(IConfiguration configuration)
        {
            string configurationSettingsValue = configuration[ValidIssuersConfigurationSettingsKey];
            IEnumerable<string> settings = configurationSettingsValue
                ?.Split(new char[] { ';', ',' }, StringSplitOptions.RemoveEmptyEntries)
                ?.Select(p => p.Trim());
            if (settings == null)
            {
                throw new ApplicationException($"{ValidIssuersConfigurationSettingsKey} does not contain a valid value in the configuration file.");
            }

            return settings;
        }

        /// <summary>
        /// Get token using client credentials flow
        /// </summary>
        /// <param name="configuration">IConfiguration instance.</param>
        /// <param name="clientfactory"></param>
        /// <returns>App access token.</returns>
        public static async Task<string> GetAccessTokenAsync(IConfiguration configuration, IHttpClientFactory clientfactory, TelemetryClient telemetry)
        {
            telemetry.TrackEvent("GetAccessToken");
            string accessToken = string.Empty;
            string body = $"grant_type=client_credentials&client_id={configuration[ClientIdConfigurationSettingsKey]}@{configuration[TenantIdConfigurationSettingsKey]}&client_secret={configuration[AppsecretConfigurationSettingsKey]}&scope=https://graph.microsoft.com/.default";
            try
            {
                HttpClient client = clientfactory.CreateClient("GraphWebClient");
                string responseBody;
                using (HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, configuration[AzureInstanceConfigurationSettingsKey] + configuration[TenantIdConfigurationSettingsKey] + configuration[AzureAuthUtrlConfigurationSettingsKey]))
                {
                    request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    request.Content = (new StringContent(body, Encoding.UTF8, "application/x-www-form-urlencoded"));
                    using (HttpResponseMessage response = await client.SendAsync(request))
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            responseBody = await response.Content.ReadAsStringAsync();
                        }
                        else
                        {
                            responseBody = await response.Content.ReadAsStringAsync();
                            throw new Exception(responseBody);
                        }
                    }
                }
                accessToken = JsonConvert.DeserializeObject<TokenResponse>(responseBody).Access_token;
                return accessToken;
            }
            catch (Exception ex)
            {
                telemetry.TrackException(ex);
                return null;
            }
        }

        /// <summary>
        ///Get access token with reference to the request is been placed with respected to the user login form of teams login
        /// </summary>
        /// <param name="configuration">IConfiguration instance.</param>
        /// <param name="clientfactory"></param>
        /// <returns>App access token on behalf of user.</returns>
        public static async Task<string> GetAccessTokenOnBehalfUserAsync(IConfiguration configuration, IHttpClientFactory clientfactory, TelemetryClient telemetry, string idToken)
        {
            telemetry.TrackEvent("GetAccessToken User");
            string accessToken = string.Empty;
            string body = $"assertion={idToken}&requested_token_use=on_behalf_of&grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&client_id={configuration[ClientIdConfigurationSettingsKey]}@{configuration[TenantIdConfigurationSettingsKey]}&client_secret={configuration[AppsecretConfigurationSettingsKey]}&scope=https://graph.microsoft.com/User.Read";
            try
            {
                HttpClient client = clientfactory.CreateClient("GraphWebClient");
                string responseBody;
                using (HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, configuration[AzureInstanceConfigurationSettingsKey] + configuration[TenantIdConfigurationSettingsKey] + configuration[AzureAuthUtrlConfigurationSettingsKey]))
                {
                    request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    request.Content = (new StringContent(body, Encoding.UTF8, "application/x-www-form-urlencoded"));
                    using (HttpResponseMessage response = await client.SendAsync(request))
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            responseBody = await response.Content.ReadAsStringAsync();
                        }
                        else
                        {
                            responseBody = await response.Content.ReadAsStringAsync();
                            throw new Exception(responseBody);
                        }
                    }
                }
                accessToken = JsonConvert.DeserializeObject<TokenResponse>(responseBody).Access_token;
                return accessToken;
            }
            catch (Exception ex)
            {
                telemetry.TrackException(ex);
                return ex.Message.ToString();
            }
        }

    }
}