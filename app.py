from flask import Flask, request, render_template
from flask_mail import Mail,Message
import json

mail = Mail()

app = Flask(__name__)

f = open('static/json/passwords.json')
pswrd = json.load(f)['gmail']
f.close()

app.secret_key = "IamLegendary"
app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME = 'nieieeecscontact@gmail.com',
    MAIL_PASSWORD = pswrd
)
mail = Mail(app)

@app.route("/")
@app.route("/Home")
def home():    
    return render_template("index.html")
    
@app.route("/About")
def about():
    return render_template("about.html")

@app.route("/Events")
def events():
    return render_template("events.html")

@app.route("/Gallery")
def gallery():
    return render_template("gallery.html")

@app.route("/Rubix")
def rubix():
    return render_template("rubix.html")

@app.route("/Contact", methods = ['GET' , 'POST'])
def contact():
    if request.method == 'POST':
        try:
            contactName=request.form['contactName']
            contactEmail=request.form['contactEmail']
            contactSubject=request.form['contactSubject']
            contactMessage=request.form['contactMessage']
            body="Name: "+contactName+"\nEmail: "+contactEmail+"\nSubject: "+contactSubject+"\nMessage: "+contactMessage
            msg = Message(subject="Contact Form Entry",body=body, sender=(contactName,"nieieeecscontact@gmail.com"), recipients=["varunbheemaiah9@gmail.com"])
            mail.send(msg)
            body1="Dear "+contactName+",\n\nThank you you for reaching out to us, we have received the following data:\n\n"+"Name: "+contactName+"\nEmail: "+contactEmail+"\nSubject: "+contactSubject+"\nMessage: "+contactMessage+"\n\nWe will get back to you soon.\n\nRegards,\nNISB Computer Society"
            msg1 = Message(subject="Contact techNIEks",body=body1, sender=("NISB Computer Society","nieieeecscontact@gmail.com"), recipients=[contactEmail])
            mail.send(msg1)
            return render_template("contact.html", message = "Message Sent, we will get back to you shortly")
        except:
            return render_template("contact.html", message = "Sending Failed. Please try again")
    return render_template("contact.html" , message = "")

if __name__=="__main__":
    app.run(debug=True)