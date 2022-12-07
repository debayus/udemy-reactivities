using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers;

[Route("api/[controller]")]
public class BaseApiController : Controller
{
    protected IMediator Mediator => HttpContext.RequestServices.GetService<IMediator>()!;
}

