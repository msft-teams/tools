// <copyright file="CompanyCommunicatorTableData.cs" company="Microsoft">
// Copyright (c) Microsoft. All Rights Reserved.
// </copyright>

namespace BrandHome.Models
{
    /// <summary>
    /// Class for accessing storage table
    /// </summary>
    public class CompanyCommunicatorTableData
    {
        /// <summary>
        /// Gets or sets Array of storage table records.
        /// </summary>
        public Record[] Value { get; set; }
    }

    /// <summary>
    /// Storage table record.
    /// </summary>
    public class Record
    {
        /// <summary>
        /// Gets or sets Storage Table Partition key for company communicator
        /// </summary>
        public string PartitionKey { get; set; }

        /// <summary>
        /// Gets or sets Storage Table Row key for company communicator
        /// </summary>
        public string RowKey { get; set; }

        /// <summary>
        /// Gets or sets Adoptive card from storage table
        /// </summary>
        public string Content { get; set; }

        /// <summary>
        /// Gets or sets Teams channel id where the message is being posted
        /// </summary>
        public string TeamsInString { get; set; }
    }
}
