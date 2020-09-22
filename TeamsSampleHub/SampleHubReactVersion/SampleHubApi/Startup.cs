

namespace SampleHubApi
{
    using Microsoft.AspNetCore.Authentication.AzureAD.UI;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    // <summary>
    // Pipeline and service management class.
    // </summary>
    // <copyright file="AuthenticationHelper.cs" company="Microsoft">
    // Copyright (c) Microsoft. All Rights Reserved.
    // </copyright>
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.ApiExplorer;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using Microsoft.OpenApi.Models;
    using Newtonsoft.Json.Serialization;
    using SampleHubApi.Helper;
    using SampleHubApi.Helpers;
    using SampleHubApi.Interfaces;
    using SampleHubApi.Models;
    using Swashbuckle.AspNetCore.SwaggerGen;
    using System;
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        /// <summary>
        /// This method gets called by the runtime. Use this method to add services to the container.
        /// </summary>
        /// <param name="services">Service collection with input</param>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                builder => builder.WithOrigins("*").AllowAnyHeader().AllowAnyMethod());
            });

            services.Configure<TeamsConfiguration>(Configuration.GetSection("TeamsConfiguration"));
            services.AddApplicationInsightsTelemetry();
            services.AddSingleton<ISharePoint, SharePointHelper>();
            services.AddSingleton<IGraph, GraphHelper>();
            services.AddSingleton<ITableStorage, TableStorageHelper>();
            services.AddHttpClient("TableStorageWebClient", client => client.Timeout = TimeSpan.FromSeconds(600));
            services.AddHttpClient("GraphWebClient", client => client.Timeout = TimeSpan.FromSeconds(600));
            services.AddHttpClient("SharePointWebClient", client => client.Timeout = TimeSpan.FromSeconds(600));
            services.AddAuthentication(options =>
            {
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    AzureADOptions azureAdOptions = new AzureADOptions();
                    Configuration.Bind("AzureAd", azureAdOptions);
                    options.Authority = $"{azureAdOptions.Instance}{azureAdOptions.TenantId}/v2.0";
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidAudiences = AuthenticationHelper.GetValidAudiences(Configuration),
                        ValidIssuers = AuthenticationHelper.GetValidIssuers(Configuration),
                        AudienceValidator = AuthenticationHelper.AudienceValidator
                    };
                });

            services.AddControllers()
                   .AddNewtonsoftJson(options =>
                       options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver())
                            .SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

            services.AddVersioning();
            services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v3", new OpenApiInfo { Title = "My API", Version = "v3" });
                c.AddSecurityDefinition(
                    "Bearer", new OpenApiSecurityScheme
                    {
                        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                        Name = "Authorization",
                        In = ParameterLocation.Header,
                        Type = SecuritySchemeType.ApiKey
                    });
            });
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        /// <param name="app">application builder object as input to instantiate the development mode</param>
        /// <param name="loggerFactory">logger factory object to log the details</param>
        /// <param name="env">Hosting environment variable</param>
        /// <param name="provider">Client version provider</param>
        public void Configure(
            IApplicationBuilder app,
            ILoggerFactory loggerFactory,
            IWebHostEnvironment env,
            IApiVersionDescriptionProvider provider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
                app.AddProductionExceptionHandling(loggerFactory);
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors("AllowAll");
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();
            app.UseSwaggerUI(
                options =>
                {
                    foreach (ApiVersionDescription description in provider.ApiVersionDescriptions)
                    {
                        options.SwaggerEndpoint(
                            $"/swagger/{description.GroupName}/swagger.json",
                            description.GroupName.ToUpperInvariant());
                    }
                });
        }
    }
}
