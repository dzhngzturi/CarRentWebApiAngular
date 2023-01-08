namespace API.DTO_s
{
    public class OrderItemDto
    {
        public int CarId { get; set; }
        public string CarName { get; set; }
        public string PictureUrl { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public DateTime RentDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public int Days { get; set; }


    }
}
