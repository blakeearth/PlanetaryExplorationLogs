using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Data.Models;
using PlanetaryExplorationLogs.API.Utility.Helpers;
using PlanetaryExplorationLogs.API.Utility.Patterns;
using System.Net;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace PlanetaryExplorationLogs.API.Requests.Commands.Planets.UpdatePlanet
{
    public class UpdatePlanet_Validator : ValidatorBase
    {
        private readonly Planet _planet;

        public UpdatePlanet_Validator(PlanetExplorationDbContext context, Planet planet)
            : base(context)
        {
            _planet = planet;
        }

        public override async Task<RequestResult> ValidateAsync()
        {
            await Task.CompletedTask;

            if (!DbContext.Planets.Any(p => p.Id == _planet.Id))
            {
                return await InvalidResultAsync(
                    HttpStatusCode.BadRequest,
                    "Invalid planet specified.");
            }

            if (string.IsNullOrEmpty(_planet.Name.Trim()))
            {
                return await InvalidResultAsync(
                    HttpStatusCode.BadRequest,
                    "The planet must have a name.");
            }

            if (string.IsNullOrEmpty(_planet.Type.Trim()))
            {
                return await InvalidResultAsync(
                    HttpStatusCode.BadRequest,
                    "The planet must have a type.");
            }

            string errorMessage;
            if (!ValidationHelper.IsValid(_planet, out errorMessage))
            {
                return await InvalidResultAsync(
                    HttpStatusCode.BadRequest,
                    errorMessage);
            }

            return await ValidResultAsync();
        }
    }

}
