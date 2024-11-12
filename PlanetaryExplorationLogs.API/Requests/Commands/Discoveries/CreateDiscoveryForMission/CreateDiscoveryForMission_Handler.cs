using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Data.DTO;
using PlanetaryExplorationLogs.API.Data.Models;
using PlanetaryExplorationLogs.API.Utility.Patterns;
using System.Net;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace PlanetaryExplorationLogs.API.Requests.Commands.Planets
{
    public class CreateDiscoveryForMission_Handler : HandlerBase<int>
    {
        private readonly DiscoveryFormDto _discovery;

        public CreateDiscoveryForMission_Handler(PlanetExplorationDbContext context, DiscoveryFormDto discovery)
            : base(context)
        {
            _discovery = discovery;
        }

        public override async Task<RequestResult<int>> HandleAsync()
        {
            var newDiscovery = new Discovery
            {
                Name = _discovery.Name,
                Location = _discovery.Location,
                DiscoveryTypeId = _discovery.DiscoveryTypeId,
                MissionId = _discovery.MissionId,
                Description = _discovery.Description,
            };

            await DbContext.Discoveries.AddAsync(newDiscovery);
            await DbContext.SaveChangesAsync();

            var result = new RequestResult<int>
            {
                Data = newDiscovery.Id,
                StatusCode = HttpStatusCode.Created
            };

            return result;
        }
    }

}
