// <copyright file="ApplicationConfigurationsController.cs" company="Microsoft">
// Copyright (c) Microsoft. All Rights Reserved.
// </copyright>

namespace BrandHome.Controllers
{
    using Microsoft.ApplicationInsights;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using System;

    /// <summary>
    /// Controller for the rendering the views
    /// </summary>
    public class ApplicationConfigurationsController : Controller
    {
        /// <summary>
        /// IConfiguration instance.
        /// </summary>
        private readonly IConfiguration configuration;

        /// <summary>
        /// TelemetryClient instance.
        /// </summary>
        private readonly TelemetryClient telemetry;

        /// <summary>
        /// Initializes a new instance of the <see cref="ApplicationConfigurationsController"/> class.
        /// </summary>
        /// <param name="configuration">IConfiguration instance</param>
        /// <param name="telemetry">TelemetryClient instance</param>
        public ApplicationConfigurationsController(IConfiguration configuration, TelemetryClient telemetry)
        {
            this.configuration = configuration;
            this.telemetry = telemetry;
        }

        /// <summary>
        /// Sample Hub Tab
        /// </summary>
        /// <returns>current View</returns>
        public IActionResult Index()
        {
            this.telemetry.TrackEvent("Index");
            ViewBag.TeamId = this.configuration["TeamId"];
            ViewBag.TasksAppId = this.configuration["TeamsConfiguration:TasksAppId"];
            return this.View();
        }

        /// <summary>
        /// Survey Tab
        /// </summary>
        /// <returns>current View</returns>
        [HttpGet("surveys")]
        public ActionResult Surveys()
        {
            this.telemetry.TrackEvent("Surveys");
            ViewBag.TeamId = this.configuration["TeamId"];
            return this.View();
        }

        /// <summary>
        /// Learning Tab
        /// </summary>
        /// <returns>current View</returns>
        [HttpGet("Learning")]
        public ActionResult Learning()
        {
            this.telemetry.TrackEvent("Learning");
            ViewBag.TeamId = this.configuration["TeamId"];
            return this.View();
        }

        /// returns Paystubs view
        /// </summary>
        /// <returns></returns>
        [HttpGet("paystubs")]
        public ActionResult Paystubs()
        {
            return View();
        }

        /// <summary>
        /// return Payhistory view
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        [HttpGet("payhistory/{date}")]
        public ActionResult Payhistory(DateTime date)
        {
            ViewBag.date = date;
            return View();
        }

        /// <summary>
        /// returns Rewards view
        /// </summary>
        /// <returns></returns>
        [HttpGet("rewards")]
        public ActionResult Rewards()
        {
            return View();
        }

        /// <summary>
        /// Authentication start
        /// </summary>
        /// <returns>current View</returns>
        [HttpGet("Start")]
        public IActionResult Start()
        {
            this.telemetry.TrackEvent("Start");
            ViewBag.AzureClientId = this.configuration["AzureClientId"];
            return this.View();
        }

        /// <summary>
        /// Authentication End
        /// </summary>
        /// <returns>current View</returns>
        [HttpGet("End")]
        public IActionResult End()
        {
            this.telemetry.TrackEvent("End");
            return this.View();
        }
    }
}
