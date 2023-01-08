using Core.Entities.Identity;
using Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IMailService
    {
        Task<bool> SendMailAsync(string To, string Subject, string Body); 
        Task SendPasswordResetMailAsync(string toEmail, string userId, string resetToken);
    }
}
