using GetDiscoveriesForMission.API.Requests.Queries.Planets.GetDiscoveriesForMission;
using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Data.Models;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace PlanetaryExplorationLogs.API.Requests.Queries.Missions.GetDiscoveriesForMission
{
    public class GetDiscoveriesForMission_Query(PlanetExplorationDbContext context, int planetId) : RequestBase<List<Discovery>>(context)
    {
        public override IValidator Validator => new GetDiscoveriesForMission_Validator(DbContext, planetId);
        public override IHandler<List<Discovery>> Handler => new GetDiscoveriesForMission_Handler(DbContext, planetId);
    }

}
