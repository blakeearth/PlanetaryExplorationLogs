using Microsoft.EntityFrameworkCore;
using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Data.Models;
using PlanetaryExplorationLogs.API.Utility.Patterns;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace PlanetaryExplorationLogs.API.Requests.Queries.Planets.GetPlanetMissions
{
    public class GetPlanetMissions_Handler(PlanetExplorationDbContext context, int planetId) : HandlerBase<List<Mission>>(context)
    {
        private readonly int _planetId = planetId;

        public override async Task<RequestResult<List<Mission>>> HandleAsync()
        {
            var missions = await DbContext.Missions
                .Where(m => m.PlanetId == _planetId)
                .Select(m => new Mission
                {
                    Id = m.Id,
                    Name = m.Name,
                    Date = m.Date,
                    Description = m.Description
                })
                .OrderBy(m => m.Date)
                .ToListAsync();

            var result = new RequestResult<List<Mission>> { Data = missions };

            return result;
        }
    }

}
