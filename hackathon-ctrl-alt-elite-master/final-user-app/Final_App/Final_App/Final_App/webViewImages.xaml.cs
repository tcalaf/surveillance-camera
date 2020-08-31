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
    public partial class webViewImages : ContentPage
    {
        public webViewImages()
        {
            InitializeComponent();
            webViewImg.Source = "https://ctrlaltelite21.azurewebsites.net/images";
        }

        private void refresh_Clicked_1(object sender, EventArgs e)
        {
            webViewImg.Reload();
        }

       
    }
}