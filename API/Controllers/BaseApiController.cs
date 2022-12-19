using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers;

[Route("api/[controller]")]
public class BaseApiController : Controller
{
    protected IMediator Mediator => HttpContext.RequestServices.GetService<IMediator>()!;

    protected ActionResult HandleResult<T>(Result<T>? result)
    {
        if (result == null)
        {
            return NotFound();
        }
        else if (result.IsSuccess && result.Value != null)
        {
            return Ok(result);
        }
        else if (result.IsSuccess && result.Value == null)
        {
            return NotFound();
        }
        else
        {
            return BadRequest(result.Error);
        }
    }
}

