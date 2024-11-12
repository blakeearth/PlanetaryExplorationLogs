using DiscoveryaryExplorationLogs.API.Requests.Commands.Discoveries.UpdateDiscovery;
using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Data.DTO;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace PlanetaryExplorationLogs.API.Requests.Commands.Discoveries.UpdateDiscovery
{
    public class UpdateDiscovery_Command : RequestBase<int>
    {
        private readonly DiscoveryFormDto _discovery;
        private readonly int _id;

        public UpdateDiscovery_Command(PlanetExplorationDbContext context, int id, DiscoveryFormDto discovery)
            : base(context)
        {
            _id = id;
            _discovery = discovery;
        }

        public override IValidator Validator =>
            new UpdateDiscovery_Validator(DbContext, _id, _discovery);

        public override IHandler<int> Handler =>
            new UpdateDiscovery_Handler(DbContext, _id, _discovery);
    }
}
