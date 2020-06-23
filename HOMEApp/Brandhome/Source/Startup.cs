// <copyright file="Startup.cs" company="Microsoft">
// Copyright (c) Microsoft. All Rights Reserved.
// </copyright>

namespace BrandHome
{
    using System;
    using BrandHome.Helper;
    using BrandHome.Interfaces;
    using BrandHome.Models;
    using Microsoft.AspNetCore.Authentication.AzureAD.UI;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Microsoft.IdentityModel.Tokens;
    using Newtonsoft.Json;

    /// <summary>
    /// Startup class
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Startup" /> class.
        /// </summary>
        /// <param name="configuration">IConfiguration instance</param>
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        /// <summary>
        /// Gets IConfiguration Instance. 
        /// </summary>
        public IConfiguration Configuration { get; }

        /// <summary>
        /// This method gets called by the runtime. Use this method to add services to the container.
        /// </summary>
        /// <param name="services">IServiceCollection instance</param>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddControllers().AddNewtonsoftJson(options =>
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);
            services.Configure<TeamsConfiguration>(this.Configuration.GetSection("TeamsConfiguration"));
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
                    var azureADOptions = new AzureADOptions();
                    Configuration.Bind("AzureAd", azureADOptions);
                    options.Authority = $"{azureADOptions.Instance}{azureADOptions.TenantId}/v2.0";
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidAudiences = AuthenticationHelper.GetValidAudiences(Configuration),
                        ValidIssuers = AuthenticationHelper.GetValidIssuers(Configuration),
                        AudienceValidator = AuthenticationHelper.AudienceValidator
                    };
                });
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        /// <param name="app">IApplicationBuilder instance</param>
        /// <param name="env">IWebHostEnvironment instance</param>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/ApplicationConfigurations/Error");
                //// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=ApplicationConfigurations}/{action=Index}/{id?}");
            });
        }
    }
}