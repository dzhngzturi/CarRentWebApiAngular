using Core.Entities.Identity;

namespace API.DTO_s
{
    public class OrderToReturnDto
    {
        public int Id { get; set; }
        public string BuyerEmail { get; set; }
        public DateTime OrderDate { get; set; }
        public AddressDto ShipToAddress { get; set; }
        public string DeliveryMethod { get; set; }
        public IReadOnlyList<OrderItemDto> OrderItems { get; set; }
        public double Total { get; set; }
        public string Status { get; set; }

    
    }
}
