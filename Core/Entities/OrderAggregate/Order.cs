using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.OrderAggregate
{
    public class Order : BaseEntity
    {
        public Order()
        {
        }
        public Order(List<OrderItem> orderItems, string buyerEmail, Address shipToAddress, 
                    DeliveryMethod deliveryMethod, double subtotal, string paymentIntentId)
        {
            BuyerEmail = buyerEmail;
            ShipToAddress = shipToAddress;
            DeliveryMethod = deliveryMethod;
            OrderItems = orderItems;
            Total = subtotal;
            PaymentIntentId = paymentIntentId;
        }

        public string BuyerEmail { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public Address ShipToAddress  { get; set; }
        public DeliveryMethod DeliveryMethod { get; set; }
        public List<OrderItem> OrderItems { get; set; }
        public double Total { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public string PaymentIntentId { get; set; }

      

    }
}
