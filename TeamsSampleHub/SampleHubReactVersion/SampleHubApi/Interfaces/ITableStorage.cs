// <copyright file="ITableStorage.cs" company="Microsoft">
// Copyright (c) Microsoft. All Rights Reserved.
// </copyright>

namespace SampleHubApi.Interfaces
{
    using SampleHubApi.Models;
    using System.Threading.Tasks;

    /// <summary>
    /// Storage table Interface
    /// </summary>
    public interface ITableStorage
    {
        /// <summary>
        /// Declaration of method.
        /// </summary>
        /// <returns>Task CompanyCommunicatorTableData</returns>
        Task<CompanyCommunicatorTableData> GetAdaptiveCardAsync();
    }
}