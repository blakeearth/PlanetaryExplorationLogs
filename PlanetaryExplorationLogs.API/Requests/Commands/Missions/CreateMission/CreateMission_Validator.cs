﻿using Microsoft.EntityFrameworkCore;
using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Data.DTO;
using PlanetaryExplorationLogs.API.Utility.Helpers;
using PlanetaryExplorationLogs.API.Utility.Patterns;
using System.Net;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace PlanetaryExplorationLogs.API.Requests.Commands.Planets
{
    public class CreateMission_Validator : ValidatorBase
    {
        private readonly MissionFormDto _mission;

        public CreateMission_Validator(PlanetExplorationDbContext context, MissionFormDto planet)
            : base(context)
        {
            _mission = planet;
        }

        public override async Task<RequestResult> ValidateAsync()
        {
            await Task.CompletedTask;

            if (string.IsNullOrEmpty(_mission.Name.Trim()))
            {
                return await InvalidResultAsync(
                    HttpStatusCode.BadRequest,
                    "The mission must have a name.");
            }

            if (string.IsNullOrEmpty(_mission.Description.Trim()))
            {
                return await InvalidResultAsync(
                    HttpStatusCode.BadRequest,
                    "The mission must have a description.");
            }

            if (!await DbContext.Planets.AnyAsync(p => p.Id == _mission.PlanetId))
            {
                return await InvalidResultAsync(
                    HttpStatusCode.BadRequest,
                    "The mission must have an associated planet.");
            }

            if (_mission.Date == default)
            {
                return await InvalidResultAsync(
                    HttpStatusCode.BadRequest,
                "The mission must have a valid date.");
            }

            string errorMessage;
            if (!ValidationHelper.IsValid(_mission, out errorMessage))
            {
                return await InvalidResultAsync(
                    HttpStatusCode.BadRequest,
                    errorMessage);
            }

            return await ValidResultAsync();
        }
    }

}
