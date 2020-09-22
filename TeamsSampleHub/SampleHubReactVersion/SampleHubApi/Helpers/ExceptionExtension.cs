// <summary>
// Helper class for exception logging.
// </summary>
// <copyright file="ExceptionExtension.cs" company="Microsoft">
// Copyright (c) Microsoft. All Rights Reserved.
// </copyright>

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace SampleHubApi.Helpers
{
    /// <summary>
    /// Extension class to add exception as a middleware
    /// </summary>
    public static class ExceptionExtension
    {
        public static void AddProductionExceptionHandling(this IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            app.UseExceptionHandler(errorApp =>
            {
                errorApp.Run(async context =>
                {
                    context.Response.StatusCode = 500;
                    context.Response.ContentType = "text/plain";
                    IExceptionHandlerFeature errorFeature = context.Features.Get<IExceptionHandlerFeature>();
                    if (errorFeature != null)
                    {
                        ILogger logger = loggerFactory.CreateLogger("Global exception logger");
                        logger.LogError(500, errorFeature.Error, errorFeature.Error.Message);
                    }
                    await context.Response.WriteAsync("There was an error");
                });
            });
        }
    }
}
