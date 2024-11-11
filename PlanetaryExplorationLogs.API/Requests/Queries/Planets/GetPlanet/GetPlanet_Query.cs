using PlanetaryExplorationLogs.API.Data.DTO;
using PlanetaryExplorationLogs.API.Data.Context;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;
using PlanetaryExplorationLogs.API.Requests.Queries.Planets.GetPlanet;

namespace PlanetaryExplorationLogs.API.Requests.Queries.Planets.GetPlanetsDropdownList
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
