//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ActiveNetwork.Entities
{
    using System;
    using System.Collections.Generic;
    
    public partial class ANEventInformation
    {
        public int Id { get; set; }
        public Nullable<int> ANEventId { get; set; }
        public string EventLocation { get; set; }
        public Nullable<int> EventLocationId { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
    
        public virtual ANEvent ANEvent { get; set; }
        public virtual ANEventLocation ANEventLocation { get; set; }
    }
}
