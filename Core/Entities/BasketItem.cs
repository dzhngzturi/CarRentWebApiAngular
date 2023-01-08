namespace Core.Entities
{
    public class BasketItem
    {
        public int Id { get; set; }
        public string CarName { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public DateTime DateRent { get; set; }
        public DateTime DateReturn { get; set; }
        public string PictureUrl { get; set; }
        public string Brand { get; set; }
        public string Type { get; set; }
    }
}