// <copyright file="IGraph.cs" company="Microsoft">
// Copyright (c) Microsoft. All Rights Reserved.
// </copyright>

namespace BrandHome.Interfaces
{
    using System.Threading.Tasks;
    using BrandHome.Models;

    /// <summary>
    /// Graph Interface
    /// </summary>
    public interface IGraph
    {
        /// <summary>
        /// Declaration of method
        /// </summary>
        /// <param name="token">TokenResponse instance</param>
        /// <param name="userObjectId">string type</param>
        /// <returns>Task string</returns>
        Task<string> GetPhoto( string userObjectId);

        /// <summary>
        /// Declaration of method
        /// </summary>
        /// <param name="token">TokenResponse instance</param>
        /// <returns>task TeamMembers</returns>
        Task<TeamMembers> GetTeamMembers();

        /// <summary>
        /// Declaration of method
        /// </summary>
        /// <param name="idToken">User id Token instance</param>
        /// <returns>task GetAccessTokenOnBehalfUserAsync</returns>
        Task<string> GetAccessTokenOnBehalfUserAsync(string idToken);
    }
}