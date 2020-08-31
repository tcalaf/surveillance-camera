using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Essentials;
using Xamarin.Forms.Xaml;

namespace Final_App
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class webViewVideo : ContentPage
    {
        int nr = 0;
        public webViewVideo()
        {
            InitializeComponent();

            //webView.Source = "https://firebasestorage.googleapis.com/v0/b/mspfirebasehack.appspot.com/o/15f4ea4c-bfc6-4e1d-b57f-16d2622f7ff3.mp4?alt=media&token=703f5905-6c56-4e64-857c-7f0e1084301e";
            //webView.Source = "https://ctrlaltelite21.azurewebsites.net/images";
            webView.Source = "https://console.firebase.google.com/project/surveillance-camera-upload/storage/surveillance-camera-upload.appspot.com/files~2Fvideos";
            //"https://drive.google.com/drive/my-drive";
        }

        private void refresh_Clicked_1(object sender, EventArgs e)
        {
            webView.Reload();
        }

        [Obsolete]
        private async void  webView_Navigated(object sender, WebNavigatedEventArgs e)
        {
            nr++;
            if (nr >= 8)
            {
                var uri = new Uri(e.Url);
                Device.OpenUri(uri);
            }
        }

        private async void Button_Clicked(object sender, EventArgs e)
        {
            await Browser.OpenAsync("https://console.firebase.google.com/project/surveillance-camera-upload/storage/surveillance-camera-upload.appspot.com/files~2Fvideos", BrowserLaunchMode.SystemPreferred);
        }
    }
}