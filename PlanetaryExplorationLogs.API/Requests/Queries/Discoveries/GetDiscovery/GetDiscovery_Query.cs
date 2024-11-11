using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Data.Models;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace PlanetaryExplorationLogs.API.Requests.Queries.Discoveries.GetDiscovery
{
    public class GetDiscovery_Query : RequestBase<Discovery>
    {
        private readonly int _id;

        public GetDiscovery_Query(PlanetExplorationDbContext context, int id)
            : base(context)
        {
            this._id = id;
        }

        public override IHandler<Discovery> Handler => new GetDiscovery_Handler(DbContext, _id);
    }
}