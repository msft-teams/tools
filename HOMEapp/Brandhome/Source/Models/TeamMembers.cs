// <copyright file="TeamMembers.cs" company="Microsoft">
// Copyright (c) Microsoft. All Rights Reserved.
// </copyright>

namespace BrandHome.Models
{
    /// <summary>
    /// TeamMembers Model.
    /// </summary>
    public class TeamMembers
    {
        /// <summary>
        /// Gets or sets Array of Team members.
        /// </summary>
        public Member[] Value { get; set; }
    }

    /// <summary>
    /// Model for Member.
    /// </summary>
    public class Member
    {
        /// <summary>
        /// Gets or sets User's AAD Id.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Gets or sets User's AAD given name.
        /// </summary>
        public string GivenName { get; set; }

        /// <summary>
        /// Gets or sets User's AAD job title.
        /// </summary>
        public string JobTitle { get; set; }

        /// <summary>
        /// Gets or sets User's AAD user principal name.
        /// </summary>
        public string UserPrincipalName { get; set; }
    }
}