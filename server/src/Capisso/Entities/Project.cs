using System;
using System.Linq;
using System.Threading.Tasks;

namespace Capisso.Entities
{
    public class Project : Entity<int>
    {
        public string Title { get; set; }
        public string Notes { get; set; }
        public string Outcome { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
