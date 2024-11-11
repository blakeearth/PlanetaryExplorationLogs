using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Utility.Patterns;
using System.Net;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace PlanetaryExplorationLogs.API.Requests.Queries.Planets.GetPlanetMissions
{
    public class GetPlanetMissions_Validator(PlanetExplorationDbContext context, int planetId) : ValidatorBase(context)
    {
        public override async Task<RequestResult> ValidateAsync()
        {
            if (!DbContext.Missions.Where(m => m.PlanetId == planetId).Any())
            {
                return await InvalidResultAsync(
                    HttpStatusCode.NotFound,
                    "There are no missions records. Please add a mission for this planet.");
            }

            return await ValidResultAsync();
        }
    }

}
