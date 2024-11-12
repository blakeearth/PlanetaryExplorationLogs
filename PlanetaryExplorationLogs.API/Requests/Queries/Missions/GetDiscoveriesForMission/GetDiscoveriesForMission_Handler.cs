using Microsoft.EntityFrameworkCore;
using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Data.Models;
using PlanetaryExplorationLogs.API.Utility.Patterns;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace GetDiscoveriesForMission.API.Requests.Queries.Planets.GetDiscoveriesForMission
{
    public class GetDiscoveriesForMission_Handler(PlanetExplorationDbContext context, int missionId) : HandlerBase<List<Discovery>>(context)
    {
        private readonly int _missionId = missionId;

        public override async Task<RequestResult<List<Discovery>>> HandleAsync()
        {
            var discoveries = await DbContext.Discoveries
                .Where(d => d.MissionId == _missionId)
                .Select(d => new Discovery
                {
                    Id = d.Id,
                    Name = d.Name,
                    Location = d.Location,
                    Description = d.Description,
                    MissionId = d.MissionId,
                    DiscoveryTypeId = d.DiscoveryTypeId,
                })
                .ToListAsync();

            var result = new RequestResult<List<Discovery>> { Data = discoveries };

            return result;
        }
    }

}
