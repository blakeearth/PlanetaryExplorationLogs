using Microsoft.EntityFrameworkCore;
using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Data.Models;
using PlanetaryExplorationLogs.API.Utility.Patterns;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace PlanetaryExplorationLogs.API.Requests.Queries.Discoveries.GetDiscovery
{
    public class GetDiscovery_Handler : HandlerBase<Discovery>
    {
        private readonly PlanetExplorationDbContext _context;
        private readonly int _id;

        public GetDiscovery_Handler(PlanetExplorationDbContext context, int id) : base(context)
        {
            _context = context;
            _id = id;
        }

        public override async Task<RequestResult<Discovery>> HandleAsync()
        {
            var Discovery = await _context.Discoveries
                .Where(m => m.Id == _id)
                .FirstOrDefaultAsync();

            var result = new RequestResult<Discovery> { Data = Discovery };

            return result;
        }
    }

}
