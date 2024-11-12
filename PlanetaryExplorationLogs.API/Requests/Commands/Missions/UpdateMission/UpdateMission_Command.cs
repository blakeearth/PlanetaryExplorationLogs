using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Data.DTO;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace PlanetaryExplorationLogs.API.Requests.Commands.Missions.UpdateMission
{
    public class UpdateMission_Command : RequestBase<int>
    {
        private readonly int _id;
        private readonly MissionFormDto _mission;

        public UpdateMission_Command(PlanetExplorationDbContext context, int id, MissionFormDto mission)
            : base(context)
        {
            _id = id;
            _mission = mission;
        }

        public override IValidator Validator =>
            new UpdateMission_Validator(DbContext, _id, _mission);

        public override IHandler<int> Handler =>
            new UpdateMission_Handler(DbContext, _id, _mission);
    }
}
