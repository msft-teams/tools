// <summary>
// Api controller for user interface components
// </summary>
// <copyright file="SampleHubDataController.cs" company="Microsoft">
// Copyright (c) Microsoft. All Rights Reserved.
// </copyright>

namespace SampleHubApi.Controllers
{
    using Microsoft.ApplicationInsights;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Options;
    using SampleHubApi.Helpers;
    using SampleHubApi.Interfaces;
    using SampleHubApi.Models;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    /// <summary>
    /// Sample hub data controller class
    /// </summary>
    [Authorize, Route("samplehub"), EnableCors("AllowAll"), ApiController]
    public class SampleHubDataController : AuthorizedApiControllerBase
    {
        /// <summary>
        /// IOptions of TeamsConfiguration instance.
        /// </summary>
        private readonly IOptions<TeamsConfiguration> _teamsConfig;

        /// <summary>
        ///  TelemetryClient instance.
        /// </summary>
        private readonly TelemetryClient _telemetry;

        /// <summary>
        /// ISharePoint instance.
        /// </summary>
        private readonly ISharePoint _sharePoint;

        /// <summary>
        /// IGraph instance.
        /// </summary>
        private readonly IGraph _graph;

        /// <summary>
        /// ITableStorage instance.
        /// </summary>
        private readonly ITableStorage _tableStorage;

        /// <summary>
        /// IConfiguration instance.
        /// </summary>
        private readonly IConfiguration _configuration;

        /// <summary>
        /// Initializes a new instance of the <see cref="SampleHubDataController"/> class.
        /// </summary>
        /// <param name="teamsConfig">Teams Configuration</param>
        /// <param name="telemetry">Telemetry instance</param>
        /// <param name="sharePoint">ISharePoint instance</param>
        /// <param name="graph">IGraph instance</param>
        /// <param name="tableStorage">ITableStorage instance</param>
        /// <param name="configuration">IConfiguration instance</param>
        public SampleHubDataController(
            IOptions<TeamsConfiguration> teamsConfig,
            TelemetryClient telemetry,
            ISharePoint sharePoint,
            IGraph graph,
            ITableStorage tableStorage,
            IConfiguration configuration)
        {
            this._teamsConfig = teamsConfig;
            this._telemetry = telemetry;
            this._sharePoint = sharePoint;
            this._graph = graph;
            this._tableStorage = tableStorage;
            this._configuration = configuration;
        }

        /// <summary>
        /// Get News Data from SharePoint component
        /// </summary>
        /// <returns>Return News Data</returns>
        [HttpGet("NewsData")]
        public async Task<ActionResult<News>> GetNewsDataAsync()
        {
            _telemetry.TrackEvent("GetNewsData");
            try
            {
                return await _sharePoint.GetNewsFromSharePoint();
            }
            catch (Exception ex)
            {
                _telemetry.TrackException(ex);
                return null;
            }
        }

        /// <summary>
        /// Retrieve team members along with profile pictures
        /// </summary>
        /// <returns>Returns Team members details</returns>
        [HttpGet("TeamMemberDetails")]
        public async Task<ActionResult<List<TeamMemberDetails>>> TeamMemberDetailsAsync()
        {
            _telemetry.TrackEvent("TeamMemberDetailsAsync");
            try
            {
                List<TeamMemberDetails> teamMemberDetails = new List<TeamMemberDetails>();
                TeamMembers team = await _graph.GetTeamMembers();
                if (team != null)
                {
                    foreach (Member member in team.Value)
                    {
                        TeamMemberDetails teamMember = new TeamMemberDetails()
                        {
                            GivenName = member.GivenName,
                            UserPrincipalName = member.UserPrincipalName,
                            JobTitle = member.JobTitle,
                            ProfilePhotoUrl = await _graph.GetPhoto(member.Id)
                        };
                        teamMemberDetails.Add(teamMember);
                    }
                }

                return teamMemberDetails;
            }
            catch (Exception ex)
            {
                _telemetry.TrackException(ex);
                return null;
            }
        }

        /// <summary>
        /// Retrieve team members along with profile pictures
        /// </summary>
        /// <returns>Returns Team members details</returns>
        [HttpGet("GetUserAccessToken")]
        public async Task<ActionResult<string>> GetUserAccessToken()
        {
            _telemetry.TrackEvent("GetUserAccessToken");
            try
            {
                string idToken = Request.Headers["Authorization"].ToString()?.Split(" ")[1];
                return await _graph.GetAccessTokenOnBehalfUserAsync(idToken);
            }
            catch (Exception ex)
            {
                _telemetry.TrackException(ex);
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
            _telemetry.TrackEvent("GetAnnoucementAdaptiveCardAsync");
            try
            {
                return await _tableStorage.GetAdaptiveCardAsync();
            }
            catch (Exception ex)
            {
                _telemetry.TrackException(ex);
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
            _telemetry.TrackEvent("GetTeamsConfig");
            return _teamsConfig.Value;
        }
    }
}