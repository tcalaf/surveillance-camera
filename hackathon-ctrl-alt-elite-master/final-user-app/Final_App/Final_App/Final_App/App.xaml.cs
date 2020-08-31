using System;
using Xamarin.Forms;
using Xamarin.Essentials;
using Xamarin.Forms.Xaml;

namespace Final_App
{
    public partial class App : Application
    {
        public static string DatabaseLocation = string.Empty;
        public App()
        {
            InitializeComponent();

            VersionTracking.Track();

            var firstlaunch = VersionTracking.IsFirstLaunchEver;

            if (firstlaunch == true)
               MainPage = new NavigationPage(new tutorial());
            else
                MainPage = new NavigationPage( new MainPage());
        }

        public App(string dbPath)
        {
            InitializeComponent();

            VersionTracking.Track();

            var firstlaunch = VersionTracking.IsFirstLaunchEver;

            if (firstlaunch == true)
                MainPage = new NavigationPage(new tutorial());
            else
                MainPage = new NavigationPage(new MainPage());

            DatabaseLocation = dbPath;
        }

        protected override void OnStart()
        {
        }

        protected override void OnSleep()
        {
        }

        protected override void OnResume()
        {
        }
    }
}
