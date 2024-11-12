using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Data.DTO;
using PlanetaryExplorationLogs.API.Utility.Patterns;
using System.Net;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace PlanetaryExplorationLogs.API.Requests.Commands.Missions.UpdateMission
{
    public class UpdateMission_Handler : HandlerBase<int>
    {
        private readonly int _id;
        private readonly MissionFormDto _mission;

        public UpdateMission_Handler(PlanetExplorationDbContext context, int id, MissionFormDto mission)
            : base(context)
        {
            _id = id;
            _mission = mission;
        }

        public override async Task<RequestResult<int>> HandleAsync()
        {
            var updatedMission = await DbContext.Missions.FindAsync(_id);
            if (updatedMission != null)
            {
                updatedMission.Name = _mission.Name;
                updatedMission.Date = _mission.Date;
                updatedMission.Description = _mission.Description;
                await DbContext.SaveChangesAsync();
            }

            // Return the data
            var result = new RequestResult<int>
            {
                Data = updatedMission?.Id ?? -1,
                StatusCode = HttpStatusCode.OK
            };

            return result;
        }
    }

}
