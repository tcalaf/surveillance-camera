using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Final_App
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class PrivacyPoliticyPage : ContentPage
    {
        string text;
        public PrivacyPoliticyPage()
        {
            InitializeComponent();

            var assembly = IntrospectionExtensions.GetTypeInfo(typeof(LoadResourceText)).Assembly;
            Stream stream = assembly.GetManifestResourceStream("Final_App.privacyPolitics.txt");

            try
            {
                using (var reader = new System.IO.StreamReader(stream))
                {
                    text = reader.ReadToEnd();
                }
            }
            catch (ArgumentNullException ge)
            {
                Console.WriteLine("Argument null");
            }
            policy.Text = text;
        }
    }
}