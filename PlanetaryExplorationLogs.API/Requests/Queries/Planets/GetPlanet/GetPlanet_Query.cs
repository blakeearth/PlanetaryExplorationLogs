using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Data.DTO;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace PlanetaryExplorationLogs.API.Requests.Queries.Planets.GetPlanet
{
    public class GetPlanet_Query : RequestBase<PlanetFormDto>
    {
        public GetPlanet_Query(PlanetExplorationDbContext context, int planetId)
            : base(context)
        {
            _planetId = planetId;
        }

        int _planetId;

        public override IValidator Validator => new GetPlanet_Validator(DbContext);
        public override IHandler<PlanetFormDto> Handler => new GetPlanet_Handler(DbContext, _planetId);
    }

}
