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
    public partial class tutorial2 : ContentPage
    {
        public tutorial2()
        {
            InitializeComponent();
            content.Text = "    Surveillance-Camera este o obtiune de securitate a spatiului personal/bunurilor";
            content2.Text = "   Aplicatia ofera suport video de fiecare data o persoana intra in cadru salvand videoclipul pe drive alaturi de o poza, iar in spate AI -ul scoate trasaturile persoanei pentru identificarea sa mai usoara.";
            tutorial.Source = ImageSource.FromResource("Final_App.IMG.Capture.PNG");

        }

        private async void Button_Clicked(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new MainPage());
        }
    }
}