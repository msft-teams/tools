// <summary>
// Helper class for version handling.
// </summary>
// <copyright file="VersioningExtension.cs" company="Microsoft">
// Copyright (c) Microsoft. All Rights Reserved.
// </copyright>
namespace SampleHubApi.Helpers
{

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Versioning;
    using Microsoft.Extensions.DependencyInjection;
    /// <summary>
    /// Version extenstion method would be used in differentiating the apis
    /// </summary>
    public static class VersioningExtension
    {
        /// <summary>
        /// Versioning helper method would used in differentiating the api versions
        /// </summary>
        /// <param name="services"></param>
        public static void AddVersioning(this IServiceCollection services)
        {
            services.AddApiVersioning(
               config =>
               {
                   config.ReportApiVersions = true;
                   config.AssumeDefaultVersionWhenUnspecified = true;
                   config.DefaultApiVersion = new ApiVersion(1, 0);
                   config.ApiVersionReader = new HeaderApiVersionReader("api-version");
               });
            services.AddVersionedApiExplorer(
                options =>
                {
                    options.GroupNameFormat = "'v'VVV";

                    // note: this option is only necessary when version by url segment. the SubstitutionFormat
                    // can also be used to control the format of the API version in route templates
                    options.SubstituteApiVersionInUrl = true;
                });
        }
    }
}
