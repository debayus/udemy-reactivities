using System;
namespace API.DTOs;

public class UserDto
{
    public string? DisplayName { get; set; }
    public string Token { get; set; } = default!;
    public string? Image { get; set; }
    public string Username { get; set; } = default!;
}

