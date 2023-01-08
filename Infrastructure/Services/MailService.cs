using Core.Entities.Identity;
using Core.Interfaces;
using Core.Model;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class MailService : IMailService
    {
        private readonly IConfiguration _configuration;
        private EmailSettings _emailSettings { get; }

        public MailService(IConfiguration configuration, IOptions<EmailSettings> emailSettings)
        {
            _configuration = configuration;
            _emailSettings = emailSettings.Value;
        }
        public async Task<bool> SendMailAsync(string To, string Subject, string Body)
        {
            var client = new SendGridClient(_emailSettings.ApiKey);
            var to = new EmailAddress(To, _emailSettings.FromName);
            var from = new EmailAddress
            {
                Email = _emailSettings.FromAddress,
                Name = _emailSettings.FromName
            };

            var message = MailHelper.CreateSingleEmail(from, to, Subject, Body, Body);
            var response = await client.SendEmailAsync(message);

            return response.StatusCode == System.Net.HttpStatusCode.OK || response.StatusCode == System.Net.HttpStatusCode.Accepted;

        }

        public async Task SendPasswordResetMailAsync(string toEmail, string userId, string resetToken)
        {
            StringBuilder mail = new();
            mail.AppendLine("Hello!<br>If you want to reset your password please click in the link below<br><strong><a target=\"_blank\" href=\"");
            mail.AppendLine(_configuration["ClientUrl"] + "account/update-password/" + userId + "/" + resetToken);
            mail.AppendLine("\">Click for new password...</a></strong><br><br><span style=\"font-size:12px;\">NOTE : If you have not requested a new password please skip this email!</span><br><br><br>Carbook");
            await SendMailAsync(toEmail, "Password reset request", mail.ToString());
        }

    
    }
}
