// <copyright file="News.cs" company="Microsoft">
// Copyright (c) Microsoft. All Rights Reserved.
// </copyright>

namespace BrandHome.Models
{
    /// <summary>
    /// News Model
    /// </summary>
    public class News
    {
        /// <summary>
        /// Gets or sets SharePoint News component array value
        /// </summary>
        public Value[] Value { get; set; }
    }

    /// <summary>
    /// News item model for SharePoint component
    /// </summary>
    public class Value
    {
        /// <summary>
        /// Gets or sets SharePoint News Title
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Gets or sets SharePoint News Description
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Gets or sets SharePoint News Link
        /// </summary>
        public string OData__OriginalSourceUrl { get; set; }
    }
}