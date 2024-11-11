using Microsoft.EntityFrameworkCore;
using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Data.Models;
using PlanetaryExplorationLogs.API.Utility.Patterns;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace PlanetaryExplorationLogs.API.Requests.Queries.Missions.GetMission
{
    public class GetMission_Handler : HandlerBase<Mission>
    {
        private readonly PlanetExplorationDbContext _context;
        private readonly int _id;

        public GetMission_Handler(PlanetExplorationDbContext context, int id) : base(context)
        {
            _context = context;
            _id = id;
        }

        public override async Task<RequestResult<Mission>> HandleAsync()
        {
            var mission = await _context.Missions
                .Where(m => m.Id == _id)
                .OrderByDescending(t => t.Date)
                .FirstOrDefaultAsync();

            var result = new RequestResult<Mission> { Data = mission };

            return result;
        }
    }

}
