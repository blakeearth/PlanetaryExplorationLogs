using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Data.DTO;
using PlanetaryExplorationLogs.API.Utility.Helpers;
using PlanetaryExplorationLogs.API.Utility.Patterns;
using System.Net;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace PlanetaryExplorationLogs.API.Requests.Commands.Discoveries.UpdateDiscovery
{
    public class UpdateDiscovery_Validator : ValidatorBase
    {
        private readonly int _id;
        private readonly DiscoveryFormDto _discovery;

        public UpdateDiscovery_Validator(PlanetExplorationDbContext context, int id, DiscoveryFormDto discovery)
            : base(context)
        {
            _id = id;
            _discovery = discovery;
        }

        public override async Task<RequestResult> ValidateAsync()
        {
            await Task.CompletedTask;

            if (!DbContext.Discoveries.Any(d => d.Id == _id))
            {
                return await InvalidResultAsync(
                    HttpStatusCode.BadRequest,
                    "Invalid discovery specified.");
            }

            if (string.IsNullOrEmpty(_discovery.Name.Trim()))
            {
                return await InvalidResultAsync(
                    HttpStatusCode.BadRequest,
                    "The discovery must have a name.");
            }

            if (string.IsNullOrEmpty(_discovery.Description.Trim()))
            {
                return await InvalidResultAsync(
                    HttpStatusCode.BadRequest,
                    "The discovery must have a description.");
            }

            if (string.IsNullOrEmpty(_discovery.Location.Trim()))
            {
                return await InvalidResultAsync(
                    HttpStatusCode.BadRequest,
                    "The discovery must have a location.");
            }

            if (!DbContext.DiscoveryTypes.Any(t => t.Id == _discovery.DiscoveryTypeId))
            {
                return await InvalidResultAsync(
                    HttpStatusCode.BadRequest,
                "The discovery must have a valid type.");
            }

            string errorMessage;
            if (!ValidationHelper.IsValid(_discovery, out errorMessage))
            {
                return await InvalidResultAsync(
                    HttpStatusCode.BadRequest,
                    errorMessage);
            }

            return await ValidResultAsync();
        }
    }

}
