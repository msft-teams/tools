// <copyright file="TeamMemberDetails.cs" company="Microsoft">
// Copyright (c) Microsoft. All Rights Reserved.
// </copyright>

namespace BrandHome.Models
{
    /// <summary>
    /// Team members details Model
    /// </summary>
    public class TeamMemberDetails
    {
        /// <summary>
        /// Gets or sets AAD User Name
        /// </summary>
        public string GivenName { get; set; }

        /// <summary>
        /// Gets or sets AAD User's Principal Name
        /// </summary>
        public string UserPrincipalName { get; set; }

        /// <summary>
        /// Gets or sets AAD User's Job title
        /// </summary>
        public string JobTitle { get; set; }

        /// <summary>
        /// Gets or sets AAD User profile photo
        /// </summary>
        public string ProfilePhotoUrl { get; set; }
    }
}