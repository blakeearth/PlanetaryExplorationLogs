﻿using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Data.DTO;
using PlanetaryExplorationLogs.API.Utility.Helpers;
using PlanetaryExplorationLogs.API.Utility.Patterns;
using System.Net;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace PlanetaryExplorationLogs.API.Requests.Commands.Missions.UpdateMission
{
    public class UpdateMission_Validator : ValidatorBase
    {
        private readonly int _id;
        private readonly MissionFormDto _mission;

        public UpdateMission_Validator(PlanetExplorationDbContext context, int id, MissionFormDto mission)
            : base(context)
        {
            _id = id;
            _mission = mission;
        }

        public override async Task<RequestResult> ValidateAsync()
        {
            await Task.CompletedTask;

            if (!DbContext.Missions.Any(m => m.Id == _id))
            {
                return await InvalidResultAsync(
                    HttpStatusCode.BadRequest,
                    "Invalid mission specified.");
            }

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
                    "The planet must have a description.");
            }

            if (_mission.Date == default)
            {
                return await InvalidResultAsync(
                    HttpStatusCode.BadRequest,
                    "The planet must have a valid date.");
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
