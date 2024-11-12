using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Utility.Patterns;
using System.Net;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace PlanetaryExplorationLogs.API.Requests.Queries.Missions.GetDiscoveriesForMission
{
    public class GetDiscoveriesForMission_Validator(PlanetExplorationDbContext context, int missionId) : ValidatorBase(context)
    {
        public override async Task<RequestResult> ValidateAsync()
        {
            if (!DbContext.Missions.Where(m => m.Id == missionId).Any())
            {
                return await InvalidResultAsync(
                    HttpStatusCode.NotFound,
                    "There are no discovery records. Please add a discovery for this mission.");
            }

            return await ValidResultAsync();
        }
    }

}
