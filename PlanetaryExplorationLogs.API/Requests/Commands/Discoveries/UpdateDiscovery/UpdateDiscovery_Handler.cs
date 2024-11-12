using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Data.DTO;
using PlanetaryExplorationLogs.API.Utility.Patterns;
using System.Net;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace DiscoveryaryExplorationLogs.API.Requests.Commands.Discoveries.UpdateDiscovery
{
    public class UpdateDiscovery_Handler : HandlerBase<int>
    {
        private readonly DiscoveryFormDto _discovery;
        private readonly int _id;

        public UpdateDiscovery_Handler(PlanetExplorationDbContext context, int id, DiscoveryFormDto discovery)
            : base(context)
        {
            _id = id;
            _discovery = discovery;
        }

        public override async Task<RequestResult<int>> HandleAsync()
        {
            var updatedDiscovery = await DbContext.Discoveries.FindAsync(_id);
            if (updatedDiscovery != null)
            {
                updatedDiscovery.Name = _discovery.Name;
                updatedDiscovery.Description = _discovery.Description;
                updatedDiscovery.DiscoveryTypeId = _discovery.DiscoveryTypeId;
                updatedDiscovery.Location = _discovery.Location;
                await DbContext.SaveChangesAsync();
            }

            var result = new RequestResult<int>
            {
                Data = updatedDiscovery?.Id ?? -1,
                StatusCode = HttpStatusCode.OK
            };

            return result;
        }
    }

}
