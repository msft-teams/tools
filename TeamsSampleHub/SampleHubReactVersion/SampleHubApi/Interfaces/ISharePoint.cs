// <copyright file="ISharePoint.cs" company="Microsoft">
// Copyright (c) Microsoft. All Rights Reserved.
// </copyright>

namespace SampleHubApi.Interfaces
{
    using SampleHubApi.Models;
    using System.Threading.Tasks;

    /// <summary>
    /// SharePoint Interface
    /// </summary>
    public interface ISharePoint
    {
        /// <summary>
        /// Declaration of method.
        /// </summary>
        /// <returns>Task string</returns>
        Task<string> GetAuthenticationToken();

        /// <summary>
        /// Declaration of method.
        /// </summary>
        /// <returns>Task News</returns>
        Task<News> GetNewsFromSharePoint();
    }
}