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
    public partial class easteEgg : ContentPage
    {
        public easteEgg()
        {
            InitializeComponent();

            EeasterEgg.Source = "https://giphy.com/gifs/cute-rabbit-bunny-wsJHi6a1JwoXC/fullscreen";


        }
    }
}