using System;
using System.Collections.Generic;
using System.Text;
using SQLite;

namespace Final_App
{
    public class NotificationDb
    {
        [PrimaryKey, AutoIncrement]
        public int Id { get; set; }

        //[MaxLength(255)]
        public string Name { get; set; }
    }
}
