# How to Install iCloud3 and Configure it for the first time

There are several steps that need to be done to install and start using iCloud3 to track your devices. They are:

1. Install the iCloud3 custom component integration:
   - Install iCloud3 from HACS (or add it manually)
   - Install and configure the HA Mobile App if you are using it on any of your tracked devices (optional)
   - Add the iCloud3 custom component
2. Configure iCloud3:
   - Add your Apple account
   -  Authenticate access to your Apple account
   - Import the devices in your Apple account
   - Build the iCloud3 Dashboard


------

##  Installing iCloud3

iCloud3 is available on the HACS and is installed using the same process as other HACS custom components.

- **Using HACS to install iCloud3**
  1. Open HACS.
  2. Select **Integrations**, type **icloud3** in the search bar.
  3. Select the **iCloud3, iDevice Tracker** item, then select **+Download** to download iCloud3 and follow the normal steps for installing an integration using HACS.

- **Manual Installation from the iCloud3 Repository Releases Page**
  1. Download the *icloud3.zip* file from the *gcobb321/icloud3 iCloud3 GitHub Repository Releases* page [here](https://github.com/gcobb321/icloud3/releases). Select *Assets* at the bottom, then the zip file. The file save screen is displayed, select the location on your computer and save the zip file.
  2. Unzip the file into the *config/custom_components/icloud3* directory on your Home Assistant server (ex.: Raspberry Pi)
  3. Restart Home Assistant



------

## Installing iCloud3 Beta Versions

- This is effective with iCloud3 v3.8.0

Beta versions of iCloud3 are published as **pre-releases** in the iCloud3 repository (`gcobb321/icloud3`). HACS and Marketplace only offer them when the iCloud3 **Pre-release** switch is turned on.

### Turn on beta versions  (Enable Beta Downloads)

- Using iCloud3 Configure Screen:
  1. Go to **Configure > Tools > Enable/Disable Beta Downloads.**
  2. Select **Enable Beta Downloads**, then **Submit**

- Using the Marketplace Configuration update screen:

  1. Go to **Settings > Devices & Services**, select **Devices** at the top of the screen

  2. Type **Marketplace** in the Search field and find the **iCloud3 Apple Device Tracker** entry. **Click on it** to select it.

  3. In the **Configuration** section, find the **Pre-release** switch.

  4. If the switch isn't listed, it's disabled. Select **+1 entity not shown**, then the **Pre-release entity**, then **Settings (gear) > Enabled > Update**. It can take up to 30 seconds to appear.

  5. Turn the **Pre-release** switch on.

### Go back to only show the production versions (Disable Beta Downloads)

- Using iCloud3 Configure Screen:

  1. Go to **Configure > Tools > Enable/Disable Beta Downloads.**
  2. Select **Disable Beta Downloads**, then **Submit**

- Using the Marketplace Configuration update screen:

  1. Open the Marketplace iCloud Configuration screen (Steps 1-3 above). 

  2. Turn the **Pre-release** switch off.  The beta you have stays installed. HACS/Marketplace won't downgrade it, and will offer the next production version once it's newer than your beta. If you need to go back right away, use **Redownload** in HACS/Marketplace and pick the production version.

#### Notes
- Only one copy of iCloud3 can be installed (`custom_components/icloud3`). Don't add the old `icloud3_v3` repository. Marketplace won't install it alongside iCloud3.
- Beta versions are tagged like `v3.8.0-beta.3`. In the iCloud3 Event Log and the update entity, a beta version is older than the production release with the same number (e.g., `3.8.0-beta.3` comes before `3.8.0`).



## Resetting the old HACS iCloud3 Beta/Development Custom Repository
iCloud3 beta versions are now published as **pre-releases in the main iCloud3 repository** (`gcobb321/icloud3`). The separate beta repository (`gcobb321/icloud3_v3`) is being retired.

Home Assistant 2026.11 introduced the  **Marketplace** integration that replaces HACS. With Marketplace, a domain (`iCloud3`) can only be tied to one GitHub Repository (`gcobb321/icloud3`). HACS, on the other hand, did not have this limitation and would support multiple repos (`gcobb321/icloud3 and icloud3_v3`).

The multiple repository support provided by HACS needs to be undone. Do one of the following;

#### From the Repair Issue: *iCloud3: Beta Versions are moving to the iCloud3 Repo* 

1. Go to **Settings > Repairs** and select the issue.
2. Select **Submit**.

iCloud3 then switches your HACS or Marketplace installation from the beta repository to the iCloud3 repository. You don't need to reinstall anything or set iCloud3 up again. It also:
- Removes the *iCloud3 Beta* repository entry.
- Turns on the **Pre-release** switch for iCloud3, so you keep getting new beta versions.
- Leaves your iCloud3 configuration, devices and entities unchanged.

#### If the switch can't be done automatically

The Repairs dialog shows a message instead. Make the change manually:
1. **Settings > Devices & Services > iCloud3 > Delete**. Your iCloud3 configuration is saved and will be used again.
2. In HACS or Marketplace, uninstall **iCloud3 Beta**.
3. In HACS or Marketplace, open **iCloud3** and turn on its **Pre-release** switch (see *Installing beta versions*), then download the latest version.
4. Restart Home Assistant.
5. **Settings > Devices & Services > Add Integration > iCloud3**.

#### If you installed from the iCloud3 repository

You don't need to do anything. To try beta versions, see *Installing beta versions* in the iCloud3 documentation.

------
## Add the iCloud3 Integration

iCloud3 is a Home Assistant Integration and is configured on the Integrations screens like all the other Integrations you may be using.

1. Select **☰ > HA Settings > Devices & Services > Integrations**.
2. Select **+ Add Integration** in the lower-right hand corner.
3. Type **iCloud3**. Then select **iCloud3** from the list of Integrations. The iCloud3 entry will be added to the *Integrations* screen.
4. Open the *iCloud3 Configure screen* as depicted below.
   - You have installed it for the first time:
     - Select **☰ > HA  Settings > Devices & Services > Integrations  > iCloud3  > Configure Gear Icon**.
   - You have installed it before and the Event Log has been set up:
     - Select the **Event Log > Purple Configure Gear Icon  > Configure Gear Icon**.

![](../screens/home_assistant/ha-integrations-icloud3-entry.png)

-----
## Configure iCloud3 for the First Time

Generally, when you click the Gear icon in the above image to open the iCloud3 Configure screens, the following will happen:

1. The *Update Apple Account* screen is displayed. You enter your username/email-id and password, iCloud3 logs into your account.
2. Apple will display a pop-up notification window letting you know that someone is signing into your account. It will want the 6-digit verification code or a security key keypress to approve the sign-in. The *Authenticate Apple Sign-in* screen is displayed. Follow the instructions to enter the code or press the security key.
3. The devices in your Apple account were downloaded when you signed in. They are analyzed and iCloud3 device items were created for you to import. The *Import Apple Devices* screen is displayed with these device items categorized into tracked devices (iPhone, Watch), monitored devices (iPad, Mac) and inactive devices (all others). Import the tracked and monitored devices and the iCloud3 device_tracker and sensor entities are created.  Note: Tracked devices are actively located, Monitored devices use data downloaded with tracked devices.
4. After importing, the *iCloud3 Devices* screen is displayed. You can edit the created devices (Name, Picture, Mobile App assignment, etc) if necessary.
5. End the *iCloud3 Configure Session* (select Menu, then Exit).
6. The *iCloud3 Dashboard* is created and added to the *HA Sidebar*. Click the Cloud icon (<img src="../dashboard/cloud-icon-42x42.png" width="20" height="16">) to display your devices and the *Event Log*.

That's it, you are done! Each of these steps is described in detail below.

![](../screens/apple_acct/apple-acct-auth-import-devices-steps.png)

### Add your Apple Account

 Since you are doing this for the first time, the iCloud3 configuration file (*.storage/icloud3/configuration*) will be created with default values. The *Update Apple Account* screen is displayed.

![](../screens/apple_acct/apple-acct-update-first-time.png)

- Enter your Apple account **username** (email id) and **password**.
- Click **Submit**

The username and password will be validated, iCloud3 will log into your Apple account and download the devices in your account.

Note:

- *Locate All Devices* is enabled - All of the devices in your Family List are downloaded.
- *Locate All Devices* is disabled - Only your devices are downloaded.

If Apple logged into your account, the *Authenticate Apple Account Sign-in* screen is displayed.

### Authenticate Apple Account Sign-in

The next step is to authenticate iCloud3 access to your Apple account. This is done by entering the 6-digit 2fa code that will be sent to your iPhone or, if you are using a Security Key, inserting it into your HA Server and pressing its button.

Three-methods of authentication are supported:

- **Push notification pop-up window** (default) - The *Apple Sign-in Requested* message is displayed on your Trusted Device (iPhone/iPad/Mac). This is followed by the popup window with your location and *Don't Allow/Allow* buttons, followed by the *Apple ID Verification Code* window with the 6-digit code.
- **Text message** - The code is sent to a Trusted Phone in a text message.
- **Security key (YubiKey)** - You have configured your Apple account to use a security key. The security key is inserted into the computer running HA (Mac, RPi, HA Green, etc).

![](../screens/authenticate/apple-acct-auth.png)

Do one of the following:

- **Push notification pop-up window**:

  - Select *Authenticate* if it is not selected.

  - On the Trusted Device, touch **Allow** to display the 6-digit code.

  - Enter the 6-digit code into the **Authentication Code** field, then click **Submit**.

- **Using a Security Key (Yubikey)** :
  - Select *Authenticate* if it is not selected.
  - **Touch the Security key** inserted into your HA Server, then click **Submit**.
  - The Security Key should be blinking. If it is not blinking, select *Request Authentication*, then click Submit to restart the process.

The code will be sent to Apple and verified.

**Change Authentication Method** - The authentication method that is being used is displayed in *Apple Account to be Authenticated* field. If you want to change it, select the *Change Authentication Method* Action Command, then click Submit. Select the new method on the screen that is displayed, then click Submit to return to this screen. Select *Request Authentication Code* to restart the authentication process, then click Submit to request a new code or to reinitialize the security key. Then follow the steps above.

If Apple accepts the code, the *Import Apple Devices* screen will be displayed.

### Importing Apple Devices

The next step is to create the iCloud3 device_tracker and sensor entities from your Apple account devices that were downloaded earlier.

The devices are grouped into three categories, the *Tracking Mode*:
- **Tracked Devices (iPhone, Watch)** - iCloud3 issues location requests to Apple when they are needed. The location, battery and other information is updated.
- **Monitored Devices (iPad, Mac)** - Data for these devices is also downloaded when Tracked devices are located.
- **Inactive Devices (AirPods, other Apple devices)** - Apple does not provide any location or battery information for these devices.

Note: You can change the *Tracking Mode* for a device later on the *iCloud3 Devices > Update Device* screen.

![](../screens/apple_acct/import-apple-devices.png)

- Click Submit to create the iCloud3 device_tracker and sensor entities for the checked items.

The *iCloud3 Devices* screen is displayed showing the iCloud3 devices you just created.

### Review the iCloud3 Devices

This screen lists all of the devices that iCloud3 will Track and Monitor. Devices can be updated, added and deleted from this screen.

![](../screens/device/devices-list.png)

- If you want to review or change the device's individual fields (its picture for example):

  - Select the device

  - Select *Update the Device* Action Command, then click **Submit**.

  - The *Update Device* screen is displayed. See [here](#/chapters/3_devices?id=add-and-update-an-icloud3-device) for more information about this screen.



You have completed all of the steps needed to configure iCloud3.

To end the iCloud3 Configure Session and display the *HA Devices & services* screen:
- Select **Menu**, then click **Submit** to display the *Configure Devices and Sensors* menu.
- Select **Exit**, then click **Submit** to end the *iCloud3 Configure Session*.

### iCloud3 Dashboard

When you end the *iCloud3 Configure Session*:

- The iCloud3 Dashboard is created and added to the *HA Sidebar* with a *Cloud* icon (<img src="../screens/dashboard/cloud-icon-42x42.png" width="20" height="16">). A sample screen is shown below.
- The devices you added are located.
- The device_tracker and sensor entities are updated.

![](../screens/dashboard-summary.png)

- Click the *Cloud* icon on the HA Sidebar to display the iCloud3 Dashboard screen.



That's it. Congratulations! You have installed iCloud3 and are tracking your devices.

When you can, review the rest of the documentation. You may find other features you can use. Things like:

- Opening your garage door when you get home or closing it when you leave.
- Checking to make sure your doors are all locked when no one is home.
- Tracking the location of service vehicles.
- Monitoring your irrigation zones so your automated mower does not mow one that is still wet.
- Getting notified when your spouse or children are nearing home or leaving school or the gym.
- Getting notified when the battery level of your iPad is low or when it has been fully charged.
- Logging when you enter and exit a zone to a .csv spreadsheet file that can be used for filing expense reports.



Thanks and good luck!

*And if you like iCloud3, maybe you could get me a cup of coffee*

<a href="https://www.buymeacoffee.com/gcobb321" target="_blank"><img src="https://gcobb321.github.io/icloud3_v3_docs/screens/other/buymeacoffee-docs-button.png"/></a>


-----
*Gary Cobb, aka GeeksterGary*
