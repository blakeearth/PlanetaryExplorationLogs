﻿using Microsoft.AspNetCore.Mvc;
using PlanetaryExplorationLogs.API.Data.Context;
using PlanetaryExplorationLogs.API.Data.Models;
using PlanetaryExplorationLogs.API.Requests.Commands.Discoveries.DeleteDiscovery;
using PlanetaryExplorationLogs.API.Requests.Queries.Discoveries.GetDiscovery;
using PlanetaryExplorationLogs.API.Requests.Queries.Discoveries.GetDiscoveryTypes;
using PlanetaryExplorationLogs.API.Utility.Patterns;

namespace PlanetaryExplorationLogs.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscoveryController : ControllerBase
    {
        private readonly PlanetExplorationDbContext _context;
        public DiscoveryController(PlanetExplorationDbContext context)
        {
            _context = context;
        }

        // GET: api/discovery/types
        [HttpGet("types")]
        public async Task<ActionResult<RequestResult<List<DiscoveryType>>>> GetDiscoveryTypes()
        {
            var query = new GetDiscoveryTypes_Query(_context);
            return await query.ExecuteAsync();
        }

        // GET: api/discovery/{id}
        [HttpGet("{id}")]
        public async Task<RequestResult<Discovery>> GetDiscoveryAsync(int id)
        {
            var query = new GetDiscovery_Query(_context, id);
            return await query.ExecuteAsync();
        }

        // PUT: api/discovery/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateDiscovery(int id)
        {
            // Update an existing discovery.
            return StatusCode(501); // Not Implemented
        }

        // DELETE: api/discovery/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<RequestResult<int>>> DeleteDiscovery(int id)
        {
            var cmd = new DeleteDiscovery_Command(_context, id);
            return await cmd.ExecuteAsync();
        }
    }
}
