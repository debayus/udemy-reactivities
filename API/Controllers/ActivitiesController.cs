using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers;

//[Route("api/[controller]")]
public class ActivitiesController : BaseApiController
{
    private readonly DataContext _db;

    public ActivitiesController(DataContext db)
    {
        _db = db;
    }

    [HttpGet]
    public ActionResult<List<Domain.Activity>> Get()
    {
        return _db.Activities.ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<Domain.Activity> Get(Guid id)
    {
        return _db.Activities.First(x => x.Id == id);
    }

    // POST api/values
    [HttpPost]
    public void Post([FromBody]string value)
    {
    }

    // PUT api/values/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody]string value)
    {
    }

    // DELETE api/values/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
}

