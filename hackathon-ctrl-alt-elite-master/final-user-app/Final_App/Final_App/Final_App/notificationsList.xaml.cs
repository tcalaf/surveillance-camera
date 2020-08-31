using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using System.Net.Http;
using SQLite;
using System.Collections.ObjectModel;
using Newtonsoft.Json;
using ToDoListPrezentareV2;

namespace Final_App
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class notificationsList : ContentPage
    {
        INotification notificationManager;
        int notificationNumber = 0;
        public static string oldGetRequest = string.Empty;
        ObservableCollection<NotificationDb> _tasks;


        public  notificationsList()
        {
            InitializeComponent();

            notificationManager = DependencyService.Get<INotification>();
            notificationManager.NotificationReceived += (sender, eventArgs) =>
            {
                var evtData = (NotificationEventArgs)eventArgs;
                ShowNotification(evtData.Title, evtData.Message);
            };

          var timer = new PollingTimer(TimeSpan.FromSeconds(5), GetRequest);
            timer.Start();

        }

        private async void GetRequest()
        {
            HttpClient client = new HttpClient();
            string URL = "https://ctrlaltelite21.azurewebsites.net/api/images/titles";
            string DIRECT_POST_CONTENT_TYPE = "";

            HttpResponseMessage response = await client.GetAsync(URL);
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
              
                string title = $"Alerta !!!";
                string message = $"Intrus detectat in cadru !";
                       
                SQLiteConnection conn = new SQLiteConnection(App.DatabaseLocation);
                conn.CreateTable<NotificationDb>();
                List<NotificationDb> tasks = conn.Table<NotificationDb>().ToList();
                int verify = 0;
                if (tasks.Count == 0)
                {
                        var toDbelem = new NotificationDb { Name = content };
                        notificationManager.ScheduleNotification(title, message);
                        await DisplayAlert("Succes", content, "Ok");
                            
                    verify = conn.Insert(toDbelem);

                } else {
                    var toDbelem = new NotificationDb { Name = content };
                    if (!tasks[tasks.Count - 1].Name.Equals(content))
                    {
                        verify = conn.Insert(toDbelem);
                        notificationManager.ScheduleNotification(title, message);
                        await DisplayAlert("Succes", content, "Ok");
                    }
                }
                if (verify != 0)
                {
                    if (verify > 0)
                        await DisplayAlert("Succes", "YEEEEEE", "Ok");
                    else
                        await DisplayAlert("Faile", "FUCK", "Ok");
                }

                var Items = JsonConvert.DeserializeObject<JSonContentType>(content);
                string ver = Items.files[Items.files.Count - 1 ];
/*
                for (int i = 0; i < Items.files.Count; i++) 
                {
                    ver = Items.files[i];
                    conn.Insert(ver);
                }
*/
                conn.Close();

                // await DisplayAlert("Succes",ver, "Ok");

            }

        }


        protected override void OnAppearing()
        {
            base.OnAppearing();

            SQLiteConnection conn = new SQLiteConnection(App.DatabaseLocation);
            conn.CreateTable<NotificationDb>();
            var tasks = conn.Table<NotificationDb>().ToList();
            _tasks = new ObservableCollection<NotificationDb>(tasks);
            tasksListView.ItemsSource = _tasks;
            conn.Close();

        }

        private async void Send_Notification(object sender, EventArgs e)
        {
            /*  notificationNumber++;
              string title = $"Local Notification #{notificationNumber}";
              string message = $"You have now received {notificationNumber} notifications!";
              notificationManager.ScheduleNotification(title, message);
            */
            
            HttpClient client = new HttpClient();
            string URL = "https://ctrlaltelite.azurewebsites.net/cristi";
            string DIRECT_POST_CONTENT_TYPE = "";

            HttpResponseMessage response = await client.GetAsync(URL);
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();

                await DisplayAlert("Succes", content, "Ok");
                //Items = JsonConvert.DeserializeObject<List<TodoItem>>(content);
            }

        }

        void ShowNotification(string title, string message)
        {
            Device.BeginInvokeOnMainThread(() =>
            {
                var msg = new Label()
                {
                    Text = $"Notification Received:\nTitle: {title}\nMessage: {message}"
                };
                //stackLayout.Children.Add(msg);
            });
        }
    }
}