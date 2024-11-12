using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Data.DTO;
using PlanetaryExplorationLogs.API.Requests.Commands.Discoveries.CreateDiscovery;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace PlanetaryExplorationLogs.API.Requests.Commands.Planets
{
    public class CreateDiscoveryForMission_Command : RequestBase<int>
    {
        private readonly int _missionId;
        private readonly DiscoveryFormDto _discovery;

        public CreateDiscoveryForMission_Command(PlanetExplorationDbContext context, int missionId, DiscoveryFormDto discovery)
            : base(context)
        {
            _missionId = missionId;
            _discovery = discovery;
        }

        public override IValidator Validator =>
            new CreateDiscoveryForMission_Validator(DbContext, _missionId, _discovery);

        // Already validated that _missionId == _discovery.MissionId
        public override IHandler<int> Handler =>
            new CreateDiscoveryForMission_Handler(DbContext, _discovery);
    }
}
