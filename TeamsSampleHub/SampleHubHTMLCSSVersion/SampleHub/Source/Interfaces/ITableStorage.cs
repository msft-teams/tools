// <copyright file="ITableStorage.cs" company="Microsoft">
// Copyright (c) Microsoft. All Rights Reserved.
// </copyright>

namespace BrandHome.Interfaces
{
    using System.Threading.Tasks;
    using BrandHome.Models;

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