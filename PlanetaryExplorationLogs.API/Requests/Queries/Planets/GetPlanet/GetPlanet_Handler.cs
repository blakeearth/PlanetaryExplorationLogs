using Microsoft.EntityFrameworkCore;
using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Data.DTO;
using PlanetaryExplorationLogs.API.Utility.Patterns;
using static PlanetaryExplorationLogs.API.Utility.Patterns.CommandQuery;

namespace PlanetaryExplorationLogs.API.Requests.Queries.Planets.GetPlanet
{
    public class GetPlanet_Handler : HandlerBase<PlanetFormDto>
    {
        private readonly int _planetId;

        public GetPlanet_Handler(PlanetExplorationDbContext context, int planetId)
            : base(context)
        {
            _planetId = planetId;
        }

        public override async Task<RequestResult<PlanetFormDto>> HandleAsync()
        {
            var planet = await DbContext.Planets
                .Where(p => p.Id == _planetId)
                .Select(p => new PlanetFormDto
                {
                    Name = p.Name,
                    Climate = p.Climate,
                    Terrain = p.Terrain,
                    Population = p.Population,
                    Type = p.Type

                }).FirstOrDefaultAsync();

            var result = new RequestResult<PlanetFormDto> { Data = planet };

            return result;
        }
    }

}
