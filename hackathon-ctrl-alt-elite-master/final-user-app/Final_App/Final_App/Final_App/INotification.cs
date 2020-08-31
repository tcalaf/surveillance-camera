using System;
using System.Collections.Generic;
using System.Text;

namespace Final_App
{
    public interface INotification
    {
        event EventHandler NotificationReceived;

        void Initialize();

        int ScheduleNotification(string title, string message);

        void ReceiveNotification(string title, string message);
    }
}
