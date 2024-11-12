using Microsoft.EntityFrameworkCore;
using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Data.DTO;
using PlanetaryExplorationLogs.API.Utility.Patterns;
using System.Net;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace PlanetaryExplorationLogs.API.Requests.Commands.Discoveries.CreateDiscovery
{
    public class CreateDiscoveryForMission_Validator : ValidatorBase
    {
        private readonly int _missionId;
        private readonly DiscoveryFormDto _discovery;

        public CreateDiscoveryForMission_Validator(PlanetExplorationDbContext context, int missionId, DiscoveryFormDto discovery)
            : base(context)
        {
            _missionId = missionId;
            _discovery = discovery;
        }

        public override async Task<RequestResult> ValidateAsync()
        {
            await Task.CompletedTask;

            if (string.IsNullOrEmpty(_discovery.Name.Trim()))
            {
                return await InvalidResultAsync(
                    HttpStatusCode.BadRequest,
                    "The mission must have a name.");
            }

            if (string.IsNullOrEmpty(_discovery.Description.Trim()))
            {
                return await InvalidResultAsync(
                    HttpStatusCode.BadRequest,
                    "The mission must have a description.");
            }

            if (!await DbContext.Missions.AnyAsync(m => m.Id == _discovery.MissionId) || _discovery.MissionId != _missionId)
            {
                return await InvalidResultAsync(
                    HttpStatusCode.BadRequest,
                    "The discovery must have an associated mission.");
            }

            if (!await DbContext.DiscoveryTypes.AnyAsync(d => d.Id == _discovery.DiscoveryTypeId))
            {
                return await InvalidResultAsync(
                    HttpStatusCode.BadRequest,
                    "The discovery must have an associated discovery type.");
            }

            if (string.IsNullOrEmpty(_discovery.Location.Trim()))
            {
                return await InvalidResultAsync(
                    HttpStatusCode.BadRequest,
                    "The mission must have a location.");
            }

            return await ValidResultAsync();
        }
    }

}
