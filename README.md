# Citi Virtual FinTech Hackathon
Our repository for Citi Virtual FinTech Hackathon. The task was to design a system of QR online payments.

Repository consists of:
* Mobile app written in React-Native
* Backend Mockup in Python Flask
* Backend in Java Spring

## How does it work?

Our system simulates payments via QR codes.
We implemented 2 types of transactions:
* Store payments
* Money transfer between users

### Store Payments:
1. Online store would request our API to generate transaction and get QR code (not implemented yet)
2. User scans the QR code at the store's website
3. Our application opens up at the payment confirmation screen
4. User confirms payment using biometry
5. Transaction is accepted

![payment screen](Screenshots/qrpay3.png)
![confirmation screen](Screenshots/qrpay2.png)

### Money transfer between users:
1. User1 opens our app
2. On their home page there is a QR code
3. User2 scans the QR code of User1
4. Our app opens up on user2's phone, at the money transfer screen
5. User2 can input the amount of money they want to send to User1
6. User2 confirms transaction with biometry
7. Transaction is completed

![money transfer screen](Screenshots/qrpay4.png)
![user's qr code screen](Screenshots/qrpay1.png)
