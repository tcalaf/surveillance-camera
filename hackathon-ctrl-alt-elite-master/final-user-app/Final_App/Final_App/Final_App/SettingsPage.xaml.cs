using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Final_App
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class SettingsPage : ContentPage
    {
        public SettingsPage()
        {
            InitializeComponent();
        }

        private async void Button_Clicked(object sender, EventArgs e)
        {
           await DisplayAlert("Suntem aici, te sustinem <3", "Hai, stiu ca poti !! Contam pe tine !! ", "OK");
        }

        private void Button_Clicked_1(object sender, EventArgs e)
        {
            string content = "Version: 1.0 " + "\n" + "\n" + "Build: 16/6/20 22:17" + "\n" + "\n" + "JNI: OK" + "\n" + "Copyright 2009-2020 Surveillance-Camera. All Rights Reserved. ";
            DisplayAlert("Surveillance-Camera", content,"Ok" );
        }

        private async void Button_Clicked_2(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new PrivacyPoliticyPage());
        }

        private async void Button_Clicked_3(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new easteEgg());
        }
    }
}