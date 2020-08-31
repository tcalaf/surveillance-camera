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
    public partial class tutorial : ContentPage
    {
        public tutorial()
        {
            InitializeComponent();
            toureImg.Source = ImageSource.FromResource("Final_App.IMG.undraw_listnotifi_2.png");
        }

        private async void StartTour(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new tutorial2());
        }
    }
}