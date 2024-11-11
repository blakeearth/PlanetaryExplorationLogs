using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Data.Models;
using PlanetaryExplorationLogs.API.Requests.Queries.Planets.GetPlanetMissions;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace PlanetaryExplorationLogs.API.Requests.Queries.Missions.GetDiscoveriesForMission
{
    public class GetDiscoveriesForMission(PlanetExplorationDbContext context, int planetId) : RequestBase<List<Mission>>(context)
    {
        public override IValidator Validator => new GetPlanetMissions_Validator(DbContext, planetId);
        public override IHandler<List<Mission>> Handler => new GetPlanetMissions_Handler(DbContext, planetId);
    }

}
