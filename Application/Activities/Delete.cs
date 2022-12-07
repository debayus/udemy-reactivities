using System;
using MediatR;
using Persistence;

namespace Application.Activities
{
	public class Delete
	{
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext conetx)
            {
                _context = conetx;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                if (activity != null)
                {
                    _context.Activities.Remove(activity);
                }
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}

