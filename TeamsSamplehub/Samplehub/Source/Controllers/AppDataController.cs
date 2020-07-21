// <copyright file="AppDataController.cs" company="Microsoft">
// Copyright (c) Microsoft. All Rights Reserved.
// </copyright>

namespace BrandHome.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using BrandHome.Interfaces;
    using BrandHome.Models;
    using Microsoft.ApplicationInsights;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Options;

    /// <summary>
    /// Controller for getting data related to the application
    /// </summary>
    [Authorize]
    public class AppDataController : Controller
    {
        /// <summary>
        /// IOptions of TeamsConfiguration instance.
        /// </summary>
        private IOptions<TeamsConfiguration> teamsConfig;

        /// <summary>
        ///  TelemetryClient instance.
        /// </summary>
        private TelemetryClient telemetry;

        /// <summary>
        /// ISharePoint instance.
        /// </summary>
        private ISharePoint sharePoint;

        /// <summary>
        /// IGraph instance.
        /// </summary>
        private IGraph graph;

        /// <summary>
        /// ITableStorage instance.
        /// </summary>
        private ITableStorage tableStorage;

        /// <summary>
        /// IConfiguration instance.
        /// </summary>
        private IConfiguration configuration;

        /// <summary>
        /// Initializes a new instance of the <see cref="AppDataController"/> class.
        /// </summary>
        /// <param name="teamsConfig">Teams Configuration</param>
        /// <param name="telemetry">Telemetry instance</param>
        /// <param name="sharePoint">ISharePoint instance</param>
        /// <param name="graph">IGraph instance</param>
        /// <param name="tableStorage">ITableStorage instance</param>
        /// <param name="configuration">IConfiguration instance</param>
        public AppDataController(
            IOptions<TeamsConfiguration> teamsConfig,
            TelemetryClient telemetry,
            ISharePoint sharePoint,
            IGraph graph,
            ITableStorage tableStorage,
            IConfiguration configuration)
        {
            this.teamsConfig = teamsConfig;
            this.telemetry = telemetry;
            this.sharePoint = sharePoint;
            this.graph = graph;
            this.tableStorage = tableStorage;
            this.configuration = configuration;
        }

        /// <summary>
        /// Get News Data from SharePoint component
        /// </summary>
        /// <returns>Return News Data</returns>
        [HttpGet("NewsData")]
        public async Task<ActionResult<News>> GetNewsDataAsync()
        {
            this.telemetry.TrackEvent("GetNewsData");
            try
            {
                return await this.sharePoint.GetNewsFromSharePoint();
            }
            catch (Exception ex)
            {
                this.telemetry.TrackException(ex);
                return null;
            }
        }

        /// <summary>
        /// Retrieve team members along with profile pictures
        /// </summary>
        /// <param name="tokenResponse">User Access token</param>
        /// <returns>Returns Team members details</returns>
        [HttpGet("TeamMemberDetails")]
        public async Task<ActionResult<List<TeamMemberDetails>>> TeamMemberDetailsAsync()
        {
            this.telemetry.TrackEvent("TeamMemberDetailsAsync");
            try
            {
                List<TeamMemberDetails> teamMemberDetails = new List<TeamMemberDetails>();
                TeamMembers team = await this.graph.GetTeamMembers();
                if (team != null)
                {
                    foreach (Member member in team.Value)
                    {
                        TeamMemberDetails teamMember = new TeamMemberDetails()
                        {
                            GivenName = member.GivenName,
                            UserPrincipalName = member.UserPrincipalName,
                            JobTitle = member.JobTitle,
                            ProfilePhotoUrl = await this.graph.GetPhoto(member.Id)
                        };
                        teamMemberDetails.Add(teamMember);
                    }
                }

                return teamMemberDetails;
            }
            catch (Exception ex)
            {
                this.telemetry.TrackException(ex);
                return null;
            }
        }

        /// <summary>
        /// Retrieve company communicator card from storage table
        /// </summary>
        /// <returns>Return company communicator card</returns>
        [HttpGet("AnnouncementAdaptiveCardDetails")]
        public async Task<ActionResult<CompanyCommunicatorTableData>> GetAnnouncementAdaptiveCardDetailsAsync()
        {
            this.telemetry.TrackEvent("GetAnnoucementAdaptiveCardAsync");
            try
            {
                return await this.tableStorage.GetAdaptiveCardAsync();
            }
            catch (Exception ex)
            {
                this.telemetry.TrackException(ex);
                return null;
            }
        }

        /// <summary>
        /// Retrieve teams configuration details from configuration file
        /// </summary>
        /// <returns>teams configuration</returns>
        [HttpGet("TeamsConfig")]
        public ActionResult<TeamsConfiguration> GetTeamsConfig()
        {
            this.telemetry.TrackEvent("GetTeamsConfig");
            return this.teamsConfig.Value;
        }
    }
}