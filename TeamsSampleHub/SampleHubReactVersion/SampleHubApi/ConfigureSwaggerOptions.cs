// <summary>
// Helper class for enabing swagger ui
// </summary>
// <copyright file="ConfigureSwaggerOptions.cs" company="Microsoft">
// Copyright (c) Microsoft. All Rights Reserved.
// </copyright>

namespace SampleHubApi
{
    using Microsoft.AspNetCore.Mvc.ApiExplorer;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Options;
    using Microsoft.OpenApi.Models;
    using Swashbuckle.AspNetCore.SwaggerGen;

    /// <summary>
    /// Would be used in enabling the swagger interface to validate the web service calls across the pipeline
    /// </summary>
    public class ConfigureSwaggerOptions : IConfigureOptions<SwaggerGenOptions>
    {
        /// <summary>
        /// Provider field
        /// </summary>
        public readonly IApiVersionDescriptionProvider Provider;

        /// <summary>
        /// Initializes a new instance of the <see cref="ConfigureSwaggerOptions"/> class
        /// </summary>
        /// <param name="provider">Provider input</param>
        public ConfigureSwaggerOptions(IApiVersionDescriptionProvider provider)
        {
            Provider = provider;
        }

        /// <summary>
        /// Method this would help in creating information with web service version
        /// </summary>
        /// <param name="description">input value</param>
        /// <returns>returns result</returns>
        public static OpenApiInfo CreateInfoForApiVersion(ApiVersionDescription description)
        {
            OpenApiInfo info = new OpenApiInfo()
            {
                Title = "Sample Hub API",
                Version = description.ApiVersion.ToString(),
                Description = "A sample hub api with Swagger and API versioning.",
            };

            if (description.IsDeprecated)
            {
                info.Description += " This API version has been deprecated.";
            }

            return info;
        }

        /// <summary>
        /// Initializes the swagger options that would enable over the service
        /// </summary>
        /// <param name="options">Options parameter</param>
        public void Configure(SwaggerGenOptions options)
        {
            foreach (ApiVersionDescription description in Provider.ApiVersionDescriptions)
            {
                options.SwaggerDoc(description.GroupName, CreateInfoForApiVersion(description));
            }
        }
    }
}