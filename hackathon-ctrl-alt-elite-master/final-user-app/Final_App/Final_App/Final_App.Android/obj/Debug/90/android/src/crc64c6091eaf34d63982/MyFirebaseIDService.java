package crc64c6091eaf34d63982;


public class MyFirebaseIDService
	extends com.google.firebase.iid.FirebaseInstanceIdService
	implements
		mono.android.IGCUserPeer
{
/** @hide */
	public static final String __md_methods;
	static {
		__md_methods = 
			"n_onTokenRefresh:()V:GetOnTokenRefreshHandler\n" +
			"";
		mono.android.Runtime.register ("Final_App.Droid.MyFirebaseIDService, Final_App.Android", MyFirebaseIDService.class, __md_methods);
	}


	public MyFirebaseIDService ()
	{
		super ();
		if (getClass () == MyFirebaseIDService.class)
			mono.android.TypeManager.Activate ("Final_App.Droid.MyFirebaseIDService, Final_App.Android", "", this, new java.lang.Object[] {  });
	}


	public void onTokenRefresh ()
	{
		n_onTokenRefresh ();
	}

	private native void n_onTokenRefresh ();

	private java.util.ArrayList refList;
	public void monodroidAddReference (java.lang.Object obj)
	{
		if (refList == null)
			refList = new java.util.ArrayList ();
		refList.add (obj);
	}

	public void monodroidClearReferences ()
	{
		if (refList != null)
			refList.clear ();
	}
}
