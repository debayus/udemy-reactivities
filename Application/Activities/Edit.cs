using System;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
	public class Edit
	{
        public class Command : IRequest
        {
            public Activity Activity { get; set; } = default!;
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext conetx, IMapper mapper)
            {
                _context = conetx;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id) ?? default!;
                _mapper.Map(request.Activity, activity);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}

