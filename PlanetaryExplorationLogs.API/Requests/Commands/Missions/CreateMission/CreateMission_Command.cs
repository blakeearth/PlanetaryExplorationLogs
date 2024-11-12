using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Data.DTO;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace PlanetaryExplorationLogs.API.Requests.Commands.Planets
{
    public class CreateMission_Command : RequestBase<int>
    {
        private readonly MissionFormDto _mission;

        public CreateMission_Command(PlanetExplorationDbContext context, MissionFormDto mission)
            : base(context)
        {
            _mission = mission;
        }

        public override IValidator Validator =>
            new CreateMission_Validator(DbContext, _mission);

        public override IHandler<int> Handler =>
            new CreateMission_Handler(DbContext, _mission);
    }
}
