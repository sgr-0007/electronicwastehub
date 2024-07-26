Team 06 E waste Hub

Features: 

The application features needed are:
1. 	Standard account registration and login, optionally common third party accounts may be used, e.g. Google, Microsoft, etc.  You should have previous experience if you wish to use third party authentication.
2. 	Admin role can upgrade accounts for staff.
3. 	Accept details of devices and identify whether they are ‘current’ (currently popular), ‘recycle’, ‘rare’ or ‘unknown’.
4. 	Current devices will have listings for expected value according to third parties, such as CeX, etc. with a focus on local places to trade in by physically handing in.  Owner to be given a QRCode that offers a bonus (e.g. voucher) which also identifies the eWaste Hub for a (potential) referral fee and simplifies them handing in a device (since they will have entered data already).  Data wiping is guaranteed by the third party.
5. 	‘Recycle’ devices are offered for recycling with data retrieval (at a fee) and data wiping (at no cost).  Data retrieval devices are accepted by the eWaste Hub themselves for retrieving data which is then hosted in the cloud and a secure link emailed to the owner for a limited time (valid for 3 months, can be retrieved from 3-6 months with a further fee payment, then deleted).  Data wiping will be handled by a third party who recycle the device.
6. 	Rare devices are handled in a similar manner to current devices but the third parties may include eBay, etc.
7. 	Unknown devices are flagged for employees to update the device database and contact the owner.
8. 	Expected roles will include (device) owner, admin and staff (employee).
9. 	For staff, creation of (new) devices details.  This should be initially populated from an offered device (by an owner).  Draft details should be saved (but not visible).
10. Devices can be made visible or hidden, e.g. in case of incomplete/incorrect details.
11. Devices can be moved between classifications, which include current/recycle/rare/unwanted as well as device types, i.e. console/phone/tablet/laptop, etc.  At least two device types should be shown working.
12. When a device is current, details for at least one third party should be shown, e.g. in a new/pop out window.
13. Payments for data transfer should be via paypal and stripe (sandbox only).
14. An Admin dashboard will need to be available for managing users accounts.
15. Relevant reports should be available for staff, e.g. payments for data wiping, device processing (e.g. received, transferring, wiping, dispatch to this party), QR Code generation by third party, referral fees.

Roles : Owner , Admin, Staff, Local trader(scan the qr and update the status from the table accordingly)


Client app :
initial commands to execute after cloning :
cd ewastehubclient
npm install
npm run dev

