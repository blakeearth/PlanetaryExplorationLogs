﻿using System.ComponentModel.DataAnnotations;

namespace PlanetaryExplorationLogs.API.Data.DTO
{
    public class MissionFormDto
    {

        [Required]
        [StringLength(150)]
        public string Name { get; set; } = "";

        [Required]
        public DateTime Date { get; set; }

        [StringLength(500)]
        public string Description { get; set; } = "";

        [Required]
        public int PlanetId { get; set; }
    }
}