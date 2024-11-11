using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Data.Models;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace PlanetaryExplorationLogs.API.Requests.Queries.Planets.GetPlanetMissions
{
    public class GetPlanetMissionsMissions_Query(PlanetExplorationDbContext context, int planetId) : RequestBase<List<Mission>>(context)
    {
        public override IValidator Validator => new GetPlanetMissions_Validator(DbContext, planetId);
        public override IHandler<List<Mission>> Handler => new GetPlanetMissions_Handler(DbContext, planetId);
    }

}
