using System;
using System.Collections.Generic;
using System.Text;

namespace Final_App
{
   public class NotificationEventArgs : EventArgs
    {
        public string Title { get; set; }
        public string Message { get; set; }
    }
}
